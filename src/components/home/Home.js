// styles
import './Home.scss';
// tools
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllMovies, getAllSeries, resetState } from '../../features/moviesSlice';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  const findMovies = (e) => {
    e.preventDefault();
    dispatch(resetState());

    if (!searchValue) {
      setError('You did not searched for anything');
    } else {
      dispatch(getAllMovies({ term: searchValue }));
      navigate('/list/movies');
    }
  };

  const findSeries = (e) => {
    e.preventDefault();
    dispatch(resetState());

    if (!searchValue) {
      setError('You did not searched for anything');
    } else {
      dispatch(getAllSeries({ term: searchValue }));
      navigate('/list/series');
    }
  };

  console.log(process.env);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="home-container">
      <div className='title-container'>
        <h2 className='title'>What are you looking for?</h2>
        {error && <p className='error'>{error}</p>}
      </div>
      <form className='form-container' onSubmit={(e) => e.preventDefault()}>
        <div className='search-container'>
          <input
            type="text"
            className='input'
            placeholder='Search...'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            ref={inputRef}
            onFocus={() => setError('')}
          />
        </div>
        <div className='btn-container'>
          <button
            className='btn'
            type='button'
            onClick={findMovies}
          >
            Movies
          </button>
          <button
            className='btn'
            onClick={findSeries}
            type='button'
          >
            Series
          </button>
        </div>
      </form>
    </div >
  );
}