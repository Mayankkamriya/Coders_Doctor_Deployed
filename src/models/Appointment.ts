import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  // _id : { type: String},
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },

  userId: { type: String, required: true },
  doctorId: { type: String, required: true },

  date: { type: String, required: true },
  time: { type: String, required: true },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
});

export default mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
