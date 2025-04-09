import  { createContext, useContext, useState } from 'react'

type UserType = {
     id?: string;
     name?: string;
   };
  
   interface LoginContextValue {
     user: UserType | null;
     signin: (newUser: UserType, callback: () => void) => void;
     signout: (callback: () => void) => void;
   }

const LoginContext = createContext<LoginContextValue>({
     user: null,
     signin: () => {},
     signout: () => {}
   });

export function useLogin(): LoginContextValue {
    return useContext(LoginContext);
}


export function LoginProvider({ children }) {
    const [user, setUser] = useState(null);

    const signin = (newUser: UserType, callback: () => void) => {
        setUser(newUser);
        localStorage.setItem('user', newUser);
        console.log(newUser);
        callback();
    }
    const signout = (callback: () => void) => {
        setUser(null);
        localStorage.removeItem('user');
        callback();
    }
    const value: LoginContextValue = {
        user,
        signin,
        signout,
    }
  return (
    <LoginContext.Provider value={value}>
     {children}
    </LoginContext.Provider>

  )
}