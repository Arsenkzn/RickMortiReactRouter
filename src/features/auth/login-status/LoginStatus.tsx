import { useLogin } from '../LoginProvider';
import { useNavigate } from 'react-router-dom';



export function LoginStatus() {
  const log = useLogin();
  console.log(log.user);
  
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
      Welcome, {log.user}!
      <button onClick={handleSignout}>Sign out</button>
    </p>
  );
}
