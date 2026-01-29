import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleMoveToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-12 text-center">
            <Heart className="w-24 h-24 mx-auto mb-6 text-slate-600" />
            <h2 className="text-3xl font-bold text-white mb-4">Your Wishlist is Empty</h2>
            <p className="text-slate-400 mb-8">
              Save your favorite items here for later.
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
              <span>Discover Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Wishlist</h1>
          <p className="text-slate-400">{wishlistItems.length} items saved</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="glass-card group overflow-hidden hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500"
            >
              {/* Product Image */}
              <Link
                to={`/products/${product.id}`}
                className="relative block aspect-square overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    removeFromWishlist(product.id)
                  }}
                  className="absolute top-4 right-4 p-2 bg-red-500/90 hover:bg-red-600 rounded-full backdrop-blur-xl transition-all duration-300 transform hover:scale-110"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </Link>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <span className="text-xs text-slate-400 font-medium">{product.category}</span>
                  <Link
                    to={`/products/${product.id}`}
                    className="block text-white font-semibold mt-1 hover:text-blue-400 transition-colors line-clamp-2"
                  >
                    {product.name}
                  </Link>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <div className="flex items-center space-x-1 text-sm">
                    <span className="text-yellow-400">★</span>
                    <span className="text-slate-300">{product.rating}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleMoveToCart(product)}
                  className="btn-primary w-full flex items-center justify-center space-x-2 text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
