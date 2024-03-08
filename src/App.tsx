import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import { PokeInfo } from './pages/PokeInfo/PokeInfo';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:pokemon" element={<PokeInfo />} />
      </Routes>
    </div>
  );
}

export default App;
