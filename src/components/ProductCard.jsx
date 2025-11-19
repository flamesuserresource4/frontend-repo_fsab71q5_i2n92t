function ProductCard({ product, onAdd }) {
  const price = product.discount_bdt && product.discount_bdt > 0
    ? product.price_bdt - product.discount_bdt
    : product.price_bdt

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
        <img src={product.image_url || "/jersey-placeholder.jpg"} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold leading-snug line-clamp-2">{product.title}</h3>
          {product.is_authentic !== null && product.is_authentic !== undefined && (
            <span className="text-[10px] uppercase bg-slate-800 text-white px-2 py-0.5 rounded-full">{product.is_authentic ? 'Authentic' : 'Fan'}</span>
          )}
        </div>
        {product.team && (
          <p className="text-xs text-slate-500 mb-2">{product.team}{product.league ? ` • ${product.league}` : ''}</p>
        )}
        <div className="flex items-center gap-2 mb-3">
          {product.discount_bdt > 0 && (
            <span className="text-sm text-slate-400 line-through">৳{product.price_bdt}</span>
          )}
          <span className="text-lg font-bold text-slate-900">৳{price}</span>
        </div>
        <button
          onClick={() => onAdd(product)}
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
