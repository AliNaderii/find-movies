// styles
import './NotFound.scss';
// images
import ErrorImage from '../../assets/images/404.jpg';

export default function NotFound() {
  return (
    <div className='notfound-container'>
      <img src={ErrorImage} alt="page not found" />
    </div>
  );
}