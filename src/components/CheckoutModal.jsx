import { useState } from 'react'

function CheckoutModal({ open, onClose, items, onOrderPlaced }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [district, setDistrict] = useState('')
  const [loading, setLoading] = useState(false)
  const delivery_fee_bdt = items.length > 0 ? 120 : 0
  const subtotal_bdt = items.reduce((sum, it) => sum + (it.price_bdt * it.quantity), 0)
  const total_bdt = subtotal_bdt + delivery_fee_bdt

  const placeOrder = async () => {
    if (!name || !phone || !address) return alert('Please fill name, phone and address')
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = {
        items: items.map(it => ({
          product_id: it._id || '',
          title: it.title,
          size: it.size || 'M',
          price_bdt: it.price_bdt,
          quantity: it.quantity,
          image_url: it.image_url || null,
        })),
        customer_name: name,
        customer_phone: phone,
        shipping_address: address,
        district: district || null,
        payment_method: 'COD',
        subtotal_bdt,
        delivery_fee_bdt,
        total_bdt,
      }
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to place order')
      const data = await res.json()
      onOrderPlaced(data._id)
      onClose()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`fixed inset-0 z-40 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div onClick={onClose} className={`absolute inset-0 bg-black/40 transition ${open ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl transition ${open ? 'opacity-100' : 'opacity-0'}`}>
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Checkout</h3>
          <p className="text-sm text-slate-500">Cash on delivery anywhere in Bangladesh</p>
        </div>
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" className="w-full border rounded-lg px-3 py-2" />
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" className="w-full border rounded-lg px-3 py-2" />
          <input value={district} onChange={e=>setDistrict(e.target.value)} placeholder="District (optional)" className="w-full border rounded-lg px-3 py-2" />
          <textarea value={address} onChange={e=>setAddress(e.target.value)} placeholder="Full Address" className="w-full border rounded-lg px-3 py-2" rows={3} />
          <div className="rounded-lg bg-slate-50 p-3 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>৳{subtotal_bdt}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>৳{delivery_fee_bdt}</span></div>
            <div className="flex justify-between font-semibold"><span>Total</span><span>৳{total_bdt}</span></div>
          </div>
        </div>
        <div className="p-6 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg border">Cancel</button>
          <button onClick={placeOrder} disabled={loading} className="flex-1 py-2 rounded-lg bg-green-600 text-white font-semibold disabled:opacity-60">{loading ? 'Placing...' : 'Place Order (COD)'}</button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutModal
