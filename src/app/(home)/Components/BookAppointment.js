"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "@/src/context/UserContext";

const BookAppointment = ({ docId }) => {

  const route = process.env.BOOKLIST_URL_LOC 
  const {user} = useUser()
  const router = useRouter()
  
  const [selectedDate, setSelectedDate] = useState("1-1-01");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  // const backend_url = process.env.BOOKLIST_URL_LOC
  const availableTimes = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
  
  // console.log('backend_url...route',route)
  const handleBooking = async () => {
    if (!user) {
      toast.warn("Please log in to book an appointment");
        return router.push("/about");
    }
    
    if (!selectedDate || !selectedTime) {
      return toast.warn("Please select a date and time");
    }
    console.log('user',user)
    try {
      const { data } = await axios.post(`http://localhost:3000/api/appointment`, {
        // userId: user._id,
        userId:'67a46f6456fa3d4f74df7d07',
        doctorId: docId,
        date: selectedDate,
        time: selectedTime,
      });
      toast.success("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment");
    }
    // setSelectedDate("")
    // setSelectedTime("")
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h3 className="text-xl font-semibold">Book Appointment</h3>

      <label className="block mt-4">Select Date:</label>
      <input
        type="date"
        className="w-full p-2 border rounded-md"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <label className="block mt-4">Select Time:</label>
      <div className="flex flex-wrap gap-2">
        {availableTimes.map((time) => (
          <button
            key={time}
            className={`p-2 border rounded-md ${selectedTime === time ? "bg-blue-500 text-white" : "bg-gray-100"}`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </button>
        ))}
      </div>

      <button onClick={handleBooking} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">
        Confirm Appointment
      </button>
    </div>
  );
};

export default BookAppointment;
