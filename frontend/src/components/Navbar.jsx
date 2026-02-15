import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    setUser(null);
    nav("/login");
  };

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className="nav">
      <h2>🛒 ShopStore</h2>

      <div className="profile">
        <Link to="/">Shop</Link>

        {/* CART FOR BOTH USER + ADMIN */}
        {user && <Link to="/cart">Cart</Link>}

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Sign Up</Link>}

        {user && (
          <div
            className="avatarBox"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            <img className="avatar" src={user.avatar} alt="profile" />

            {open && (
              <div className="dropdown">
                <p>
                  <b>{user.username}</b>
                </p>
                <p>{user.email}</p>

                {user.role === "admin" && (
                  <Link to="/admin">
                    <b>
                      <u>Admin Dashboard</u>
                    </b>
                  </Link>
                )}

                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
