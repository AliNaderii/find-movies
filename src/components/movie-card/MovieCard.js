// styles
import './MovieCard.scss';
// tools
import { Link } from 'react-router-dom';
// images
import NoPhoto from '../../assets/images/no-photos.png';

export default function MovieCard({ movie }) {
  return (
    <>
      <Link to={`/movie/${movie.imdbID}`} className='card'>
        <div className="card-img">
          {
            movie.Poster === 'N/A' ? (
              <img
                src={NoPhoto}
                alt="movie poster"
                className='no-photo'
              />
            ) : (
              <img
                className='photo'
                src={movie.Poster}
                alt="movie poster"
              />
            )
          }
        </div>
        <div className='card-info'>
          <p className='card-title'>{movie.Title}</p>
          <span className='card-tag'>{movie.Year}</span>
        </div>
      </Link>
    </>
  );
}