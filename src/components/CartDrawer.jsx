import { X } from "lucide-react"

function CartDrawer({ open, items, onClose, onCheckout }) {
  const subtotal = items.reduce((sum, it) => sum + (it.price_bdt * it.quantity), 0)
  const delivery = items.length > 0 ? 120 : 0
  const total = subtotal + delivery

  return (
    <div className={`fixed inset-0 z-30 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-220px)]">
          {items.length === 0 && (
            <p className="text-slate-500">Your cart is empty.</p>
          )}
          {items.map((it, idx) => (
            <div key={idx} className="flex gap-3 items-center border rounded-lg p-3">
              <img src={it.image_url || '/jersey-placeholder.jpg'} alt={it.title} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-medium leading-tight">{it.title}</p>
                <p className="text-xs text-slate-500">Size: {it.size || 'M'}</p>
                <p className="text-sm font-semibold">৳{it.price_bdt} × {it.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t space-y-2">
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>৳{subtotal}</span></div>
          <div className="flex justify-between text-sm"><span>Delivery</span><span>৳{delivery}</span></div>
          <div className="flex justify-between font-semibold"><span>Total</span><span>৳{total}</span></div>
          <button onClick={onCheckout} className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold">Checkout</button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
