"use client"

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser } from "@/src/context/UserContext";
import { useRouter } from "next/navigation";

const BookAppointment = ({docId}) => {
  const {user} = useUser()
  const router = useRouter()
  // const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  
  useEffect(() => {
    fetchDoctorDetails();
  }, [docId]);

// console.log(setDoctor())
  const fetchDoctorDetails = async () => {
    try {
      generateAvailableSlots();
    } catch (error) {
      toast.error("Failed to fetch doctor details",error.message);
    }
  };

  const generateAvailableSlots = () => {
    let slots = {};
    let now = new Date();
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(now.getDate() + i);
      let dateString = date.toISOString().split("T")[0];
      slots[dateString] = [];
      for (let h = 10; h <= 23; h++) {
        slots[dateString].push(`${h}:00 - ${h + 1}:00`);
      }
    }
    setAvailableSlots(slots);
  };

  const handleBookAppointment = async () => {

    if (!user) {
      toast.warn("Please log in to book an appointment");
        return router.push("/about");
    }

    if (!selectedDate || !selectedTime) {
      toast.warn("Please select date and time");
      return;
    }
    
    try {

//  Fetch user details from database using email
   const userResponse = await axios.get(`/api/user/${user.email}`);

   if (!userResponse.data || !userResponse.data._id) {
     return toast.error("User not found in database");
   }

  const userId = userResponse.data._id;

    if (!userId) {
        console.log("Please select userid");
      }
    if (!docId) {
        console.log("Please select a date and time");
      }

      const { data } = await axios.post(`/api/appointment`, {
        userId: userId,
        doctorId: docId,
        date: selectedDate,
        time: selectedTime,
      });
    console.log('data.date..',data.date)

      toast.success("Appointment booked successfully!");
      setSelectedDate("")
      setSelectedTime("")
    } catch (error) {
      toast.error("Failed to book appointment",error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Book Appointment with 
     {/* {doctor?.name} */}
      </h2>
      <div className="flex gap-4 overflow-x-auto p-2 ">
        {Object.keys(availableSlots).map((date) => (
          <button
            key={date}
            className={`px-4 py-2 border rounded-full ${selectedDate === date ? "bg-[#CE7041] text-white" : "bg-gray-200"}`}
            onClick={() => setSelectedDate(date)}
          >
            {new Date(date).toDateString()}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="flex gap-4 overflow-x-auto p-2 mt-4">
          {availableSlots[selectedDate].map((time, index) => (
            <button
              key={index}
              className={`px-4 py-2 border rounded-full ${selectedTime === time ? "bg-[#CE7041] text-white" : "bg-gray-200"}`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={handleBookAppointment}
        className="mt-6 px-6 py-2 bg-[#CE7041] text-white rounded-full "
      >
        Confirm Appointment
      </button>
    </div>
  );
};

export default BookAppointment;


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useUser } from "@/src/context/UserContext";

// const BookAppointment = ({ docId }) => {
  
//   const {user} = useUser()
//   const router = useRouter()
  
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");

//   const availableTimes = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
 
//   const handleBooking = async () => {
//     if (!user) {
//       toast.warn("Please log in to book an appointment");
//         return router.push("/about");
//     }
    
//     if (!selectedDate || !selectedTime) {
//       return toast.warn("Please select a date and time");
//     }

//     try {

//    // Fetch user details from database using email
//    const userResponse = await axios.get(`/api/user/${user.email}`);

//    if (!userResponse.data || !userResponse.data._id) {
//      return toast.error("User not found in database");
//    }

//   const userId = userResponse.data._id;

//       const { data } = await axios.post(`/api/appointment`, {
//         userId: userId,
//         doctorId: docId,
//         date: selectedDate,
//         time: selectedTime,
//       });
//       console.log('data',data.date)
//       toast.success("Appointment booked successfully!");
//       setSelectedDate("")
//       setSelectedTime("")
//     } catch (error) {
//       console.error("Error booking appointment:", error);
//       toast.error("Failed to book appointment");
//     }
//   };

//   return (
//     <div className="p-4 border rounded-md shadow-md">
//       <h3 className="text-xl font-semibold">Book Appointment</h3>

//       <label className="block mt-4">Select Date:</label>
//       <input
//         type="date"
//         className="w-full p-2 border rounded-md"
//         value={selectedDate}
//         onChange={(e) => setSelectedDate(e.target.value)}
//       />

//       <label className="block mt-4">Select Time:</label>
//       <div className="flex flex-wrap gap-2">
//         {availableTimes.map((time) => (
//           <button
//             key={time}
//             className={`p-2 border rounded-md ${selectedTime === time ? "bg-blue-500 text-white" : "bg-gray-100"}`}
//             onClick={() => setSelectedTime(time)}
//           >
//             {time}
//           </button>
//         ))}
//       </div>

//       <button onClick={handleBooking} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">
//         Confirm Appointment
//       </button>
//     </div>
//   );
// };

// export default BookAppointment;
