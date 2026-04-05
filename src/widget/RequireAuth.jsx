import { Navigate, useLocation } from "react-router-dom";
import { useGetCurrentUserQuery } from "../store/api";

function RequireAuth({ children }) {
  const location = useLocation();
  const { data, isLoading, isError } = useGetCurrentUserQuery();

  if (isLoading) {
    return null;
  }

  if (isError || !data) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

export default RequireAuth;
