import './Error.scss';
import NotFound from '../not-found/NotFound';

export default function Error({ message }) {
  const error = message === 'Too many results.' ? 'too many' : 'not found';
  console.log(error);

  return (
    <div className='error-container'>
      {
        error === 'too many' ? (
          <p className='error-text'>{message}</p>
        ) : (
          <NotFound />
        )
      }
    </div>
  );
}