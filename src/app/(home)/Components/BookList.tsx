import React from 'react'
import { Book } from '@/src/types'
import BookCart from './BookCart'

const BookList = ({ books }: { books: Book[] }) => {
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-3 max-w-7xl mx-auto'>
      {
        books.map((book) => (
          // <h1 key={book._id}>{book._id},{book.name}</h1>
          <BookCart key={book._id} book={book}/> 
        ))
      } 
    </div>
    )
}

export default BookList



// import React from 'react'
// import { Book } from '@/src/types'

// const BookList = ({books}:{ books: Book[] } ) => {
//   return (
//     <div>This BookList
//       {
//        books.map((book) => (
//         <h1 key={book._id}>{book.name}</h1>
//        ))}
//     </div>
//   )
// }

// export default BookList