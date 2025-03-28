import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import DetailPage from './pages/DetalPage';
import NotFound from './components/NotFound';


import './App.css'


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/characters" element={<CategoryPage category="characters" />} />
        <Route path="/locations" element={<CategoryPage category="location" />} />
        <Route path="/episodes" element={<CategoryPage category="episode" />} />
        <Route path="/characters/:id" element={<DetailPage category="characters" />} />
        <Route path="/location/:id" element={<DetailPage category="locations" />} />
        <Route path="/episode/:id" element={<DetailPage category="episodes" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
