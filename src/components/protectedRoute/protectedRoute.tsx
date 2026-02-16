import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/store";

interface Props {
  onlyUnAuth?: boolean;
  component: React.ReactElement;
}

const ProtectedRoute = ({ onlyUnAuth = false, component }: Props) => {
  const { data: user, isAuthChecked } = useAppSelector((store) => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <p>Загрузка данных пользователя...</p>;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export default ProtectedRoute;
