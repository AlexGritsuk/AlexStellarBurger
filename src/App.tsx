import AppHeader from "./components/AppHeader/appHeader";
import { useEffect } from "react";
import style from "./App.module.scss";
import HomePage from "./pages/homePage/homePage";
import {  
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import FeedPage from "./pages/feedPage/feedPage";
import Modal from "./components/modals/modal/modal";
import OrderInfo from "./components/orderInfo/orderInfo";
import { OrderInfoPage } from "./pages/orderInfoPage/orderInfoPage";
import IngredientDetails from "./components/modals/ingredientDetails/ingredientDetails";
import { IngredientDetailsPage } from "./pages/ingredientDetailsPage/ingredientDetailsPage";
import { fetchIngredients } from "./services/slices/asyncThunk/fetchIngredients";
import ProfileOrders from "./components/profileOrder/profileOrder";
import { ProfileForm } from "./pages/profilePage/profileForm";

export const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

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
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<OrderInfoPage />} />
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
        <Route path="/todoList" element={<TodoList />} />
        <Route
          path="/login"
          element={<ProtectedRoute onlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<ProtectedRoute onlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth component={<ForgotPasswordPage />} />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth component={<ResetPasswordPage />} />
          }
        />

        <Route
          path="/profile"
          element={<ProtectedRoute component={<ProfilePage />} />}
        >
          <Route index element={<ProfileForm />} />

          <Route path="orders" element={<ProfileOrders />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
