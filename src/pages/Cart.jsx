import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="text-ink/60 mb-4">Your cart is empty.</p>
        <Link to="/" className="text-ink underline">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl mb-8 text-ink">Your cart</h1>
      <div className="divide-y divide-stone/20">
        {items.map((item) => (
          <div key={item.key} className="flex gap-4 py-5">
            <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-stone/10" />
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="text-ink">{item.name}</h3>
                <span className="text-ink/70">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <p className="text-sm text-ink/50 mt-1">Size {item.size}</p>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => updateQuantity(item.key, item.quantity - 1)}
                  className="w-7 h-7 border border-stone/40 rounded text-ink/70"
                >
                  −
                </button>
                <span className="text-sm w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.key, item.quantity + 1)}
                  className="w-7 h-7 border border-stone/40 rounded text-ink/70"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.key)}
                  className="ml-auto text-xs text-rust hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center text-lg">
        <span className="text-ink/70">Total</span>
        <span className="text-ink font-medium">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 w-full bg-ink text-sand py-3 text-sm tracking-wide hover:bg-olive transition-colors"
      >
        Proceed to checkout
      </button>
    </div>
  );
}
