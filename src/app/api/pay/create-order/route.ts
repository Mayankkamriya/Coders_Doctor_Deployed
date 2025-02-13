import appointmentModel from '@/src/models/Appointment'
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';

  export  const POST = async (req: NextRequest) => {
    
    const redirectUrl =  process.env.BOOKLIST_URL_LOC
    const salt_key = process.env.PHONEPE_MERCHANT_KEY
    const merchant_id = process.env.PHONEPE_MERCHANT_ID
    try {
      
      const body = await req.json(); 

      const transactionId= body.transactionId
      const appointmentId =body.appointmentId
      const amount = body.amount

      // const { appointmentId,transactionId, MUID } = req.body;

      const appointmentData = await appointmentModel.findById(appointmentId);

      if (!appointmentData || appointmentData.cancelled) {
        return NextResponse.json({ success: false, message: "Appointment Cancelled or not found" },
          { status: 500 }
        );
    }

    const data = {
      merchantId: merchant_id,
      merchantTransactionId: transactionId,
      // amount: appointmentData.amount*100,
      amount: amount,
      redirectUrl: `${redirectUrl}/paymentstatus?id=${transactionId}&appointmentId=${appointmentId}`,
      redirectMode: "POST",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
      };

    const KeyIndex =1

    // Base64 encode the payload
    const payload = JSON.stringify(data)
    const payloadMain = Buffer.from(payload).toString("base64url");

    // Generate X-VERIFY checksum
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256+ '###' + KeyIndex

   const prod_URL = `${process.env.VITE_PHONEPE_URL}/pay`;

  const option = {
    method: 'POST',
    url:prod_URL,
    headers: {
        accept : 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
    },
    data :{
        request : payloadMain
    }
  }
    const response = await axios.request(option);
    
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
    console.error("Error:", error.message);
    
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )};
  }
};

//       // Call to PhonePe API to create an order
//     axios
//     .request(option)
//     .then( async(response)=> {  
//       res.json(response.data)

//     })
//     .catch(function (error) {
//       console.error(error.message);
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

  // export default paymentPhonePe;