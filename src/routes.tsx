import { createBrowserRouter } from "react-router";
import Register from "./pages/register/Register";
import { MainLayout } from "./layouts/main-layout/MainLayout";
import Home from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { ForgotPassword } from "./pages/forgot-password/ForgotPassword";
import { ChangePassword } from "./pages/change-password/ChangePassword";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Chat } from "./pages/chat/Chat";
import { WaitingRoom } from "./pages/waiting-room/WaitingRoom";
import { Room } from "./pages/room/Room";

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
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/room",
        children: [
          {
            path: "join/:id",
            element: <WaitingRoom />,
          },
          {
            path: ":id",
            element: <Room />,
          },
        ],
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default routes;
