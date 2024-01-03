import dbConnect from "../../../app/utils/dbConnect";
import Review from "../../../models/Review";
import Course from "../../../models/Course";

export default async function handler(req, res) {
  console.log("getCourseReviews.js");
  await dbConnect();

  const { courseId } = req.query; // Extract course ID from the query parameters

  try {
    // Check if the course exists
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find all reviews for the course
    const reviews = await Review.find({ course: courseId })
      .populate("reviewer", "username email") // Optional: Populate reviewer details, adjust fields as needed
      .exec();

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error in getReviews:", error);
    res.status(500).json({ error: error.message });
  }
}
