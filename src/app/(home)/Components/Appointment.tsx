"use client";  // Ensure it's a client component

import React, { useEffect, useState } from "react";
import { useUser } from "@/src/context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const AppointmentList = () => {
  const { user } = useUser();  // Get user from context
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user) return;  // Don't fetch if user is not logged in

    const fetchAppointments = async () => {
      try {

const userResponse = await axios.get(`/api/user/${user?.email}`);

if (!userResponse.data || !userResponse.data._id) {
  return toast.error("User not found in database");
 }

const userId = userResponse.data._id;
console.log('userId...',userId)

        const response = await axios.get(`/api/appointment?userId=${userId}`);
        console.log('response....',response.data)
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments.");
      }
    };

    fetchAppointments();
  }, [user]);
  return (
    <div>
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div>appointmetn found</div>
        // <ul>
        //   {appointments.map((appointment) => (
        //     // <li key={appointment._id}>
        //       {/* {appointment.date} at {appointment.time} with Dr. {appointment.doctorId} */}
        //     // </li>
        //   ))}
        // </ul>
      )}
    </div>
  );
};

export default AppointmentList;



// // "use client"
// import React from 'react'
// import  { Appointment }   from '@/src/types/Appointment'
// import { connectDB } from "@/src/lib/mongodb";
// import AppointmentModel from "@/src/models/Appointment";
// // import { useUser } from "@/src/context/UserContext";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/src/lib/auth";
// import axios from "axios";
// import { toast } from "react-toastify";
// // import { useRouter } from "next/navigation";

// const AppointmentList = async () => {

//   await connectDB();

//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return <p>Please log in to see your appointments.</p>;
//   }

//   const userEmail = session.user.email; // Assuming NextAuth stores user ID

//   // const router = useRouter()
//   // const {user} = useUser()
  
// // console.log('user info ..', user)

// // if (!user) {
// //       toast.warn("Please log in to book an appointment");
// //         // return router.push("/about");
//     // }

// // //  Fetch user details from database using email
// // const userResponse = await axios.get(`/api/user/${user?.email}`);

// // if (!userResponse.data || !userResponse.data._id) {
// //   return toast.error("User not found in database");
// //  }

// // const userId = userResponse.data._id;

// const appointment = await AppointmentModel.find({ userEmail})

// if (!appointment || appointment.length === 0) {
//   throw new Error('No appointment found');
// }

// console.log(' all Appointments...',appointment);
// // const userAppointments = appointment.filter((appointment) => appointment.userId === userId);

//   // const formattedBooks: Appointment[] = appointments.map(appointment => ({
//   //   ...appointment.toObject(), // Convert Mongoose document to plain object
//   //   _id: appointment._id.toString(), // Ensure _id is a string
//   // }));

//   return (
//     <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-10'>
//       hi from appointment{}
    
//     </div>
//   //   <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-10'>
//   //   {
//   //     formattedBooks.map((appointment: Appointment) => (
//   //       <BookCart key={book._id} book={book} /> 
//   //     ))
//   //   }
//   // </div>
//   );
// }

// export default AppointmentList;