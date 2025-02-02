import React from 'react'
import { Book } from '@/src/types'
import BookCart from './BookCart'

const BookList = async() => {
  const response = await fetch(`${process.env.BOOKLIST_URL_DEP}/list?limit=${15}`);

  if(!response.ok){
    throw new Error('An error occured while fetching the Doctors')
  }
  const encodedData = await response.json();
  
    const books = JSON.parse(atob(encodedData.data));
    // console.log('Decoded Books Data...:', books);

  return (
    <div className='grid grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-10'>
      {
        books.map((book:Book) => (
          // <h1 key={book._id}>{book._id},{book.name}</h1>
          <BookCart key={book._id} book={book}/> 
        ))
      } 
    </div>
    )
}

export default BookList
