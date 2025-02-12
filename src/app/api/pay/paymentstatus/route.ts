import appointmentModel from '@/src/models/Appointment'
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';

// const paymentstatus= async (req:NextApiRequest, res:NextApiResponse) => {
    export  const POST = async (req: NextRequest, res:NextResponse) => {
    let salt_key = process.env.PHONEPE_MERCHANT_KEY
    let merchant_id = process.env.PHONEPE_MERCHANT_ID
    

try{
    //   const merchantTransactionId = req.query.id;
    const merchantTransactionId='T1739355183590'
      const merchantId = merchant_id
     const appointmentId  = '67ac5e912031b0dd007cb550'

  const keyIndex = 1
  const string  = `/pg/v1/status/${merchantId}/${merchantTransactionId}${salt_key}`
  const sha256 = crypto.createHash('sha256').update(string).digest('hex')
  const checksum = sha256 + '###' + keyIndex

  const prod_URL_status = `${process.env.VITE_PHONEPE_URL}/status`;
  const option = {
      method: 'GET',
      url:`${prod_URL_status}/${merchantId}/${merchantTransactionId}`,
      headers: {
          'accept' : 'application/json',
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
        //   'X-MERCHANT-ID': merchantId 
      },
  }
console.log('/paymentstatus...',option)
const response = await axios(option)
console.log('response..',response)
    if (response.data.success){
         
      // res.json({message: "payment successfull", data: response.data}) //black page crome
      
      // console.log('response.data....',response.data)
      const paymentDetails = {
        transactionId: response.data.data.transactionId || "N/A",
        amount: response.data.data.amount/100 || 0, // Convert if necessary
        success: response.data.data.state === "COMPLETED" || "FAILED",
        appointmentId: appointmentId,
        date: new Date().toLocaleString(),
      };
console.log('paymentdetails...',paymentDetails)
//   //      // Update appointment with payment details
//   // await appointmentModel.findByIdAndUpdate(appointmentId, {
//   //   paymentDetails,
//   // });
  
//       // const paymentDetails = encodeURIComponent(JSON.stringify(response.data));
//       // console.log('paymentDetails....',paymentDetails)


await verifyPhonePePayment (response.data,appointmentId)
      
      const successredirecturl =  'http://localhost:3000'
// console.log('process.env.VITE_FRONTEND_URL3....', process.env.VITE_FRONTEND_URL)

      // res.redirect(`${successredirecturl}/my-appointment?paymentDetails=${encodeURIComponent(JSON.stringify(paymentDetails))}`);
     res.redirect(`${successredirecturl}/PaymentSuccess?paymentDetails=${encodeURIComponent(JSON.stringify(paymentDetails))}`);


    }else{
      
      const successredirecturl = process.env.VITE_FRONTEND_URL || 'http://localhost:3000'
// console.log('process.env.VITE_FRONTEND_URL4....', process.env.VITE_FRONTEND_URL)

        return res.redirect(`${successredirecturl}/`)
    }

} catch (error){
  console.log('error in /status route',error)
}

};


const verifyPhonePePayment = async (responseData:NextRequest, appointmentId:NextResponse) => {
    try {
      
      // const { paymentId, orderId, state } = req.body; 
      const state1 = responseData 
      console.log(state1)
const state= 'COMPLETED'
      console.log('responseData in verifypayment......',responseData)
        if (state === 'COMPLETED') {

        const appointmentData = await appointmentModel.findById(appointmentId);
          if (appointmentData) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });
            // console.log(`Appointment with ID ${appointmentId} marked as Paid.`);
          } else {
            console.log("Appointment not found.");
          }
        // res.json({ success: true, message: "Payment Successful" });

      } else {
        // res.json({ success: false, message: "Payment failed" });
      }
    } catch (error) {
      console.log(error);
      // res.json({ success: false, message: error.message });
    }
  };

