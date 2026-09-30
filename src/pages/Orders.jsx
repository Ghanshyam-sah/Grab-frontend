import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/mine").then((res) => setOrders(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="max-w-3xl mx-auto px-6 py-16 text-ink/50">Loading…</p>;

  if (orders.length === 0) {
    return <p className="max-w-3xl mx-auto px-6 py-16 text-ink/60">You haven't placed any orders yet.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl mb-8 text-ink">Your orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border border-stone/30 p-5">
            <div className="flex justify-between text-sm text-ink/60 mb-3">
              <span>Order #{order._id.slice(-6)}</span>
              <span className="capitalize">{order.status}</span>
            </div>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm py-1 text-ink/80">
                <span>{item.name} × {item.quantity} (Size {item.size})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between mt-3 pt-3 border-t border-stone/20 font-medium text-ink">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
