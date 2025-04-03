import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h2>Oops! Страница не найдена </h2>
      <Link to='/'>Обратно на Home</Link>
      </div>
  )
}

export default NotFound;

