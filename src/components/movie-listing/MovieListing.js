// styles
import './MovieListing.scss';
// tools
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies, getAllSeries, incrementPage } from '../../features/moviesSlice';
// components
import MovieCard from '../movie-card/MovieCard';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

export default function MovieListing() {
  const dispatch = useDispatch();
  const query = useParams().param;
  const state = useSelector(state => state.movies);
  const term = state.term;
  const totalResults = state.totalResults;
  const pageIndex = state.pageIndex;
  const shows = query === 'movies' ? state.movies : state.series;
  const totalPages = Math.floor(state.totalResults / 10);
  console.log(state);
  const page = state.pageIndex + 1;

  const moviesNextPage = () => {
    dispatch(getAllMovies({ term, page }));
    dispatch(incrementPage('movies'));
  };

  const seriesNextPage = () => {
    dispatch(getAllSeries({ term, page }));
    dispatch(incrementPage('seires'));
  };

  const goToNextPage = () => {
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
              shows.map(show => (
                <MovieCard movie={show} key={show.imdbID} />
              ))
            }
            <div className='pagination'>
              <div className="btn-container">
                <button
                  className='change-page-btn'
                  onClick={() => goToNextPage()}
                >
                  Prev
                </button>
                <button
                  className='change-page-btn'
                  onClick={() => goToNextPage()}
                >
                  Next
                </button>
              </div>
              <p>page {pageIndex} of {totalPages}</p>
            </div>
          </div>
        </>
      }
      {
        (state.status === 'failed' || state.error)
        &&
        <Error message={state.error} />
      }
      {
        (state.status === 'loading' && !state.error)
        &&
        <Spinner />
      }
    </div >
  );
}