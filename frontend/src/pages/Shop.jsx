import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useCart } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const add = useCart((s) => s.add);
  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const load = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch {
      console.log("Load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addCart = (product) => {
    if (!user) return nav("/login");
    add(product);
    setMsg("Added to cart");
    setTimeout(() => setMsg(""), 1500);
  };

  const buyNow = (product) => {
    if (!user) return nav("/login");
    add(product);
    nav("/cart");
  };

  const del = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await api.delete(`/products/${id}`);
    load();
  };

  const editPrice = async (product) => {
    const price = prompt("Enter new price", product.price);
    if (!price) return;
    await api.put(`/products/${product._id}`, { price });
    load();
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      {msg && <div className="toast">{msg}</div>}

      <div className="grid">
        {products.map((p) => {
          const isAdmin = user?.role === "admin";

          // ✅ SAFE ADMIN ID
          const adminId = typeof p.admin === "object" ? p.admin._id : p.admin;

          const isOwner = String(adminId) === String(user?._id);

          return (
            <div key={p._id} className="card">
              <img src={p.image} alt={p.name} />

              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <h4>₹{p.price}</h4>

              {/* BUY BUTTONS (NOT OWNER ADMIN) */}
              {!(isAdmin && isOwner) && (
                <div className="shopBtns">
                  <button onClick={() => addCart(p)}>Add Cart</button>
                  <button onClick={() => buyNow(p)}>Buy Now</button>
                </div>
              )}

              {/* ADMIN OWNER CONTROLS */}
              {isAdmin && isOwner && (
                <div className="adminBtns">
                  <button onClick={() => editPrice(p)}>Edit Price</button>
                  <button onClick={() => del(p._id)}>Delete</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
