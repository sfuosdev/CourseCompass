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

const Instructor =
  mongoose.models.Instructor || mongoose.model("Instructor", InstructorSchema);

export default Instructor;
