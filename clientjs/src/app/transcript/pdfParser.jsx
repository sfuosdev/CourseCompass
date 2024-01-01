//Example of transcript parser:
{/*
UNOFFICIAL Unofficial Transcript Student Name: ID Number: Birthdate: Ishida Correa, Joao Victor 301449583 Jul 20 Date of Issue: December 29 2023 Page 1 of 2 Credentials Awarded Beginning of Undergraduate Record Transfer Credits Fraser International College Total Units: 43.00 2022 Summer Major in Computing Science, Bachelor of Science Course Description Repeated Units Attempted Units Completed Grade Grade Points Class Average Class Enrollment CMPT 210 Probability and Computing 3.00 3.00 C 6.00 C+ 48 CMPT 225 Data Structures/Programming EXCM 0.00 0.00 D 0.00 B- 136 MATH 240 Algebra I: Linear Algebra 3.00 3.00 C 6.00 B- 68 Term Totals: 6.00 6.00 12.00 Cumulative Totals: 6.00 49.00 12.00 Term GPA: 2.00 Cumulative GPA: 2.00 Academic Standing: On Academic Probation 2022 Fall Major in Computing Science, Bachelor of Science Course Description Repeated Units Attempted Units Completed Grade Grade Points Class Average Class Enrollment ITAL 100 Intro Italian I 3.00 3.00 A+ 12.99 B+ 53 SPAN 100 Introductory Spanish I 3.00 3.00 A 12.00 B 62 STAT 270 Probability and Statistics 3.00 3.00 C 6.00 B- 299 Term Totals: 9.00 9.00 30.99 Cumulative Totals: 15.00 58.00 42.99 Term GPA: 3.44 Cumulative GPA: 2.87 Academic Standing: Good Academic Standing 2023 Spring Major in Computing Science, Bachelor of Science Course Description Repeated Units Attempted Units Completed Grade Grade Points Class Average Class Enrollment CMPT 225 Data Structures/Programming REIG 3.00 3.00 C+ 6.99 B- 206 CMPT 295 Intro. to Computer Systems 3.00 3.00 C 6.00 B- 195 MACM 316 Numerical Analysis I 3.00 3.00 C 6.00 B- 208 SPAN 110 Introductory Spanish II 3.00 3.00 A 12.00 A- 38 Term Totals: 12.00 12.00 30.99 Cumulative Totals: 27.00 70.00 73.98 Term GPA: 2.58 Cumulative GPA: 2.74 Academic Standing: Good Academic Standing UNOFFICIAL Student Name: ID Number: Birthdate: Ishida Correa, Joao Victor 301449583 Jul 20 Date of Issue: December 29 2023 Page 2 of 2 2023 Summer Major in Computing Science, Bachelor of Science Course Description Repeated Units Attempted Units Completed Grade Grade Points Class Average Class Enrollment CMPT 276 Intro Software Engineering 3.00 3.00 C 6.00 B- 96 CMPT 300 Operating Systems I 3.00 3.00 C+ 6.99 B 146 GERO 300 Introduction to Gerontology 3.00 3.00 B+ 9.99 B 54 Term Totals: 9.00 9.00 22.98 Cumulative Totals: 36.00 79.00 96.96 Term GPA: 2.55 Cumulative GPA: 2.69 Academic Standing: Good Academic Standing 2023 Fall Major in Computing Science, Bachelor of Science Course Description Repeated Units Attempted Units Completed Grade Grade Points Class Average Class Enrollment CMPT 307 Data Structures 3.00 3.00 C- 5.01 B 138 CMPT 353 Computational Data Science 3.00 3.00 B 9.00 B+ 136 CMPT 354 Database Systems I 3.00 3.00 C+ 6.99 B 138 Term Totals: 9.00 9.00 21.00 Cumulative Totals: 45.00 88.00 117.96 Term GPA: 2.33 Cumulative GPA: 2.62 2024 Spring Major in Computing Science, Bachelor of Science Course Description Repeated Units Attempted Units Completed Grade Grade Points Class Average Class Enrollment CMPT 318 Special Topics Cmpt. Science 3.00 0.00 0.00 - 94 CMPT 363 User Interface Dsgn 3.00 0.00 0.00 - 100 EDUC 471 Curriculum Development 4.00 0.00 0.00 - 40 Term Totals: 10.00 0.00 0.00 Cumulative Totals: 55.00 88.00 117.96 Term GPA: 0.00 Cumulative GPA: 2.62 End of Undergraduate Record - - - End of Transcript - - -
the above is the output and  to scrape it, I want the following:
2022 Fall Major in Computing Science, Bachelor of Science Course Description Repeated Units Attempted Units Completed Grade Grade Points Class Average Class Enrollment ITAL 100 Intro Italian I 3.00 3.00 A+ 12.99 B+ 53 SPAN 100 Introductory Spanish I 3.00 3.00 A 12.00 B 62 STAT 270 Probability and Statistics 3.00 3.00 C 6.00 B- 299 Term Totals: 9.00 9.00 30.99 Cumulative Totals: 15.00 58.00 42.99 Term GPA: 3.44 Cumulative GPA: 2.87 Academic Standing: Good Academic Standing

the beginning of the term is the year and the term, then it has a table with " Course Description Repeated Units Attempted Units Completed Grade Grade Points Class Average Class Enrollment" as header, then the courses with the respective values and the term ends saying the academic standing. 
finally, this will proclaim the end of transcript and end of function: End of Undergraduate Record - - - End of Transcript - - -
*/}

async function getPdfDocument(pdfData) {
  try {
    const pdfjsLib = await import('pdfjs-dist/build/pdf');
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker');

    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;

    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;

    return pdf;
  } catch (error) {
    console.error('Error loading PDF:', error);
    return null;
  }
}

async function parsePDFToCourses(pdfData) {
  try {
    const pdf = await getPdfDocument(pdfData);

    if (!pdf) {
      return null;
    }

    const coursesByYearAndTerm = {};

    let currentYear = '';
    let currentTerm = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const pageText = await page.getTextContent();

      for (const item of pageText.items) {
        const text = item.str;

        // match year and term
        const yearAndTermMatch = text.match(/\d{4}\s(Spring|Summer|Fall)/);
        if (yearAndTermMatch) {
          const [year, term] = yearAndTermMatch[0].split(' ');
          currentYear = year;
          currentTerm = term;
          const yearTermKey = `${currentYear} ${currentTerm}`;
          if (!coursesByYearAndTerm[yearTermKey]) {
            coursesByYearAndTerm[yearTermKey] = [];
          }
        }

        // match courses
        const courseMatch = text.match(/\b[A-Z]{4}\s\d{3}\b/);
        if (courseMatch && currentYear && currentTerm) {
          coursesByYearAndTerm[`${currentYear} ${currentTerm}`].push(courseMatch[0]);
        }
      }
    }

    // Object.keys(coursesByYearAndTerm).forEach(yearTerm => {
    //   console.log(yearTerm);
    //   coursesByYearAndTerm[yearTerm].forEach(course => {
    //     console.log(course);
    //   });
    // });

    return coursesByYearAndTerm;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    return null;
  }
}


export default parsePDFToCourses;