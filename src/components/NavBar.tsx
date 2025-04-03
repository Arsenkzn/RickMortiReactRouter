import { Link } from 'react-router-dom';
import { LoginStatus } from '../components/LoginStatus';

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
      </ul>
  </>
  );
};

export default Navbar;