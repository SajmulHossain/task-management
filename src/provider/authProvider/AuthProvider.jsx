/* eslint-disable react/prop-types */
import AuthContext from "./AuthContext";


const AuthProvider = ({children}) => {
  const data = {};
  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;