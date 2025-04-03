import React, {lazy} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
// import CategoryPage from './pages/CategoryPage';
// import DetailPage from './pages/DetalPage';
// import NotFound from './components/NotFound';
import './App.css'
import {LoginProvider} from './Login/LoginProvider';
// import { Login } from './pages/Login';
import PrivatRoute from './components/PrivatRoute';

const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const DetailPage = lazy(() => import('./pages/DetalPage'));
const NotFound = lazy(() => import('./components/NotFound'));
const Login = lazy(() => import('./pages/Login'));

const App: React.FC = () => {
  return (
    <Router>
      <LoginProvider>
        <Navbar />
        <Routes>
          <Route>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/characters" element={<PrivatRoute><CategoryPage category="characters" /></PrivatRoute>} />
            <Route path="/locations" element={<PrivatRoute><CategoryPage category="location" /></PrivatRoute>} />
            <Route path="/episodes" element={<PrivatRoute><CategoryPage category="episode" /></PrivatRoute>} />
            <Route path="/characters/:id" element={<PrivatRoute><DetailPage category="characters" /></PrivatRoute>} />
            <Route path="/location/:id" element={<PrivatRoute><DetailPage category="locations" /></PrivatRoute>} />
            <Route path="/episode/:id" element={<PrivatRoute><DetailPage category="episodes" /></PrivatRoute>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </LoginProvider>
    </Router>
  );
};

export default App;
