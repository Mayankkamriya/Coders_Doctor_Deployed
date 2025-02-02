import React from 'react'
import Image from 'next/image'
import { Book } from '@/src/types'
import Link from 'next/link'

const BookCart = ({ book }: { book: Book }) => {
  return (
    <div className='flex gap-5 border shadow-md rounded'>
        <Image 
        src={book.image} 
        alt={book.name} 
        // width={135} 
        // height={300} 
        width={0} height={0} 
        sizes="100vw" 
        style={{width: 'auto', height:'12rem'}} 
        />
        <div className='flex flex-col justify-center'>
            <h2 className='line-clamp-3 text-xl font-bold text-primary-600 text-balance'>{book.name}</h2>
            <p className='font-bold text-primary-900 mt-1'>{book.speciality}</p>
            <Link href={`/book/${book._id}`} className='py-1 px-4 rounded border border-primary-500 mt-3 inline-flex text-primary-500 font-medium text-sm hover:border-primary-100 hover:bg-primary-100 transition justify-center w-fit'>Know More</Link>  
        </div>
    </div>
  )
}

export default BookCart