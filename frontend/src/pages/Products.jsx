import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useCart } from "../store/cartStore";

export default function Products() {
  const [p, setP] = useState([]);
  const add = useCart((s) => s.add);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/products");
        setP(res.data);
      } catch (err) {
        console.log("Failed to load products");
      }
    };

    load();
  }, []);

  return (
    <div className="grid">
      {p.map((x) => (
        <div key={x._id} className="card">
          <img src={x.image} alt={x.name} />

          <h3>{x.name}</h3>
          <p>₹{Number(x.price)}</p>

          <button onClick={() => add(x)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
