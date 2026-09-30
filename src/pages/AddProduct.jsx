import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CATEGORIES = ["outerwear", "tops", "bottoms", "dresses", "footwear", "accessories"];

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "tops",
    sizes: "S, M, L",
    colors: "",
    image: "",
    stock: "20",
    featured: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/products", {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
        image: form.image,
        stock: Number(form.stock),
        featured: form.featured,
      });
      setSuccess("Product added.");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Could not add product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl mb-8 text-ink">Add a product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name" placeholder="Product name" required
          value={form.name} onChange={handleChange}
          className="border border-stone/40 bg-transparent px-3 py-2"
        />
        <textarea
          name="description" placeholder="Description" required rows={3}
          value={form.description} onChange={handleChange}
          className="border border-stone/40 bg-transparent px-3 py-2"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="price" type="number" min="0" step="0.01" placeholder="Price" required
            value={form.price} onChange={handleChange}
            className="border border-stone/40 bg-transparent px-3 py-2"
          />
          <input
            name="stock" type="number" min="0" placeholder="Stock" required
            value={form.stock} onChange={handleChange}
            className="border border-stone/40 bg-transparent px-3 py-2"
          />
        </div>
        <select
          name="category" value={form.category} onChange={handleChange}
          className="border border-stone/40 bg-transparent px-3 py-2"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          name="sizes" placeholder="Sizes, comma separated (e.g. S, M, L)"
          value={form.sizes} onChange={handleChange}
          className="border border-stone/40 bg-transparent px-3 py-2"
        />
        <input
          name="colors" placeholder="Colors, comma separated (e.g. Black, Sand)"
          value={form.colors} onChange={handleChange}
          className="border border-stone/40 bg-transparent px-3 py-2"
        />
        <input
          name="image" placeholder="Image URL" required
          value={form.image} onChange={handleChange}
          className="border border-stone/40 bg-transparent px-3 py-2"
        />
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Feature this product
        </label>

        {error && <p className="text-rust text-sm">{error}</p>}
        {success && <p className="text-olive text-sm">{success}</p>}

        <button
          type="submit" disabled={saving}
          className="bg-ink text-sand py-3 text-sm tracking-wide hover:bg-olive transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : "Add product"}
        </button>
      </form>
    </div>
  );
}
