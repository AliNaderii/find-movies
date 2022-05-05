// styles
import './MovieListing.scss';
// tools
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies, getAllSeries, changePageIndex } from '../../features/moviesSlice';
// components
import MovieCard from '../movie-card/MovieCard';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

export default function MovieListing() {
  const dispatch = useDispatch();
  const query = useParams().param;
  const state = useSelector(state => state.movies);

  const { term, totalResults, pageIndex } = state;
  const shows = query === 'movies' ? state.movies : state.series;
  const totalPages = Math.floor(totalResults / 10);

  const moviesNextPage = () => {
    dispatch(getAllMovies({ term, page: pageIndex + 1 }));
    dispatch(changePageIndex('increment'));
  };

  const moviesPrevPage = () => {
    dispatch(getAllMovies({ term, page: pageIndex - 1 }));
    dispatch(changePageIndex('decrement'));
  };

  const seriesNextPage = () => {
    dispatch(getAllSeries({ term, page: pageIndex + 1 }));
    dispatch(changePageIndex('increment'));
  };

  const seriesPrevPage = () => {
    dispatch(getAllSeries({ term, page: pageIndex - 1 }));
    dispatch(changePageIndex('decrement'));
  };

  const goToNextPage = () => {
    if (query === 'movies') {
      moviesNextPage();
    } else {
      seriesNextPage();
    }
  };

  const goToPrevPage = () => {
    if (query === 'movies') {
      moviesPrevPage();
    } else {
      seriesPrevPage();
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
                  onClick={() => goToPrevPage()}
                  disabled={pageIndex < 2}
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