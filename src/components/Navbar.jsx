import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  return (
    <header className="border-b border-stone/30  bg-sand/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-tight text-ink">
          Grab
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink/80">
          <Link to="/" className="hover:text-ink">Shop</Link>
          {user && <Link to="/orders" className="hover:text-ink">Orders</Link>}
          {user?.role === "admin" && (
            <Link to="/admin/add-product" className="hover:text-ink">Add product</Link>
          )}
        </nav>
        <div className="flex items-center gap-5 text-sm">
          {user ? (
            <>
              <span className="hidden sm:inline text-ink/60">Hi, {user.name.split(" ")[0]}</span>
              <button onClick={() => { logout(); navigate("/"); }} className="text-ink/80 hover:text-ink">
                Log out
              </button>
            </>
          ) : (
            <Link to="/login" className="text-ink/80 hover:text-ink">Log in</Link>
          )}
          <Link to="/cart" className="relative text-ink/80 hover:text-ink">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-rust text-sand text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
