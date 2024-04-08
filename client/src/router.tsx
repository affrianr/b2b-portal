import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";

const AppLayout = (): JSX.Element => {
  return (
    <main>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="header">
        <Navbar />
      </div>
      <div className="main">
        <Outlet />
      </div>
    </main>
  );
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/",
    element: <AppLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
