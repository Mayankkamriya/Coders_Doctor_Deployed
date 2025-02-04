import React from 'react'
import { Book } from '@/src/types'
import { connectDB } from "@/src/lib/mongodb";
import Bookmodel from "@/src/models/Doctor";
import BookCart from './BookCart'

const BookList = async () => {
  // Connect to MongoDB
  await connectDB();

  // Fetch books and ensure _id is converted to a string
  const books = await Bookmodel.find({}).limit(15).lean();

  if (!books || books.length === 0) {
    throw new Error('No books found');
  }

  // Convert _id to string before passing to the component
  const formattedBooks: Book[] = books.map(book => ({
    ...book,
    _id: String(book._id), // Convert ObjectId to string
  }));

  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-10'>
      {
        formattedBooks.map((book: Book) => (
          <BookCart key={book._id} book={book} /> 
        ))
      }
    </div>
  );
}

export default BookList;



// import React from 'react'
// import { Book } from '@/src/types'
// import { connectDB } from "@/src/lib/mongodb";
// import Bookmodel from "@/src/models/Doctor";
// import BookCart from './BookCart'

// const BookList = async() => {
//   // const response = await fetch(`${process.env.BOOKLIST_URL_DEP}/list?limit=${15}`);
//   // const response = await fetch('/api/books'); // Fetch from Next.js API
//   await connectDB();
//   const books: Book[] = await Bookmodel.find({}).limit(15).lean();
//   // console.log(books)
//   if(!books){
//     throw new Error('An error occured while fetching the Doctors')
//   }
//   // const encodedData = await books.json();
  
//     // const books = JSON.parse(atob(encodedData.data));
//     // console.log('Decoded Books Data...:', books);

//   return (
//     <div className='grid grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-10'>
//       {
//         books.map((book:Book) => (
//           // <h1 key={book._id}>{book._id},{book.name}</h1>
//           <BookCart key={book._id} book={book}/> 
//         ))
//       } 
//     </div>
//     )
// }

// export default BookList
