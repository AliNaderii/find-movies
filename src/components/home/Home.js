// styles
import './Home.scss';
// tools
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllMovies, getAllSeries, resetState } from '../../features/moviesSlice';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const findMovies = (e) => {
    e.preventDefault();
    dispatch(resetState());

    if (searchValue) {
      dispatch(getAllMovies({ term: searchValue }));
      navigate('/list/movies');
    }
  };

  const findSeries = (e) => {
    e.preventDefault();
    dispatch(resetState());

    if (searchValue) {
      dispatch(getAllSeries({ term: searchValue }));
      navigate('/list/series');
    }
  };

  return (
    <div className="home-container">
      <form className='form-container' onSubmit={(e) => e.preventDefault()}>
        <div className='search-container'>
          <input
            type="text"
            className='input'
            placeholder='Search...'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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