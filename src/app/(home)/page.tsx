import Banner from "./Components/Banner"
import BookList from "./Components/BookList";

export default async function Home() {

  const response = await fetch(`${process.env.BOOKLIST_URL_DEP}/list`);

  if(!response.ok){
    throw new Error('An error occured while fetching the Doctors')
  }
  const encodedData = await response.json();
  
    const books = JSON.parse(atob(encodedData.data));
    console.log('Decoded Books Data...:', books);

  return (<>

  <Banner/>
  <BookList books={books}/>

  </>
  );
}
