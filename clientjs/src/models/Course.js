import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  prerequisites: {
    type: String,
    default: "",
  },
  corequisites: {
    type: String,
    default: "",
  },
  credits: {
    type: Number,
    required: true,
  },
  designation: {
    type: String, // WQB designation (e.g., "Writing/Breadth-Humanities")
    default: "",
  },
  courseDetails: {
    type: String,
    default: "",
  },
  dept: {
    type: String, // Department offering the course
    required: true,
  },
  offerings: {
    type: Array, // Array of offering objects {instructor: string, sections: array<string>, courseSchedule: array<Schedules>}
    required: false,
  },
});

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
