import { useState } from "react";
import { useCart } from "../store/cartStore";
import { api } from "../api/api";

export default function Cart() {
  const cart = useCart((s) => s.cart);
  const clear = useCart((s) => s.clear);
  const remove = useCart((s) => s.remove); // remove by index

  const [addr, setAddr] = useState({
    fullName: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    street: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((a, b) => a + Number(b.price), 0);

  const validate = () =>
    addr.fullName &&
    addr.phone &&
    addr.city &&
    addr.state &&
    addr.zip &&
    addr.street;

  const order = async () => {
    setMsg("");

    if (!cart.length) return setMsg("Your cart is empty.");
    if (!validate()) return setMsg("Please fill all shipping details.");
    if (!window.confirm(`Total ₹${total}. Confirm order?`)) return;

    try {
      setLoading(true);

      await api.post("/orders", {
        products: cart,
        total,
        address: addr,
      });

      clear();

      setAddr({
        fullName: "",
        phone: "",
        city: "",
        state: "",
        zip: "",
        street: "",
      });

      setMsg("🎉 Order confirmed. Thank you for shopping with us!");
    } catch (err) {
      setMsg(err.response?.data || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkoutWrapper">
      <div className="cartBox">
        <h3>Your Cart</h3>

        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cart.map((x, i) => (
            <div key={i} className="cartItem">
              <img src={x.image} alt={x.name} />

              <div>
                <b>{x.name}</b>
                <p>₹{x.price}</p>

                {/* REMOVE ONLY THIS ITEM */}
                <button
                  style={{
                    marginTop: "5px",
                    fontSize: "12px",
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => remove(i)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))
        )}

        <h4>Total ₹{total}</h4>
      </div>

      <div className="checkoutBox">
        <h3>Shipping Details</h3>

        <input
          placeholder="Full Name"
          value={addr.fullName}
          onChange={(e) => setAddr({ ...addr, fullName: e.target.value })}
        />

        <input
          placeholder="Phone Number"
          value={addr.phone}
          onChange={(e) => setAddr({ ...addr, phone: e.target.value })}
        />

        <input
          placeholder="City"
          value={addr.city}
          onChange={(e) => setAddr({ ...addr, city: e.target.value })}
        />

        <input
          placeholder="State"
          value={addr.state}
          onChange={(e) => setAddr({ ...addr, state: e.target.value })}
        />

        <input
          placeholder="Pin Code"
          value={addr.zip}
          onChange={(e) => setAddr({ ...addr, zip: e.target.value })}
        />

        <input
          placeholder="Landmark"
          value={addr.street}
          onChange={(e) => setAddr({ ...addr, street: e.target.value })}
        />

        {msg && <p>{msg}</p>}

        <button className="confirmBtn" onClick={order} disabled={loading}>
          {loading ? "Processing..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}
