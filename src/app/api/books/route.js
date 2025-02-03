import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Book from "@/src/models/Doctor";

export async function GET() {
  try {
    await connectDB(); // Connect to MongoDB

    const books = await Book.find({}).limit(15); // Fetch books from DB
    const encodedData = btoa(JSON.stringify(books)); // Encode in base64
console.log("after fetch book")
    return NextResponse.json({ data: encodedData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching books", error }, { status: 500 });
  }
}
