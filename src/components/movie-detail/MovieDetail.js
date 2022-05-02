// styles
import './MovieDetail.scss';
// tools
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// components
import Spinner from '../spinner/Spinner';
// constants
import { BASE_URL } from '../../constants/movieApi';
// icons
import {
  AiFillStar, AiOutlineLike, AiOutlineCalendar, AiOutlineClockCircle
} from 'react-icons/ai';
// images
import NoPhoto from '../../assets/images/no-photos.png';

export default function MovieDetail() {
  const [singleMovie, setSingleMovie] = useState({
    movie: {},
    isPending: false,
    error: null
  });
  const id = useParams().imdbID;
  console.log(singleMovie.movie);

  useEffect(() => {
    const getSingleMovie = async () => {
      setSingleMovie(prevState => {
        return {
          ...prevState,
          isPending: true,
          error: null
        };
      });

      try {
        const res = await axios.get(`${BASE_URL}&i=${id}&plot=full`);
        if (!res) {
          throw new Error('Something went wrong');
        }
        setSingleMovie(prevState => {
          return {
            ...prevState,
            movie: { ...res.data },
            isPending: false,
            error: null
          };
        });
      }
      catch (err) {
        setSingleMovie(prevState => {
          return {
            ...prevState,
            isPending: false,
            error: err.message
          };
        });
      }
    };

    getSingleMovie();

  }, [id]);
  return (
    <>
      {singleMovie.isPending && (
        <Spinner />
      )}
      {Object.keys(singleMovie.movie).length > 0 && (
        <div className="detail-container">
          <div className="left">
            <h2 className="title">{singleMovie.movie.Title}</h2>

            <div className="info">
              <p>
                <AiFillStar className='star-icon' />
                {singleMovie.movie.imdbRating}</p>
              <p>
                <AiOutlineLike className='like-icon' />
                {singleMovie.movie.imdbVotes}</p>
              <p>
                <AiOutlineClockCircle className='movie-icon' />
                {singleMovie.movie.Runtime}</p>
              <p>
                <AiOutlineCalendar className='calendar-icon' />
                {singleMovie.movie.Year}</p>
            </div>

            <div className="plot">
              <p>{singleMovie.movie.Plot}</p>
            </div>

            <ul className="details">
              <li>
                Director
                <span>
                  {singleMovie.movie.Director}
                </span>
              </li>
              <li>
                Stars
                <span>
                  {singleMovie.movie.Actors}
                </span>
              </li>
              <li>
                Genre
                <span>
                  {singleMovie.movie.Genre}
                </span>
              </li>
              <li>
                Languages
                <span>
                  {singleMovie.movie.Language}
                </span>
              </li>
              <li>
                Awards
                <span>
                  {singleMovie.movie.Awards}
                </span>
              </li>
            </ul>
          </div>

          <div className="right">
            {
              singleMovie.movie.Poster === 'N/A' ?
                (<img src={NoPhoto} alt='not available' />)
                :
                (<img src={singleMovie.movie.Poster} alt="poster" />)
            }
          </div>
        </div>

      )}
      {singleMovie.error && <p>{singleMovie.error}</p>}
    </>
  );
}