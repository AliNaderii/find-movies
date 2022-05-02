// styles
import './MovieListing.scss';
// tools
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies, getAllSeries, incrementPage } from '../../features/moviesSlice';
// components
import MovieCard from '../movie-card/MovieCard';
import Spinner from '../spinner/Spinner';

export default function MovieListing() {
  const dispatch = useDispatch();
  const query = useParams().param;
  const state = useSelector(state => state.movies);
  const term = state.term;
  const totalResults = state.totalResults;
  const pageIndex = query === 'movies' ?
    state.moviesPageIndex : state.seriesPageIndex;
  const shows = query === 'movies' ? state.movies : state.series;
  const totalPages = Math.floor(state.totalResults / 10);

  const moviesNextPage = () => {
    const nextPage = state.moviesPageIndex + 1;
    dispatch(getAllMovies({ term, nextPage }));
    dispatch(incrementPage('movies'));
  };

  const seriesNextPage = () => {
    const nextPage = state.seriesPageIndex + 1;
    dispatch(getAllSeries({ term, nextPage }));
    dispatch(incrementPage('seires'));
  };

  const nextPage = () => {
    if (query === 'movies') {
      moviesNextPage();
    } else {
      seriesNextPage();
    }
  };


  return (
    <div className='list-container'>
      {state.status === 'succeeded' && shows.length > 0 &&
        <>
          <p className='info'>
            {totalResults}
            <span className="title">
              {query.toUpperCase()}
            </span>
            found
          </p>
          <div className="cards-container">
            {
              shows.map(item => (
                <MovieCard movie={item} key={item.imdbID} />
              ))
            }
            <div className='pagination'>
              <div className="btn-container">
                <button
                  className='change-page-btn'
                  onClick={() => nextPage()}
                >
                  Prev
                </button>
                <button
                  className='change-page-btn'
                  onClick={() => nextPage()}
                >
                  Next
                </button>
              </div>
              <p>page {pageIndex} of {totalPages}</p>
            </div>
          </div>
        </>
      }

      {state.status === 'loading' && <Spinner />}
      {state.status === 'failed' && <p>{state.error}</p>}
    </div >
  );
}