import { ShoppingCart } from "lucide-react"

function Header({ cartCount, onToggleCart }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
          <div className="leading-tight">
            <h1 className="text-xl font-bold tracking-tight">Jersey BD</h1>
            <p className="text-xs text-slate-500">Authentic & Fan Edition Jerseys</p>
          </div>
        </div>
        <button
          onClick={onToggleCart}
          className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <ShoppingCart size={18} />
          <span className="text-sm font-semibold">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 min-w-[20px] text-xs px-1 rounded-full bg-rose-600 text-white flex items-center justify-center">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
