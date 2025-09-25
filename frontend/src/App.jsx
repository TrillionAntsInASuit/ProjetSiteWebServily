import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/home.jsx";
import RootLayout from "./containers/Roots.jsx";
import Signup from "./components/signup/Signup.jsx";
import Login from "./components/login/Login.jsx";
import { useCallback, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Signup /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

const routerLoginClient = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "" },
      { path: "/subscribe" },
      { path: "/profile" },
      { path: "/dashboard" },
      { path: "/help" },
      { path: "/join/:serviceId" },
    ],
  },
]);
const routerLoginEmployeur = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "" },
      { path: "/subscribe" },
      { path: "/profile" },
      { path: "/dashboard" },
      { path: "/help" },
      { path: "/create" },
      { path: "/edit" },
    ],
  },
]);
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  if (isLoggedIn)
    if (localStorage.getItem("userType") === "client") {
      return (
        <AuthContext.Provider
          value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
        >
          <RouterProvider router={routerLoginClient} />
        </AuthContext.Provider>
      );
    } else {
      return (
        <AuthContext.Provider
          value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
        >
          <RouterProvider router={routerLoginEmployeur} />
        </AuthContext.Provider>
      );
    }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
