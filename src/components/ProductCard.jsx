import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star, Sparkles, Eye } from 'lucide-react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const ProductCard = ({ product }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  // Mouse position tracking for 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    toggleWishlist(product)
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <Link
        to={`/products/${product.id}`}
        className="glass-card group overflow-hidden hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 block relative"
      >
        {/* Animated Border Gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
            backgroundSize: '300% 300%',
          }}
          animate={{
            backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%',
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Inner Content */}
        <div className="relative z-10 bg-slate-900/90 rounded-2xl m-[2px]">
          {/* Image Container */}
          <div className="relative overflow-hidden aspect-square bg-slate-800/50">
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: isHovered ? '100%' : '-100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Loading Skeleton */}
            {!isImageLoaded && (
              <motion.div 
                className="absolute inset-0 bg-slate-700/50"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}

            {/* Product Image */}
            <motion.img
              src={product.image}
              alt={product.name}
              onLoad={() => setIsImageLoaded(true)}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: isImageLoaded ? 1 : 0,
                scale: isImageLoaded ? 1 : 1.1,
              }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.7 }}
            />

            {/* Floating Sparkles */}
            {isHovered && (
              <>
                <motion.div
                  className="absolute top-4 left-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -20],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
                <motion.div
                  className="absolute bottom-4 right-4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -20],
                  }}
                  transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </motion.div>
              </>
            )}

            {/* Stock Badge */}
            {product.inStock && (
              <motion.div
                className="absolute top-4 left-4 glass-card px-3 py-1 text-xs font-semibold text-green-400"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                In Stock
              </motion.div>
            )}

            {/* Wishlist Button */}
            <motion.button
              onClick={handleToggleWishlist}
              className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-xl ${
                inWishlist
                  ? 'bg-red-500/90 text-white'
                  : 'bg-white/10 text-slate-300'
              }`}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <motion.div
                animate={inWishlist ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </motion.div>
            </motion.button>

            {/* Quick View Button */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="glass-card p-3 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="w-6 h-6 text-blue-400" />
              </motion.div>
            </motion.div>

            {/* Quick Add to Cart */}
            <motion.button
              onClick={handleAddToCart}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 btn-primary flex items-center space-x-2 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </motion.button>
          </div>

          {/* Product Info */}
          <motion.div 
            className="p-4 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Category and Rating */}
            <div className="flex items-center justify-between">
              <motion.span 
                className="text-xs text-slate-400 font-medium uppercase tracking-wider"
                whileHover={{ scale: 1.05, color: '#60a5fa' }}
              >
                {product.category}
              </motion.span>
              <motion.div 
                className="flex items-center space-x-1"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  animate={{ rotate: isHovered ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </motion.div>
                <span className="text-sm text-slate-300 font-semibold">{product.rating}</span>
                <span className="text-xs text-slate-500">({product.reviews})</span>
              </motion.div>
            </div>

            {/* Product Name */}
            <motion.h3 
              className="text-white font-semibold line-clamp-2 group-hover:text-blue-400 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              {product.name}
            </motion.h3>

            {/* Price and Stock */}
            <div className="flex items-center justify-between pt-2">
              <motion.span 
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                ${product.price}
              </motion.span>
              
              {/* Animated Stock Indicator */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {product.inStock ? (
                  <motion.div 
                    className="flex items-center space-x-1"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div 
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-xs text-green-400 font-medium">Available</span>
                  </motion.div>
                ) : (
                  <span className="text-xs text-red-400 font-medium">Out of Stock</span>
                )}
              </motion.div>
            </div>

            {/* Hover Progress Bar */}
            <motion.div
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
