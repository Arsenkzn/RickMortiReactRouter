import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../Login/LoginProvider";

export default function  Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const log = useLogin();
  const from = location.state?.from || '/';


  const handleSubmit = (event) => {
    event.preventDefault();
    


    const formData = new FormData(event.currentTarget);
    const username = formData.get('username')
    log.signin(username, () => {
      navigate(from, {
        replace: true,
      });
    });
  }

  return (
    <> 
        <form onSubmit={handleSubmit}>
            <label>
                Username: <input type="text" name='username' />
            </label>
            <button type="submit">
                Login
            </button>
        </form>
    </>
  )
}
