import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const ProductCard = ({ product }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    toggleWishlist(product)
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="glass-card group overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square bg-slate-800/50">
        {!isImageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-slate-700/50" />
        )}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          } group-hover:scale-110`}
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-xl transition-all duration-300 transform hover:scale-110 ${
            inWishlist
              ? 'bg-red-500/90 text-white'
              : 'bg-white/10 text-slate-300 hover:bg-white/20'
          }`}
        >
          <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 btn-primary opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">{product.category}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-slate-300">{product.rating}</span>
            <span className="text-xs text-slate-500">({product.reviews})</span>
          </div>
        </div>

        <h3 className="text-white font-semibold line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ${product.price}
          </span>
          {product.inStock ? (
            <span className="text-xs text-green-400 font-medium">In Stock</span>
          ) : (
            <span className="text-xs text-red-400 font-medium">Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
