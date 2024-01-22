import dbConnect from "../../../app/utils/dbConnect";
import Course from "../../../models/Course";

export default async function handler(req, res) {
  // console.log("getCourse.js");
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();
    const { dept } = req.query;

    // Find the course by courseCode
    const courses = await Course.find({ dept: dept });
    if (!courses) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
