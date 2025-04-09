import { Link, Outlet } from 'react-router-dom';
import { LoginStatus } from '../../features/auth/login-status/LoginStatus';
import { Suspense } from 'react';

export const Navbar = () => {
  return (
    <>
    <LoginStatus />
      <ul className="no-bullets">
          <li style={{ marginRight: '20px' }}>
            <Link to="/">Главная</Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link to="/characters">Герои</Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link to="/locations">Локации</Link>
          </li>
           <li>
            <Link to="/episodes">Эпизоды</Link>
           </li>
           <li>
            <Link to="/login">Login</Link>
           </li>
           <main>
            <Suspense fallback={<h3>Loading....</h3>}>
              <Outlet />
            </Suspense>
           </main>
      </ul>
  </>
  );
};

export default Navbar;