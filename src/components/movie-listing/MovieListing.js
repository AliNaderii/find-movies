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
  const shows = query === 'movies' ? state.movies : state.series;

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
      <h2 className="title">{query}</h2>
      <div className="cards-container">
        {state.status === 'succeeded' && shows.length > 0 &&
          <>
            {
              shows.map(item => (
                <MovieCard movie={item} key={item.imdbID} />
              ))
            }
            <button
              className='next-page-btn'
              onClick={() => nextPage()}
            >
              Next
            </button>
          </>
        }
      </div>
      {state.status === 'loading' && <Spinner />}
      {state.status === 'failed' && <p>{state.error}</p>}
    </div >
  );
}