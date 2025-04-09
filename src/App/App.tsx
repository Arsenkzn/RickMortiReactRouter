import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './app.css'

import { LoginProvider } from "../features/auth/LoginProvider";
import ErrorBoundary from "../shared/error-handling/ErrorBoundry";
const PrivatRoute = lazy(
  () => import("../features/auth/privat-route/PrivatRoute")
);
const HomePage = lazy(() => import("../pages/Home/HomePage"));
const Navbar = lazy(() => import("../widgets/nav-bar/NavBar"));
const CategoryPage = lazy(() => import("../pages/Detail/categoryPage2"));
const DetailPage = lazy(() => import("../pages/Detail/DetalPage"));
const NotFound = lazy(() => import("../pages/not-found/NotFound"));
const Login = lazy(() => import("../pages/Login"));

const App: React.FC = () => {
  return (
    <Router>
      <LoginProvider>
        <Navbar />
        <Routes>
          <Route>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <HomePage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/characters"
              element={
                <ErrorBoundary>
                  <PrivatRoute>
                    <CategoryPage category="characters" />
                  </PrivatRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/locations"
              element={
                <ErrorBoundary>
                  <PrivatRoute>
                    <CategoryPage category="location" />
                  </PrivatRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/episodes"
              element={
                <ErrorBoundary>
                  <PrivatRoute>
                    <CategoryPage category="episode" />
                  </PrivatRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/characters/:id"
              element={
                <ErrorBoundary>
                  <PrivatRoute>
                    <DetailPage category="characters" />
                  </PrivatRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/location/:id"
              element={
                <ErrorBoundary>
                  <PrivatRoute>
                    <DetailPage category="locations" />
                  </PrivatRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/episode/:id"
              element={
                <ErrorBoundary>
                  <PrivatRoute>
                    <DetailPage category="episodes" />
                  </PrivatRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="*"
              element={
                <ErrorBoundary>
                  <NotFound />
                </ErrorBoundary>
              }
            />
            <Route
              path="/login"
              element={
                <ErrorBoundary>
                  <Login />
                </ErrorBoundary>
              }
            />
          </Route>
        </Routes>
      </LoginProvider>
    </Router>
  );
};

export default App;
