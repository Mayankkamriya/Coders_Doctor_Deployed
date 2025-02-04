import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kamriyamanoj45:mayank99@cluster0.sbidb.mongodb.net' ;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env");
}

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Global caching in TypeScript
declare global {
  var mongoose: Cached | undefined;
}

// Use global object to prevent multiple connections in development
const cached: Cached = global.mongoose || { conn: null, promise: null };

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {}).then((mongoose) => {
      console.log("MongoDB connected successfully!");
     return mongoose});
  }

  cached.conn = await cached.promise;
  global.mongoose = cached; // Ensure caching in development

  return cached.conn;
}

// import mongoose from "mongoose";

// // const MONGODB_URI = process.env.MONGODB_URI;
// const MONGODB_URI= ""
// console.log(MONGODB_URI)
// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable in .env.local");
// }

// let cached = global.mongoose || { conn: null, promise: null };

// export async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }).then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// import mongoose from "mongoose";

// const MONGODB_URL = process.env.MONGODB_URL;
// console.log('process.env.MONGODB_URL...',process.env.MONGODB_URL)
// if (!MONGODB_URL) {
//   throw new Error("Please define the MONGODB_URL environment variable in .env.local");
// }

// const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) return;

//   try {
//     await mongoose.connect(MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected successfully!");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;
