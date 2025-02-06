
// from prescripto
import React from 'react';
import { Book } from '@/src/types/index';
import Image from 'next/image';
import TalkToDoctor from './Components/TalkToDoctor';

  const SingleBookPage = async ({ params }: { params: Promise<{ bookId: string }> }) => {
    const resolvedParams = await params; // Await params before accessing it
    const { bookId } = resolvedParams;
    
  let book: Book | null = null;
const route = process.env.BOOKLIST_URL_LOC 
  try {
    // Fetch all books (no cache to get fresh data)
    // const response = await fetch(`${route}/list?limit=${15}`, { cache: 'no-store' });

    const response = await fetch(`${route}/api/books?limit=${15}`, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Error fetching books');
    }

    const encodedData = await response.json();
    const books: Book[] = JSON.parse(atob(encodedData.data));

    // Find the specific book by its ID
    book = books.find((b) => b._id === bookId) || null;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error('Error fetching books: ' + err.message);
    }
    throw new Error('Unknown error occurred while fetching books');
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side: Image */}
        <div className="flex justify-center md:justify-start">
          <Image
            src={book.image}
            alt={book.name}
            className="rounded-md border"
            height={300}  // Fixed height
            width={300}   // Fixed width
            sizes="100vw"
            style={{
              objectFit: 'cover',  // Ensure the image doesn't distort
              width: '100%',
              height: 'auto',
            }}
          />
        </div>

        {/* Right side: Book Details */}
        <div className="text-primary-950">
          <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.name}</h2>
          <span className="font-semibold">{book.speciality}</span>
          <p className="mt-5 text-lg leading-8">{book.about}</p>
          <TalkToDoctor />
        </div>
      </div>
    </div>
  );
};

export default SingleBookPage;


// The below code is working but only problem is that it is saying that book not found it means it cannot pick the particular book
// import React from 'react';
// import { Book } from '@/src/types/index';
// import { connectDB } from '@/src/lib/mongodb';
// import Bookmodel from '@/src/models/Doctor';
// import Image from 'next/image';
// import TalkToDoctor from './Components/TalkToDoctor';
// import { ObjectId } from 'mongodb';

// const SingleBookPage = async ({ params }: { params: Promise<{ bookId: string }> }) => {
//   const resolvedParams = await params; // Await params before accessing it
//   const { bookId } = resolvedParams;

//   let book: Book | null = null;

//   try {
//     // Check if bookId is valid
//     if (!ObjectId.isValid(bookId)) {
//       throw new Error('Invalid bookId format');
//     }

//     // Connect to DB
//     await connectDB();

//     // Fetch all books (limit to 15 to keep it efficient)
//     const books: Book[] = await Bookmodel.find({}).limit(15);
// // console.log(books)

//     if (!books || books.length === 0) {
//       throw new Error('No books found');
//     }

//     // Convert the string bookId to ObjectId
//     const objectIdBookId = new ObjectId(bookId); // Convert bookId string to ObjectId
// // console.log('objectIdBookId.toString()...',objectIdBookId.toString())
//     // Find the specific book by ObjectId
  
// // Compare as strings directly

// book = books.find((b) => b._id.toString() === objectIdBookId.toString()) || null;
// book= await Bookmodel.findOne({ _id: bookId });
//     if (!book) {
//       throw new Error('Book not found');
//     }

//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return <div>Error fetching book: {err.message}</div>;
//     }
//     return <div>Unknown error occurred while fetching the book</div>;
//   }

//   return (
//     <div className="mx-auto max-w-6xl px-5 py-10">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Left side: Image */}
//         <div className="flex justify-center md:justify-start">
//           <Image
//             src={book.image}
//             alt={book.name}
//             className="rounded-md border"
//             height={300}  // Fixed height
//             width={300}   // Fixed width
//             sizes="100vw"
//             style={{
//               objectFit: 'cover',  // Ensure the image doesn't distort
//               width: '100%',
//               height: 'auto',
//             }}
//           />
//         </div>

//         {/* Right side: Book Details */}
//         <div className="text-primary-950">
//           <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.name}</h2>
//           <span className="font-semibold">{book.speciality}</span>
//           <p className="mt-5 text-lg leading-8">{book.about}</p>
//           <TalkToDoctor />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleBookPage;



// this is coreect but main Problem is that we are just figuring out that string compared with object for figuring out id
// import React from 'react';
// import { Book } from '@/src/types/index';
// import { connectDB } from '@/src/lib/mongodb';
// import Bookmodel from '@/src/models/Doctor'; 
// import Image from 'next/image';
// import TalkToDoctor from './Components/TalkToDoctor';
// import { ObjectId } from 'mongodb';  

//   const SingleBookPage = async ({ params }: { params: Promise<{ bookId: string }> }) => {
//     const resolvedParams = await params; // Await params before accessing it
//     const { bookId } = resolvedParams;
    
//   let book: Book | null = null;

//   try {

//     // Check if bookId is valid
//     if (!ObjectId.isValid(bookId)) {
//       throw new Error('Invalid bookId format');
//     }

//     // Fetch all books (no cache to get fresh data)
//     // const response = await fetch(`${process.env.BOOKLIST_URL_DEP}/list?limit=${15}`, 
//       // { cache: 'no-store' }
//     // );

//     await connectDB();
//     const books: Book[] = await Bookmodel.find({}).limit(15);
//     // console.log('17 books in single page ...',books)
//     if (!books) {
//       throw new Error('Book not found');
//     }
//     // const books: Book[] = await Bookmodel.find({}).limit(1);
//     book= await Bookmodel.findOne({ _id: bookId });
//     console.log('singlebook',book)
//     // console.log('Fetched book:', books);
  
//     // const encodedData = await response.json();
//     // const books: Book[] = JSON.parse(atob(encodedData.data));

//     // Find the specific book by its ID
//     book = books.find((b) => b._id.toString() === bookId) || null;

// console.log('single book ...',book)
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       throw new Error('Error fetching books: ' + err.message);
//     }
//     throw new Error('Unknown error occurred while fetching books');
//   }

//   if (!book) {
//     return <div>Book not found</div>;
//   }

//   return (
//     <div className="mx-auto max-w-6xl px-5 py-10">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Left side: Image */}
//         <div className="flex justify-center md:justify-start">
//           <Image
//             src={book.image}
//             alt={book.name}
//             className="rounded-md border"
//             height={300}  // Fixed height
//             width={300}   // Fixed width
//             sizes="100vw"
//             style={{
//               objectFit: 'cover',  // Ensure the image doesn't distort
//               width: '100%',
//               height: 'auto',
//             }}
//           />
//         </div>

//         {/* Right side: Book Details */}
//         <div className="text-primary-950">
//           <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.name}</h2>
//           <span className="font-semibold">{book.speciality}</span>
//           <p className="mt-5 text-lg leading-8">{book.about}</p>
//           <TalkToDoctor />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleBookPage;
