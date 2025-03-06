"use client";  // Ensure it's a client component

import React, { useEffect, useState } from "react";
import { useUser } from "@/src/context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Appointment } from "@/src/types/Appointment";

const AppointmentList = () => {
  const { user } = useUser();  // Get user from context
  const [appointments, setAppointments] =  useState<Appointment[]>([]);

  useEffect(() => {
    if (!user) return;  // Don't fetch if user is not logged in

    const fetchAppointments = async () => {
      try {

    const userResponse = await axios.get(`/api/user/${user?.email}`);

    if (!userResponse.data || !userResponse.data._id) {
      return toast.error("User not found");
     }

    const userId = userResponse.data._id;

        const appointment = await axios.get(`/api/appointment?userId=${userId}`);
        setAppointments(appointment.data.data);

      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments.");
      }
    };

    fetchAppointments();
  }, [user]);

  const payAppointment = async (appointmentId: string,) => {

    const data = {
      name: "mayank kamriya",
      mobileNumber:'1234567890',
      amount: 10*100,
      appointmentId : appointmentId,
      MUID:"MUIDW" + Date.now(),
      transactionId: "T" + Date.now(),
    }
    try {
      console.log('data...',data)
      const response = await axios.post( '/api/pay/create-order', data, {
        headers: {
          'Content-Type': 'application/json', // ✅ Ensure correct content type
        },})
  console.log('response...',response)
      if (response.data && response.data.data.instrumentResponse.redirectInfo.url) {
          window.location.href= response.data.data.instrumentResponse.redirectInfo.url;
          console.log('Api Response Infrontend  ....',response.data)
        }
  
      if (response.status) {
        // toast.success('Payment is successful')
        console.log('response.success')
      }
  
    } catch (error) {
      console.log("error in payment", error)
    }


  }


  const cancelAppointment = async (appointmentId: string) => {
    try {
      const response = await axios.patch(`/api/appointment?appointmentId=${appointmentId}`);

      if (response.data.success) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, cancelled: true }
              : appointment
          )
        );
      } else {
        console.error("Failed to cancel appointment:", response.data.message);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };


  return (
    <div className="px-5 pl-[4.25rem] pr-[4.25rem] py-2">
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div>
          <p className="pb-3 mt-4 font-medium text-zinc-700 border-b">MyAppointment</p>
          <div>
            {appointments.map((item, index) => {
              return (
                <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
                  {/* <div>
                    <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
                  </div> */}
                  <div className="flex-1 text-sm text-zinc-600">
                    {/* <p className="text-neutral-800 font-semibold">{item.docData.name}</p> */}
                    {/* <p>{item.docData.speciality}</p> */}
                    <p className="text-xs mt-1">
                      <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>{" "}
                      {item.date} | {item.time}
                    </p>
                  </div>
                  {/* <div></div> */}
  
                  <div className="flex flex-col gap-2 justify-center">
                    {item.payment && !item.isCompleted && (
                      <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-100">
                        Paid
                      </button>
                    )}
  
                    {!item.cancelled && !item.payment && !item.isCompleted && (
                      <button onClick={() =>payAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white hover:bg-[#CD7041] transition-all duration-300">
                        Pay Online
                      </button>
                    )}
  
                    {!item.cancelled && !item.isCompleted && (
                      <button onClick={() =>cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                        Cancel Appointment
                      </button>
                    )}
  
                    {item.cancelled && !item.isCompleted && (
                      <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                        Appointment Cancelled
                      </button>
                    )}
  
                    {item.isCompleted && (
                      <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                        Completed
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}  

export default AppointmentList;
