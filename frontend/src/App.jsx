import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/home.jsx";
import RootLayout from "./containers/Roots.jsx";
import Signup from "./components/signup/Signup.jsx";
import Login from "./components/login/Login.jsx";
import { useCallback, useState } from "react";
import { AuthContext } from "./context/auth-context.js";

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
      { path: "/", element: <Home /> },
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
      { path: "/" },
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
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    return !!token && !!userType;
  });

  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userType, setUserType] = useState(() =>
    localStorage.getItem("userType")
  );

  const login = useCallback((uid, token, type) => {
    setIsLoggedIn(true);
    setUserId(uid);
    setToken(token);
    setUserType(type);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", uid);
    localStorage.setItem("userType", type);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
  }, []);
  if (isLoggedIn) {
    if (localStorage.getItem("userType") === "client") {
      return (
        <AuthContext.Provider
          value={{ isLoggedIn, userId, token, userType, login, logout }}
        >
          <RouterProvider router={routerLoginClient} />
        </AuthContext.Provider>
      );
    } else {
      return (
        <AuthContext.Provider
          value={{ isLoggedIn, userId, token, login, logout }}
        >
          <RouterProvider router={routerLoginEmployeur} />
        </AuthContext.Provider>
      );
    }
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, token, login, logout }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
