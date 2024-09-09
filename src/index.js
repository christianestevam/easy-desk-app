import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./services/ProtectedRoute"; // Letra maiúscula no nome do componente

import App from "./pages/App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterRestaurantForm from "./pages/RegisterRestaurantForm/RegisterRestaurantForm";

import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Config from "./pages/Config";

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
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/menu",
    element: (
      <ProtectedRoute>
        <Menu />
      </ProtectedRoute>
    ),
  },
  {
    path: "/config",
    element: (
      <ProtectedRoute>
        <Config />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register-restaurant",
    element: (
      <ProtectedRoute>
        <RegisterRestaurantForm />
      </ProtectedRoute>
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