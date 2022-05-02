// styles
import './App.scss';
// tools
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import MovieDetail from './components/movie-detail/MovieDetail';
import NotFound from './components/not-found/NotFound';
import MovieListing from './components/movie-listing/MovieListing';

function App() {
  return (
    <div className="main-container">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/list/:param' element={<MovieListing />} />
          <Route path='/movie/:imdbID' element={<MovieDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
