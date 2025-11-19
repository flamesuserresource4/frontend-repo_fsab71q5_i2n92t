import { useEffect, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [orderId, setOrderId] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/products`)
        if (!res.ok) throw new Error('Failed to load products')
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(it => it._id === product._id)
      if (existing) {
        return prev.map(it => it._id === product._id ? { ...it, quantity: it.quantity + 1 } : it)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const handleCheckout = () => setCheckoutOpen(true)

  const handleOrderPlaced = (id) => {
    setOrderId(id)
    setCart([])
    alert(`Order placed! Order ID: ${id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header cartCount={cart.reduce((s,i)=>s+i.quantity,0)} onToggleCart={() => setCartOpen(!cartOpen)} />

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Bangladesh Jersey Store</h2>
          <p className="text-slate-600 mt-2">Shop club and national team kits. Cash on delivery across Bangladesh.</p>
        </div>

        {loading ? (
          <p className="text-center text-slate-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <ProductCard key={p._id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </section>

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} items={cart} onOrderPlaced={handleOrderPlaced} />
    </div>
  )
}

export default App
