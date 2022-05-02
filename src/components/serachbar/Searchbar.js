// styles
import './Searchbar.scss';
// tools
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllMovies, getAllSeries } from '../../features/moviesSlice';

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findMovies = (e) => {
    e.preventDefault();
    console.log('searching movies');
    if (searchValue) {
      dispatch(getAllMovies({ term: searchValue }));
      navigate('/list/movies');
    }
  };

  const findSeries = (e) => {
    e.preventDefault();
    console.log('searching series');
    if (searchValue) {
      dispatch(getAllSeries({ term: searchValue }));
      navigate('/list/series');
    }
  };

  return (
    <form className='form-container'>
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
        <button className='btn' onClick={findMovies}>Movies</button>
        <button className='btn' onClick={findSeries}>Series</button>
      </div>
    </form>
  );
}