import { createBrowserRouter } from "react-router";
import Register from "./pages/register/Register";
import { MainLayout } from "./layouts/main-layout/MainLayout";
import Home from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { ForgotPassword } from "./pages/forgot-password/ForgotPassword";
import { ChangePassword } from "./pages/change-password/ChangePassword";
import { Dashboard } from "./pages/dashboard/Dashboard";

const routes = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/change-password/:resetToken",
        element: <ChangePassword />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default routes;
