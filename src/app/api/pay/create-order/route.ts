import appointmentModel from '@/src/models/Appointment'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';

// const paymentPhonePe = async (req: NextApiRequest, res: NextApiResponse) => {
  export  const POST = async (req: NextRequest) => {
    
    let salt_key = process.env.PHONEPE_MERCHANT_KEY
let merchant_id = process.env.PHONEPE_MERCHANT_ID
// console.log('salt_key...',salt_key,'merchant_id...',merchant_id)
    try {
      
      const body = await req.json(); // ✅ Manually parse JSON

      const transactionId= body.transactionId
      const appointmentId =body.appointmentId
      const amount = body.amount

      // const { appointmentId,transactionId, MUID } = req.body;
      console.log('req.body...',req.body)

      const appointmentData = await appointmentModel.findById(appointmentId);
  // console.log('appointmentdata in payment...',appointmentData)

      // if (!appointmentData || appointmentData.cancelled) {
      //   return res.json({ success: false, message: "Appointment Cancelled or not found" });
      // }
      
    // const  redirectUrl = process.env.VITE_BACKEND_URL
    const redirectUrl = 'http://localhost:3000'
    // console.log('process.env.VITE_BACKEND_URL2....', process.env.VITE_BACKEND_URL)

    const data = {
      merchantId: merchant_id,
      merchantTransactionId: transactionId,
      // amount: appointmentData.amount*100,
      amount: amount,
      redirectUrl: `http://localhost:3000/api/pay/paymentstatus?id=${transactionId}&appointmentId=${appointmentId}`,
      redirectMode: "POST",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
      };
// console.log('data ....', data)
    const KeyIndex =1

    // Base64 encode the payload
    const payload = JSON.stringify(data)
    const payloadMain = Buffer.from(payload).toString("base64url");

    // Generate X-VERIFY checksum
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256+ '###' + KeyIndex

 //   const prod_URL = `${process.env.VITE_PHONEPE_URL}/pay`;
const prod_URL = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay'

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
  // console.log('Option...',option)


    // ✅ Call PhonePe API
    const response = await axios.request(option);
console.log('response.data....', response.data)
    // ✅ Use NextResponse instead of res.json()
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error:", error.message);
    
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
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