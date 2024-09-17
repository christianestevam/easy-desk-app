import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./services/ProtectedRoute";

import App from "./pages/App/App";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import RegisterRestaurantForm from "./pages/RegisterRestaurantForm/RegisterRestaurantForm";
import RegisterMenuForm from "./pages/RegisterMenuForm/RegisterMenuForm";

import Orders from "./pages/Orders/Orders";
import Menu from "./pages/Menu/Menu";
import Tables from "./pages/Tables/Tables";
import Config from "./pages/Config/Config";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/orders",
    element: (
      // <ProtectedRoute>
        <Orders />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/menu",
    element: (
      // <ProtectedRoute>
        <Menu />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/tables",
    element: (
      // <ProtectedRoute>
        <Tables />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/config",
    element: (
      // <ProtectedRoute>
        <Config />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/register-restaurant",
    element: (
      // <ProtectedRoute>
        <RegisterRestaurantForm />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/register-menu",
    element: (
      // <ProtectedRoute>
        <RegisterMenuForm />
      // </ProtectedRoute>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();