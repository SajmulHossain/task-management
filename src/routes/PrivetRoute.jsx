/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../component/Loading";


const PrivetRoute = ({children}) => {
  const { loading, user} = useAuth();
   if (loading) {
     return <Loading />;
   }

   if (!user) {
     return <Navigate to="/login" replace={true} state={{ isRedirected: true }} />;
   }

  return children;
};

export default PrivetRoute;