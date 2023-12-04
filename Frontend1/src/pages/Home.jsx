import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ShowType, SetShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (


    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => SetShowType('tables')}>
          Table

        </button>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => SetShowType('card')}>
          card

        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'> Lavar's Book List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? <Spinner /> : ShowType == 'table' ? (<BooksTable books={books} />) : (<BooksCard books={books} />)
      }
    </div>
  );
};

export default Home;

