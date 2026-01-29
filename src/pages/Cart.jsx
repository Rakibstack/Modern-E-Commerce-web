import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-12 text-center">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-slate-600" />
            <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-slate-400 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
              <span>Start Shopping</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const shipping = cartTotal > 50 ? 0 : 9.99
  const tax = cartTotal * 0.1
  const total = cartTotal + shipping + tax

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="glass-card p-6 flex flex-col sm:flex-row gap-6 hover:bg-white/10 transition-all duration-300"
              >
                {/* Product Image */}
                <Link
                  to={`/products/${item.id}`}
                  className="w-full sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <Link
                      to={`/products/${item.id}`}
                      className="text-white font-semibold text-lg hover:text-blue-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-slate-400 text-sm">{item.category}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-sm">
                    {item.selectedSize && (
                      <span className="glass-card px-3 py-1 text-slate-300">
                        Size: {item.selectedSize}
                      </span>
                    )}
                    {item.selectedColor && (
                      <span className="glass-card px-3 py-1 text-slate-300">
                        Color: {item.selectedColor}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center glass-card">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1,
                            item.selectedSize,
                            item.selectedColor
                          )
                        }
                        className="p-2 hover:bg-white/10 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-slate-300" />
                      </button>
                      <span className="px-4 text-white font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1,
                            item.selectedSize,
                            item.selectedColor
                          )
                        }
                        className="p-2 hover:bg-white/10 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-slate-300" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-slate-400 text-sm">${item.price} each</p>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() =>
                    removeFromCart(item.id, item.selectedSize, item.selectedColor)
                  }
                  className="self-start p-2 hover:bg-red-500/20 rounded-lg transition-all duration-300 group"
                >
                  <Trash2 className="w-5 h-5 text-slate-400 group-hover:text-red-400" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-28 space-y-6">
              <h2 className="text-2xl font-bold text-white">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-white">Total</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="glass-card p-4 bg-blue-500/10 border border-blue-500/20">
                  <p className="text-blue-400 text-sm">
                    Add ${(50 - cartTotal).toFixed(2)} more to get FREE shipping!
                  </p>
                </div>
              )}

              <button className="btn-primary w-full flex items-center justify-center space-x-2">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/products"
                className="btn-secondary w-full text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
