import React from 'react'
import { Book } from '@/src/types'
import Image from 'next/image'
import TalkToDoctor from './Components/TalkToDoctor'
interface SingleBookPageProps {
  params: { bookId: string };
}

const singleBookPage = async ({ params }: SingleBookPageProps) => {
  const { bookId } = params; // Destructure bookId from params

  let book: Book | null = null;

  try {
    // Fetch all books
    const response = await fetch(`${process.env.BOOKLIST_URL_DEP}/list`);

    if (!response.ok) {
      throw new Error('Error fetching books');
    }

    const encodedData = await response.json();
    const books: Book[] = JSON.parse(atob(encodedData.data)); 

    // Find the specific book by its ID
    book = books.find((b) => b._id === bookId) || null; // Match `_id` with `bookId`

    console.log('Single book...', book);
  } catch (err: any) {
    throw new Error('Error fetching books');
  }

  if (!book) {
    throw new Error('Book not found');
  }

  return (
  <>
  <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10">
    <div className="col-span-2 pr-16 text-primary-950">
        <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.name}</h2>
        <span className="font-semibold"> {book.speciality}</span>
        <p className="mt-5 text-lg leading-8">{book.about}</p>
      <TalkToDoctor />
    </div>
    <div className="flex justify-end">
        <Image
           src={book.image}
           alt={book.name}
           className="rounded-md border"
           height={0}
           width={0}
           sizes="100vw"
           style={{ width: 'auto', height: 'auto' }}
       />
    </div>
  </div>
  </>
  );
};

export default singleBookPage;
