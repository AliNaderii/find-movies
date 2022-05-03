import './Error.scss';

export default function Error({ message }) {
  return (
    <div className='error-container'>
      <p className='error-text'>{message}</p>
    </div>
  );
}