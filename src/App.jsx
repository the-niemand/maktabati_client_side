import React from 'react';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "maktabati_client_side/Dashboard/*",
    element: (
      <Dashboard />
    ),
  }, {
    path: "maktabati_client_side/Login",
    element: (
      <Auth />
    ),
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;


