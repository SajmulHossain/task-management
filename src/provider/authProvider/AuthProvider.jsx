/* eslint-disable react/prop-types */
import AuthContext from "./AuthContext";


const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value={''}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;