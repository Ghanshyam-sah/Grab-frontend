import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["all", "outerwear", "tops", "bottoms", "dresses", "footwear", "accessories"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products", { params: { category } })
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div >
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 grid md:grid-cols-2 gap-10 items-end">
        <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-ink">
          Pieces you'll<br />still wear in ten years.
        </h1>
        <p className="text-ink/70 max-w-sm md:justify-self-end">
          GRAB is a modern wardrobe built around effortless style — quality fabrics, clean silhouettes, and timeless pieces designed to be worn beyond the season.

        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6">
        <div className="flex gap-2 flex-wrap mb-8 border-b border-stone/30 pb-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 text-sm rounded-full capitalize transition-colors ${
                category === c ? "bg-ink text-sand" : "text-ink/70 hover:bg-stone/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-ink/50 py-16 text-center">Loading pieces…</p>
        ) : products.length === 0 ? (
          <p className="text-ink/50 py-16 text-center">
            No products found. Run the backend seed script to add sample items.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-x-6 gap-y-10 pb-20">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
