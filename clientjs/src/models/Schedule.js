import mongoose from "mongoose";

// Schedule Schema
const ScheduleSchema = new mongoose.Schema({
  day: String, // e.g., "Monday"
  startTime: String, // e.g., "10:00 AM"
  endTime: String, // e.g., "11:30 AM"
  location: String, // e.g., "Building A, Room 101"
});

// Create a Schedule model from the schema
const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema);

// Export the Schedule model
export default Schedule;
