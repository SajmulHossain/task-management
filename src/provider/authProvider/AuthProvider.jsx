/* eslint-disable react/prop-types */
import { useState } from "react";
import AuthContext from "./AuthContext";


const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);



  const data = {user};
  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;