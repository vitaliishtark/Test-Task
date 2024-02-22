import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import { PokeInfo } from './pages/PokeInfo/PokeInfo';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokeinfo" element={<PokeInfo />} />
        <Route path="/about" element={<About />} />
        <Route element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
