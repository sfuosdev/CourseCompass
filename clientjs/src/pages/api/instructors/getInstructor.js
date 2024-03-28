//TODO fix get offering by courseCode, include instructor and schedule

import dbConnect from "../../../app/utils/dbConnect";
import Instructor from "@/models/Instructor";

export default async function handler(req, res) {
  // console.log("getCourse.js");
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();
    const { name } = req.query;
    // Find the course by courseCode
    const instructor = await Instructor.findOne({ name: name }).lean();
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json({ instructor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
