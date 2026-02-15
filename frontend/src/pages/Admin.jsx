import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [p, setP] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  /* LOAD PRODUCTS */
  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await api.get("/products");
      setProducts(res.data.filter((x) => String(x.admin) === String(user._id)));
    } finally {
      setLoadingProducts(false);
    }
  };

  /* LOAD ORDERS */
  const loadOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch {
      navigate("/login");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  /* ADD PRODUCT */
  const addProduct = async () => {
    if (!p.name || !p.price || !p.image) return alert("Fill all fields");

    const fd = new FormData();
    fd.append("name", p.name);
    fd.append("price", p.price);
    fd.append("description", p.description);
    fd.append("image", p.image);

    await api.post("/products", fd);
    setP({ name: "", price: "", description: "", image: null });
    loadProducts();
  };

  const del = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  const editPrice = async (product) => {
    const price = prompt("Enter new price", product.price);
    if (!price) return;
    await api.put(`/products/${product._id}`, { price });
    loadProducts();
  };

  const completeOrder = async (id) => {
    if (!window.confirm("Mark order completed?")) return;
    await api.put(`/orders/complete/${id}`);
    setOrders((prev) => prev.filter((o) => o._id !== id));
  };

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>

      {/* ADD PRODUCT */}
      <div className="form">
        <h3>Add Product</h3>

        <input
          placeholder="Name"
          value={p.name}
          onChange={(e) => setP({ ...p, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={p.price}
          onChange={(e) => setP({ ...p, price: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setP({ ...p, image: e.target.files[0] })}
        />
        <input
          placeholder="Description"
          value={p.description}
          onChange={(e) => setP({ ...p, description: e.target.value })}
        />

        <button onClick={addProduct}>Add Product</button>
      </div>

    
      <h3>My Products</h3>

      {loadingProducts ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p style={{ opacity: 0.7 }}>📦 No products uploaded yet.</p>
      ) : (
        <div className="adminGrid">
          {products.map((x) => (
            <div key={x._id} className="adminCard">
              <img src={x.image} alt={x.name} />
              <h4>{x.name}</h4>
              <p>₹{x.price}</p>

              <button onClick={() => editPrice(x)}>Edit</button>
              <button onClick={() => del(x._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}


      <h3>My Orders</h3>

      {loadingOrders ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p style={{ opacity: 0.7 }}>🛒 No orders received yet.</p>
      ) : (
        <div className="orderGrid">
          {orders.map((o) => {
            const myItems = o.products.filter((p) => {
              const adminId =
                typeof p.admin === "object" ? p.admin._id : p.admin;
              return String(adminId) === String(user._id);
            });

            if (!myItems.length) return null;

            const myTotal = myItems.reduce(
              (sum, p) => sum + Number(p.price) * (p.qty || 1),
              0,
            );

            return (
              <div key={o._id} className="orderCard">
                <h4>👤 {o.address?.fullName}</h4>
                <p>📞 {o.address?.phone}</p>

                <p>
                  🏠 {o.address?.street}, {o.address?.city}, {o.address?.state}{" "}
                  – {o.address?.zip}
                </p>

                <b>Product Details :</b>

                {myItems.map((p, i) => (
                  <p key={i}>
                    • {p.name} (Qty: {p.qty || 1}) — ₹{p.price * (p.qty || 1)}
                  </p>
                ))}

                <b>
                  <p
                    style={{ fontSize: "12px", opacity: 0.7, marginTop: "6px" }}
                  >
                    • order date: {new Date(o.createdAt).toLocaleString()}
                  </p>
                </b>

                <b style={{ display: "block", marginTop: "6px" }}>
                  Total ₹{myTotal}
                </b>

                <button
                  style={{ marginTop: "10px" }}
                  onClick={() => completeOrder(o._id)}
                >
                  Mark Completed
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
