import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api/axios";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlacing(true);
    setError("");
    try {
      await api.post("/orders", {
        items: items.map((i) => ({
          product: i.product,
          name: i.name,
          image: i.image,
          price: i.price,
          size: i.size,
          quantity: i.quantity,
        })),
        shippingAddress: form,
        total,
      });
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order. Are you logged in?");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl mb-8 text-ink">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <input
          name="fullName" placeholder="Full name" required value={form.fullName} onChange={handleChange}
          className="border border-stone/40 bg-transparent px-3 py-2 sm:col-span-2"
        />
        <input
          name="street" placeholder="Street address" required value={form.street} onChange={handleChange}
          className="border border-stone/40 bg-transparent px-3 py-2 sm:col-span-2"
        />
        <input
          name="city" placeholder="City" required value={form.city} onChange={handleChange}
          className="border border-stone/40 bg-transparent px-3 py-2"
        />
        <input
          name="postalCode" placeholder="Postal code" required value={form.postalCode} onChange={handleChange}
          className="border border-stone/40 bg-transparent px-3 py-2"
        />
        <input
          name="country" placeholder="Country" required value={form.country} onChange={handleChange}
          className="border border-stone/40 bg-transparent px-3 py-2"
        />
        <input
          name="phone" placeholder="Phone" required value={form.phone} onChange={handleChange}
          className="border border-stone/40 bg-transparent px-3 py-2"
        />

        <div className="sm:col-span-2 flex justify-between items-center pt-4 border-t border-stone/20 mt-2">
          <span className="text-ink/70">Total</span>
          <span className="text-lg text-ink font-medium">${total.toFixed(2)}</span>
        </div>

        {error && <p className="sm:col-span-2 text-rust text-sm">{error}</p>}

        <button
          type="submit"
          disabled={placing}
          className="sm:col-span-2 bg-ink text-sand py-3 text-sm tracking-wide hover:bg-olive transition-colors disabled:opacity-50"
        >
          {placing ? "Placing order…" : "Place order"}
        </button>
        <p className="sm:col-span-2 text-xs text-ink/40 text-center">
          Demo checkout — no real payment is processed. Connect Stripe to take real payments.
        </p>
      </form>
    </div>
  );
}
