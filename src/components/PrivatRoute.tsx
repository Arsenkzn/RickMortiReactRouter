import { Navigate, useLocation } from "react-router-dom";
import { useLogin } from "../Login/LoginProvider";

export default function PrivatRoute({ children }) {
    const log = useLogin();
    const location = useLocation();

    if(log.user   === null) {
        return <Navigate to="/login" state={{from: location.pathname}} replace />
    }
  return children;
}
