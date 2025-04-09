import React, {lazy} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import {LoginProvider} from '../Login/LoginProvider';
import ErrorBoundary from '../ErrorBoundry';
const PrivatRoute = lazy(() => import('../components/PrivatRoute'));
const HomePage = lazy(() => import('../pages/HomePage'))
const Navbar = lazy(() => import('../components/NavBar'))
const CategoryPage = lazy(() => import('../pages/categoryPage2'));
const DetailPage = lazy(() => import('../pages/DetalPage'));
const NotFound = lazy(() => import('../components/NotFound'));
const Login = lazy(() => import('../pages/Login'));

const App: React.FC = () => {
  
  return (
    <Router>
      <LoginProvider>
        <Navbar />
          <Routes>
            <Route>
                  <Route path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} /> 
                  <Route path="/characters" element={<ErrorBoundary><PrivatRoute><CategoryPage category="characters" /></PrivatRoute></ErrorBoundary>} />
                  <Route path="/locations" element={<ErrorBoundary><PrivatRoute><CategoryPage category="location" /></PrivatRoute></ErrorBoundary>} />
                  <Route path="/episodes" element={<ErrorBoundary><PrivatRoute><CategoryPage category="episode" /></PrivatRoute></ErrorBoundary>} />
                  <Route path="/characters/:id" element={<ErrorBoundary><PrivatRoute><DetailPage category="characters" /></PrivatRoute></ErrorBoundary>} />
                  <Route path="/location/:id" element={<ErrorBoundary><PrivatRoute><DetailPage category="locations" /></PrivatRoute></ErrorBoundary>} />
                  <Route path="/episode/:id" element={<ErrorBoundary><PrivatRoute><DetailPage category="episodes" /></PrivatRoute></ErrorBoundary>} />
                  <Route path="*" element={<ErrorBoundary><NotFound /></ErrorBoundary>} />
                  <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
              </Route>
          </Routes>
      </LoginProvider>
    </Router>
  );
};

export default App;
