import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Star, Minus, Plus, Check, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import productsData from '../data/products.json'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [addedToCart, setAddedToCart] = useState(false)

  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id))
    if (foundProduct) {
      setProduct(foundProduct)
      if (foundProduct.sizes) setSelectedSize(foundProduct.sizes[0])
      if (foundProduct.colors) setSelectedColor(foundProduct.colors[0])
    }
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-4">Product not found</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const inWishlist = isInWishlist(product.id)

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn-secondary mb-8 flex items-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="glass-card overflow-hidden aspect-square">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`glass-card overflow-hidden aspect-square transition-all duration-300 ${
                      selectedImage === index
                        ? 'ring-2 ring-blue-500'
                        : 'hover:ring-2 hover:ring-white/30'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-blue-400 font-medium">{product.category}</span>
              <h1 className="text-4xl font-bold text-white mt-2 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ${product.price}
              </p>
            </div>

            <div className="glass-card p-6">
              <p className="text-slate-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && (
              <div className="glass-card p-6">
                <h3 className="text-white font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-slate-300">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && (
              <div>
                <h3 className="text-white font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'glass-card text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && (
              <div>
                <h3 className="text-white font-semibold mb-3">
                  Color: <span className="text-blue-400">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        selectedColor === color
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'glass-card text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="text-white font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center glass-card">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-white/10 transition-colors"
                  >
                    <Minus className="w-5 h-5 text-slate-300" />
                  </button>
                  <span className="px-6 text-white font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-white/10 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-slate-300" />
                  </button>
                </div>
                <span className="text-slate-400">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center space-x-2 ${
                  addedToCart
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'btn-primary'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => toggleWishlist(product)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  inWishlist
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'glass-card hover:bg-white/10 text-slate-300'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
