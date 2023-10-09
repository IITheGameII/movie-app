import React from 'react';
import Movie from './Movie';
import MovieDetails from './MovieDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Searchresult from './Searchresult';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Movie />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/search/:keyword' element={<Searchresult />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App; 