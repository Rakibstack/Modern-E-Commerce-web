import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="glass-card mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                LuxeStore
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              Your destination for premium products and exceptional shopping experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 group">
                <Facebook className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
              </a>
              <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 group">
                <Twitter className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
              </a>
              <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 group">
                <Instagram className="w-5 h-5 text-slate-400 group-hover:text-pink-400" />
              </a>
              <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 group">
                <Youtube className="w-5 h-5 text-slate-400 group-hover:text-red-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-slate-400 hover:text-white transition-colors duration-300">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="text-slate-400 hover:text-white transition-colors duration-300">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=Fashion" className="text-slate-400 hover:text-white transition-colors duration-300">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/products?category=Sports" className="text-slate-400 hover:text-white transition-colors duration-300">
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="input-field pl-10 pr-4 text-sm"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              </div>
              <button type="submit" className="btn-primary w-full text-sm py-2">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {currentYear} LuxeStore. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-slate-400 text-sm">We accept:</span>
              <div className="flex space-x-2">
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method) => (
                  <div
                    key={method}
                    className="glass-card px-3 py-1 text-xs text-slate-300 font-medium"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
