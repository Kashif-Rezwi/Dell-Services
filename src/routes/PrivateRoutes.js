import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const { token } = useSelector((store) => store);

  if (!token) {
    return <Navigate to={"/signin"} />;
  }
  return children;
};
