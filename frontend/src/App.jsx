import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

import { useCart } from "./store/cartStore";

export default function App() {
  const [user, setUser] = useState(null);
  const reload = useCart((s) => s.reload);

  /* LOAD USER ON START */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  /* RELOAD CART WHEN USER CHANGES */
  useEffect(() => {
    reload();
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Shop />} />

        {/* CART ONLY IF LOGGED IN */}
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? <Admin /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
