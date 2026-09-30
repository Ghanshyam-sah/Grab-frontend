import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
      setSize(res.data.sizes?.[0] || "");
    });
  }, [id]);

  if (!product) return <p className="max-w-6xl mx-auto px-6 py-16 text-ink/50">Loading…</p>;

  const handleAdd = () => {
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
      <div className="aspect-[3/4] bg-stone/10 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="max-w-md">
        <p className="text-xs uppercase tracking-wide text-stone">{product.category}</p>
        <h1 className="font-display text-3xl mt-1 text-ink">{product.name}</h1>
        <p className="text-xl mt-3 text-ink/80">${product.price}</p>
        <p className="mt-6 text-ink/70 leading-relaxed">{product.description}</p>

        {product.colors?.length > 0 && (
          <p className="mt-6 text-sm text-ink/60">Colors: {product.colors.join(", ")}</p>
        )}

        <div className="mt-6">
          <p className="text-sm text-ink/60 mb-2">Size</p>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1.5 text-sm border rounded ${
                  size === s ? "border-ink bg-ink text-sand" : "border-stone/40 text-ink/70"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="mt-8 w-full bg-ink text-sand py-3 text-sm tracking-wide hover:bg-olive transition-colors"
        >
          {added ? "Added to cart ✓" : "Add to cart"}
        </button>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 w-full text-sm text-ink/50 hover:text-ink"
        >
          ← Back to shop
        </button>
      </div>
    </div>
  );
}
