import { useEffect, useState } from 'react'
import {QueryClientProvider,QueryClient} from 'react-query'
import './App.scss'
import BooksList from './BooksList'
import DetailsModal from './DetailsModal'
const queryClient = new QueryClient()

interface localarray{
  bookid : []
}
function App() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [show,setShow] = useState<number>(-1)  

  useEffect(() => {
    const key = 'likedlist';
    const item = localStorage.getItem(key);
    const initialvalue : localarray[] = [];
    if (item === null) {
       localStorage.setItem(key,JSON.stringify(initialvalue))
        } 
  }, []);

  return (
    <>
    <QueryClientProvider client={queryClient} >
      <div className='primary-container'>
        <div className='website-title'>Brands are live booklist</div>
        <div className='toggler'>
        <button onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <div className='current-page'>Page Number : {pageNumber}</div>
        <button onClick={() => setPageNumber((prev) => prev + 1)}>Next</button>
      </div>
        <BooksList pageNumber={pageNumber} setShow={setShow}/>
      </div>
      {show !== -1 ? <DetailsModal  show={show} setShow={setShow}/> : null }
      </QueryClientProvider>
    </>
  )
}

export default App
