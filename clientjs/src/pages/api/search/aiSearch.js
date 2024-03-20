import { AutoTokenizer, AutoModel } from "@xenova/transformers";
import { faculties } from "@/utils/faculties";
import fs, { writeFileSync, readFileSync } from "fs";
import dbConnect from "../../../app/utils/dbConnect";
import Course from "../../../models/Course";

function parseTensor(Tensor) {
  const arr = [];

  for (let i = 0; i < Tensor.last_hidden_state.dims[0]; i++) {
    arr.push([]);
    for (let j = 0; j < 1; j++) {
      arr[i].push([]);
      for (let k = 0; k < Tensor.last_hidden_state.dims[2]; k++) {
        arr[i][j].push(
          Tensor.last_hidden_state.data[
            i + j * Tensor.last_hidden_state.dims[2] + k
          ]
        );
      }
    }
  }
  return arr;
}

async function loadModel() {
  const embeddings = [];
  console.log("hello");
  const tokenizer = await AutoTokenizer.from_pretrained(
    "Xenova/all-MiniLM-L6-v2"
  );

  let model = await AutoModel.from_pretrained("Xenova/all-MiniLM-L6-v2");
  await dbConnect();
  for (let dept of faculties) {
    const deptEmbeddings = { dept: dept.value, courses: [] };

    const courses = await Course.find({ dept: dept.value });
    for (let course of courses) {
      let text =
        course.courseCode + " " + course.title + " " + course.courseDetails;

      let encoded_input = await tokenizer(text);
      let output = await model(encoded_input);

      deptEmbeddings.courses.push({
        title: course.title,
        courseCode: course.courseCode,
        embedding: parseTensor(output)[0][0],
      });
    }
    embeddings.push(deptEmbeddings);
  }

  const embeddingsObj = {
    embeddings: embeddings,
  };

  const embeddingsStr = JSON.stringify(embeddingsObj, null, 2);

  await writeFileSync(`data/embeddings.json`, embeddingsStr, "utf-8");

  return embeddings;
}

async function searchEmbeddings(text) {
  const tokenizer = await AutoTokenizer.from_pretrained(
    "Xenova/all-MiniLM-L6-v2"
  );

  let model = await AutoModel.from_pretrained("Xenova/all-MiniLM-L6-v2");

  let encoded_input = await tokenizer(text);
  let output = await model(encoded_input);
  //... code to complete

  const embeddingsStr = fs.readFileSync("data/embeddings.json", "utf-8");
  const embeddings = JSON.parse(embeddingsStr).embeddings;

  const userQuery = parseTensor(output)[0][0];

  let results = [];

  // Iterate over each department and course
  for (let dept of embeddings) {
    for (let course of dept.courses) {
      // Select the first token's embedding for the course
      let courseVec = course.embedding;

      // Calculate cosine similarity
      let similarity = cosineSimilarity(userQuery, courseVec);

      results.push({
        title: course.title,
        department: dept.dept,
        courseCode: course.courseCode,
        similarity: similarity,
      });
    }
  }

  // Sort the results based on similarity
  results.sort((a, b) => b.similarity - a.similarity);

  return results;
}

function cosineSimilarity(vecA, vecB) {
  // Assuming vecA and vecB are the averaged vectors or specific token vectors

  // Calculate the dot product of vecA and vecB
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);

  // Calculate the magnitudes of vecA and vecB
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  // Calculate and return the cosine similarity
  return dotProduct / (magA * magB);
}

export default async function handler(req, res) {
  //   const ids = await loadModel();
  const { searchTerm } = req.query;

  // handle spaces for search
  const combinedSearchTerm = searchTerm.replace(/\s/g, "");
  const results = await searchEmbeddings(searchTerm);
  res.status(200).json({ success: true, results });
}
