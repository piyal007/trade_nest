import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout/MainLayout";
import NotFound from "../components/NotFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import Categories from "../pages/Categories/Categories";
import AddProduct from "../pages/AddProduct/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        element: (
          <ProtectedRoute requiresAuth={false}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedRoute requiresAuth={false}>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        Component: Categories,
      },
      {
        path: "add-product",
        element: (
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        ),
      }
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
