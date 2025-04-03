import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <ul>
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
  </ul>
  );
};

export default Navbar;