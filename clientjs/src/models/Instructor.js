import mongoose from "mongoose";

const InstructorSchema = new mongoose.Schema({
  profileUrl: String,
  commonName: String,
  firstName: String,
  lastName: String,
  phone: String,
  roleCode: String,
  name: String,
  officeHours: String,
  office: String,
  email: String,
});

export default mongoose.model("Instructor", InstructorSchema);