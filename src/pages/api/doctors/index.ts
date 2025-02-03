import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/mongodb";
import Doctor from "../../../models/Doctor";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(); // Connect to MongoDB

  if (req.method === "GET") {
    try {
      const doctors = await Doctor.find();
      return res.status(200).json(doctors);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching doctors", error });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

// import connectDB from "../../../lib/mongodb.ts";
// import Doctor from "../../../models/Doctor";

// export default async function handler(req, res) {
//   await connectDB(); // Connect to MongoDB

//   if (req.method === "GET") {
//     try {
//       const doctors = await Doctor.find();
//       res.status(200).json(doctors);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching doctors", error });
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }
