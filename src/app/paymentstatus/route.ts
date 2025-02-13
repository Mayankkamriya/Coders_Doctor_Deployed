import appointmentModel from '@/src/models/Appointment'
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';

    export  const POST = async (req: NextRequest) => {
    const salt_key = process.env.PHONEPE_MERCHANT_KEY
    const merchant_id = process.env.PHONEPE_MERCHANT_ID
    
try{
  
  // console.log(encodeURIComponent(JSON.stringify(res)))

      const successredirecturl =  process.env.BOOKLIST_URL_LOC
      const merchantTransactionId = req.nextUrl.searchParams.get("id");
      const appointmentId = req.nextUrl.searchParams.get("appointmentId");
      const merchantId = merchant_id

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
          'X-MERCHANT-ID': merchantId 
      },
  }

const response = await axios(option)

    if (response.data.success){
         
      const paymentDetails = {
        transactionId: response.data.data.transactionId || "N/A",
        amount: response.data.data.amount/100 || 0, // Convert if necessary
        success: response.data.data.state === "COMPLETED" || "FAILED",
        appointmentId: appointmentId,
        date: new Date().toLocaleString(),
      };
console.log(encodeURIComponent(JSON.stringify(paymentDetails)))
  //      // Update appointment with payment details
  // await appointmentModel.findByIdAndUpdate(appointmentId, {
  //   paymentDetails,
  // });
  
if (!appointmentId ) {
  return NextResponse.json({ success: false, message: Error },
    { status: 500 }
  );
}

 await verifyPhonePePayment (response.data,appointmentId)
      
      // res.redirect(`${successredirecturl}/my-appointment?paymentDetails=${encodeURIComponent(JSON.stringify(paymentDetails))}`);
    //  return NextResponse.redirect(`${successredirecturl}/appointment?paymentDetails=${encodeURIComponent(JSON.stringify(paymentDetails))}`);

    const url = new URL(`${successredirecturl}/appointment`);
    // url.searchParams.append('paymentDetails', JSON.stringify(paymentDetails));
    
    return NextResponse.redirect(url.toString());

    }else{
      
        return NextResponse.redirect(`${successredirecturl}/about`)
    }

} catch (error){
  console.log('error in /status route',error)
}

};

interface PhonePeResponse {
  data?: {
    state?: string;
  };
}

const verifyPhonePePayment = async (responseData:PhonePeResponse, appointmentId:string) => {
    try {
      const successredirecturl =  process.env.BOOKLIST_URL_LOC
      // const { paymentId, orderId, state } = req.body; 
      const state = responseData?.data?.state 
      
        if (state === 'COMPLETED') {

        const appointmentData = await appointmentModel.findById(appointmentId);
          if (appointmentData) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });
            // console.log(`Appointment with ID ${appointmentId} marked as Paid.`);
            return NextResponse.redirect(`${successredirecturl}/appointment`);

    //  return NextResponse.redirect(`${successredirecturl}/appointment?paymentDetails=${encodeURIComponent(JSON.stringify(paymentDetails))}`);
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

