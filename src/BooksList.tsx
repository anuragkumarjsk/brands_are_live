// src/components/BookList.tsx
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Book from './Card';

interface pageChangerProps {
    pageNumber : number;
    setShow : React.Dispatch<React.SetStateAction<number>>;
}

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  publicationDate: string;
}

const BooksList: React.FC<pageChangerProps> = ({pageNumber,setShow}) => {
  const { isLoading, data } = useQuery(['get-books-data', pageNumber], () => {
    return axios.get<Book[]>(`${import.meta.env.VITE_BASE_URL}?_limit=5&_page=${pageNumber}`);
  });

  if (isLoading) return <h1>Loading....</h1>;

  return (
    <>
      <div className='framer'>
        {data?.data.map((book) => (
          <Book key={book.id} book={book} setShow={setShow}/>
        ))}
      </div>
    </>
  );
};

export default BooksList;
