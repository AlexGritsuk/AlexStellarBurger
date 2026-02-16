import AppHeader from "./components/AppHeader/appHeader";
import { useEffect } from "react";
import style from "./App.module.scss";
import HomePage from "./pages/homePage/homePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ForgotPasswordPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from "./pages";
import TodoList from "./pages/todo/todo";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import { useAppDispatch } from "./services/store";
import { getCookie, getUser } from "./services/slices/asyncThunk/getUser";
import { setAuthChecked } from "./services/slices/userSlice";

export const App = () => {
  const dispatch = useAppDispatch();

  

  useEffect(() => {
    const token = getCookie("accessToken");

    if (token) {
      dispatch(getUser());
    } else {
      dispatch(setAuthChecked(true));
    }
  }, [dispatch]);

  return (
    <div className={style.app}>
      <Router>
        <AppHeader />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={<ProtectedRoute onlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<ProtectedRoute onlyUnAuth component={<RegisterPage />} />}
          />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={<ProfilePage />} />}
          />
          <Route path="/todoList" element={<TodoList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
