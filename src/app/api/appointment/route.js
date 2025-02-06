import { connectDB } from "@/src/lib/mongodb";
import Appointment from "@/src/types/Appointment";

export async function POST(req) {
  try {
    await connectDB();
    const { userId, doctorId, date, time } = await req.json(); // Read request body

    if (!userId || !doctorId || !date || !time) {
      return new Response(JSON.stringify({ success: false, message: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const newAppointment = new Appointment({ userId, doctorId, date, time });
    await newAppointment.save();

    return new Response(JSON.stringify({ success: true, message: "Appointment booked successfully!" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving appointment:", error);
    return new Response(JSON.stringify({ success: false, message: "Failed to book appointment" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
