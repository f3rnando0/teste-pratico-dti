import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import { store } from "./lib/store";
import { Provider } from "react-redux";
import React from "react";
import { RequireAuth } from "./components/requireAuth/requireAuth";
import { Layout } from "./components/layout/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
