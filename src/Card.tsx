import React, { useState, useEffect } from 'react';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import placeholderimage from '../src/assets/placeholderimg.webp'
interface BookProps {
  book: {
    id: number;
    title: string;
    author: string;
    description: string;
    cover: string;
    publicationDate: string;
  };
  setShow: React.Dispatch<React.SetStateAction<number>>;
}

const Card: React.FC<BookProps> = ({ book, setShow }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  useEffect(() => {
    const likedList: number[] = JSON.parse(localStorage.getItem('likedlist') || '[]');
    if (likedList.includes(book.id)) {
      setLiked(true);
    }
  }, [book.id]);

  const toggleLiked = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const likedList: number[] = JSON.parse(localStorage.getItem('likedlist') || '[]');

    if (liked) {
      const updatedLikedList = likedList.filter((id) => id !== book.id);
      localStorage.setItem('likedlist', JSON.stringify(updatedLikedList));
    } else {
      const updatedLikedList = [...likedList, book.id];
      localStorage.setItem('likedlist', JSON.stringify(updatedLikedList));
    }

    setLiked(!liked);
  };

  return (
    <div className='card-container' key={book.id} onClick={() => setShow(book.id)}>
      <div style={{width: '24px', height: '24px' }} onClick={toggleLiked}>
        {liked ? (
          <HeartIconSolid className="h-1 w-1 text-red-30" />
        ) : (
          <HeartIconOutline className="h-1 w-1 text-gray-30" />
        )}
      </div>

      <h2>{book.title} by, {book.author}</h2>
      {/* <span>{book.description}</span> */}
      <img className='img-card' src={imageError? placeholderimage : book.cover} alt={book.title} onError={handleImageError}/>
      <p>Publish Date : {new Date(book.publicationDate).toDateString()}</p>
    </div>
  );
};

export default Card;
