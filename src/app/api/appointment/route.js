import { connectDB } from "@/src/lib/mongodb";
// import  { Appointment } from "@/src/types/Appointment";
import Appointment from '@/src/models/Appointment'
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

// export async function GET(req, { params }) {
//   try {
//     await connectDB();
//     console.log(req.method)
//     const { id } =await params; // Extract email from URL
  
//     // const { searchParams } = new URL(req.url);
//     // const id = searchParams.get("userId");

//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     // Find user-specific appointments
//     const appointments = await Appointment.find({ userId: id });

//     return NextResponse.json(appointments);
//   } catch (error) {
//     console.error("Error fetching appointments:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
console.log('userId in query...req.url...',userId, req.url)

    if (!userId) {
      return new Response(JSON.stringify({ success: false, message: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // const appointments = await Appointment.find({ });
    // const specificApp = await appointments.find({appointments.userId=== userId})

// Fetch appointments where the stored `userId` matches the requested `userId`
const userAppointments = await Appointment.find({ userId });
console.log('appointments...',userAppointments)

    return new Response(JSON.stringify({ success: true, data: userAppointments }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return new Response(JSON.stringify({ success: false, message: "Failed to fetch appointments" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
