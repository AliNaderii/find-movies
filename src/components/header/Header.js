// styles
import './Header.scss';
// tools
import { Link } from 'react-router-dom';
// components
// import Searchbar from '../serachbar/Searchbar';

export default function Header() {
  return (
    <div className="header-container">
      <h1 className="logo">
        <Link to='/'>Find Me The Show </Link>
      </h1>
      {/* <Searchbar /> */}
    </div>
  );
}