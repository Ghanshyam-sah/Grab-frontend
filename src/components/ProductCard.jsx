import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="aspect-[3/4] overflow-hidden bg-stone/10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="mt-3 flex justify-between items-baseline">
        <h3 className="text-sm text-ink">{product.name}</h3>
        <span className="text-sm text-ink/60">रु{product.price}</span>
      </div>
      <p className="text-xs text-stone capitalize">{product.category}</p>
    </Link>
  );
}
