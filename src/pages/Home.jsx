import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Zap, Shield, Truck, Laptop, Shirt, Dumbbell, Home as HomeIcon } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import productsData from '../data/products.json'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load products
    setTimeout(() => {
      setFeaturedProducts(productsData.slice(0, 8))
      setIsLoading(false)
    }, 300)
  }, [])

  const categories = [
    { 
      name: 'Electronics', 
      icon: Laptop, 
      gradient: 'from-blue-500 to-cyan-500',
      count: productsData.filter(p => p.category === 'Electronics').length
    },
    { 
      name: 'Fashion', 
      icon: Shirt, 
      gradient: 'from-purple-500 to-pink-500',
      count: productsData.filter(p => p.category === 'Fashion').length
    },
    { 
      name: 'Sports', 
      icon: Dumbbell, 
      gradient: 'from-green-500 to-emerald-500',
      count: productsData.filter(p => p.category === 'Sports').length
    },
    { 
      name: 'Home', 
      icon: HomeIcon, 
      gradient: 'from-orange-500 to-red-500',
      count: productsData.filter(p => p.category === 'Home').length
    },
  ]

  const features = [
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
    { icon: Zap, title: 'Fast Delivery', desc: '2-3 business days' },
    { icon: Sparkles, title: 'Premium Quality', desc: 'Guaranteed' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">New Arrivals Just Dropped</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-slide-up" style={{ animationDelay: '0.3s' }}>
                Discover Premium
              </div>
              <div className="text-white animate-slide-up" style={{ animationDelay: '0.4s' }}>
                Products You'll Love
              </div>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.5s' }}>
              Shop the latest trends in electronics, fashion, and lifestyle. Quality guaranteed.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <Link to="/products" className="btn-primary flex items-center space-x-2">
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/products" className="btn-secondary">
                Explore Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon
              return (
                <div
                  key={index}
                  className="glass-card p-6 text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <FeatureIcon className="w-10 h-10 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop by Category</h2>
            <p className="text-slate-400 text-lg">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Link
                  key={index}
                  to={`/products?category=${category.name}`}
                  className="glass-card p-6 md:p-8 text-center group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.gradient} p-3 md:p-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                      <IconComponent className="w-full h-full text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors mb-2">
                      {category.name}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm font-medium group-hover:text-slate-300 transition-colors">
                      {category.count} Products
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Featured Products</h2>
              <p className="text-slate-400 text-lg">Handpicked items just for you</p>
            </div>
            <Link to="/products" className="btn-secondary hidden sm:flex items-center space-x-2 hover:scale-110 transition-transform duration-300">
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              <div className="text-center mt-12 sm:hidden">
                <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
                  <span>View All Products</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 text-center relative overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl font-bold text-white">
                Get 20% Off Your First Order
              </h2>
              <p className="text-slate-400 text-lg">
                Subscribe to our newsletter and receive exclusive deals
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-field flex-1 focus:scale-105 transition-transform duration-300"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap hover:scale-110 transition-transform duration-300">
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
