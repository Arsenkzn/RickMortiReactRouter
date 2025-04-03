import { useLogin } from '../Login/LoginProvider';
import { useNavigate } from 'react-router-dom';

export function LoginStatus() {
  const log = useLogin();
  const navigate = useNavigate();

  const handleSignout = () => {
    log.signout(() => {
      navigate('/');
    });
  };

  if (log.user === null) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome, {log.user.name}!
      <button onClick={handleSignout}>Sign out</button>
    </p>
  );
}
