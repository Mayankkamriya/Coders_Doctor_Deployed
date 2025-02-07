import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/src/lib/mongodb"; // Ensure you have this file
import User from "@/src/types/User"; // Import the User model

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(); // Connect to the database

  const { email } = req.query;
  // console.log('req.query= email...',email)
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    let user = await User.findOne({ email });

    // If user does not exist, create one (optional)
    if (!user) {
      user = await User.create({ name: "Unknown", email });
    }

    console.log('user in response for getting id',user)
    res.status(200).json(user);
  } catch (error:unknown) {
    // res.status(500).json({ error: "Internal Server Error" });
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}



// import { NextApiRequest, NextApiResponse } from "next";
// import {connectDB} from "@/src/lib/mongodb"; // Ensure you have this file
// import User from "@/src/types/User"; // Import the User model

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await connectDB(); // Connect to the database

//   const { email } = req.query;
//   if (!email) return res.status(400).json({ error: "Email is required" });

//   try {
//     let user = await User.findOne({ email });

//     // If user does not exist, create one (optional)
//     if (!user) {
//       user = await User.create({ name: "Unknown", email });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
