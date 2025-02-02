import React from 'react';
import { Book } from '@/src/types/index';
import Image from 'next/image';
import TalkToDoctor from './Components/TalkToDoctor';

  const SingleBookPage = async ({ params }: { params: Promise<{ bookId: string }> }) => {
    const resolvedParams = await params; // Await params before accessing it
    const { bookId } = resolvedParams;
    
  let book: Book | null = null;

  try {
    // Fetch all books (no cache to get fresh data)
    const response = await fetch(`${process.env.BOOKLIST_URL_DEP}/list`, { cache: 'no-store' });

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
