import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  // _id : { type: String},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

export default mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
