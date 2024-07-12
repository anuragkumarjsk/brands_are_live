// src/components/BookFetcher.tsx
import React,{useState} from 'react';
import { useQuery } from 'react-query';
import placeholderimage from '../src/assets/placeholderimg.webp'
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  publicationDate: string;
}

interface BookFetcherProps {
  show: number;
  setShow : React.Dispatch<React.SetStateAction<number>>;
}

const fetchBook = async (show: number): Promise<Book> => {
  const { data } = await axios.get(`https://my-json-server.typicode.com/cutamar/mock/books/${show}`);
  return data;
};

const DetailsModal: React.FC<BookFetcherProps> = ({ show, setShow }) => {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };
  const { isLoading, error, data } = useQuery<Book, Error>(['book', show], () => fetchBook(show), {
    enabled: !!show,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    {data? 
    <div className='details-modal'>
        <div className='image-c'>
        <img src={imageError? placeholderimage : data.cover} alt={data.title} onError={handleImageError} />
        </div>
        <div className='text-c'>
          <h2>{data.title}</h2>
          <p>{data.author}</p>
          <p>{data.description}</p>
          <p>Published on: {new Date(data.publicationDate).toDateString()}</p>
          <button onClick={()=>{setShow(-1)}}>close</button>
        </div>
    </div>
    : null }
    </>
  );
};

export default DetailsModal;
