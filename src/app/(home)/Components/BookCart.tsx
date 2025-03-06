"use client";  

import React, { useState } from 'react';
import Image from 'next/image';
import { Book } from '@/src/types';
import { useRouter } from 'next/navigation';

const BookCart = ({ book }: { book: Book }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (!isLoading) {
      setIsLoading(true);
      router.push(`/book/${String(book._id)}`);
    }
  };

  return (
    <div 
      onClick={handleClick}  // ✅ Click anywhere on the card
      className={`flex gap-5 border ml-4 shadow-md rounded p-4 cursor-pointer transition ${
        isLoading ? 'opacity-50 pointer-events-none' : 'hover:shadow-lg'
      }`}
    >
      <Image 
        src={book.image} 
        alt={book.name} 
        width={0} height={0} 
        sizes="100vw" 
        style={{ width: 'auto', height: '12rem' }} 
      />
      <div className='flex flex-col justify-center'>
        <h2 className='line-clamp-3 text-xl font-bold text-primary-600 text-balance'>{book.name}</h2>
        <p className='font-bold text-primary-900 mt-1'>{book.speciality}</p>
        
        {/* Show "Loading..." when clicking anywhere on the card */}
        <span 
          className='py-1 px-4 rounded border border-primary-500 mt-3 inline-flex text-primary-500 font-medium text-sm transition justify-center w-fit'
        >
          {isLoading ? 'Loading...' : 'Know More'}
        </span>
      </div>
    </div>
  );
};

export default BookCart;



// import React from 'react'
// import Image from 'next/image'
// import { Book } from '@/src/types'
// import Link from 'next/link'

// const BookCart = ({ book }: { book: Book }) => {
//   return (
//     <Link href={`/book/${String(book._id)}`} className="block">
//     <div className='flex gap-5 border ml-4 shadow-md rounded'>
//         <Image 
//         src={book.image} 
//         alt={book.name} 
//         // width={135} 
//         // height={300} 
//         width={0} height={0} 
//         sizes="100vw" 
//         style={{width: 'auto', height:'12rem'}} 
//         />
//         <div className='flex flex-col justify-center'>
//             <h2 className='line-clamp-3 text-xl font-bold text-primary-600 text-balance'>{book.name}</h2>
//             <p className='font-bold text-primary-900 mt-1'>{book.speciality}</p>
//             {/* <Link href={`/book/${book._id}`} className='py-1 px-4 rounded border border-primary-500 mt-3 inline-flex text-primary-500 font-medium text-sm hover:border-primary-100 hover:bg-primary-100 transition justify-center w-fit'>Know More</Link>   */}
//             <span
//               // href={`/book/${String(book._id)}`}
//               className='py-1 px-4 rounded border border-primary-500 mt-3 inline-flex text-primary-500 font-medium text-sm hover:border-primary-100 hover:bg-primary-100 transition justify-center w-fit'
//               >
//                 Know More
//             </span>
//         </div>
//     </div>
//     </Link>
//   )
// }

// export default BookCart