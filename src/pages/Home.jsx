import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Zap, Shield, Truck, Laptop, Shirt, Dumbbell, Home as HomeIcon } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import productsData from '../data/products.json'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const heroRef = useRef(null)
  const blob1Ref = useRef(null)
  const blob2Ref = useRef(null)

  useEffect(() => {
    // Load products
    setTimeout(() => {
      setFeaturedProducts(productsData.slice(0, 8))
      setIsLoading(false)
    }, 300)
  }, [])

  useEffect(() => {
    // GSAP Animations for Hero Background Blobs
    if (blob1Ref.current && blob2Ref.current) {
      gsap.to(blob1Ref.current, {
        x: 100,
        y: 50,
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(blob2Ref.current, {
        x: -100,
        y: -50,
        scale: 0.8,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
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

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'backOut'
      }
    }
  }

  const slideVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Framer Motion */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background Blobs with GSAP */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            ref={blob1Ref}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />
          <div 
            ref={blob2Ref}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full"
              variants={scaleVariants}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">New Arrivals Just Dropped</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold leading-tight"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover Premium
              </motion.div>
              <motion.div 
                className="text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Products You'll Love
              </motion.div>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-slate-400 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Shop the latest trends in electronics, fashion, and lifestyle. Quality guaranteed.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={containerVariants}
            >
              <motion.div variants={scaleVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/products" className="btn-primary flex items-center space-x-2">
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div variants={scaleVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/products" className="btn-secondary">
                  Explore Categories
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section with Framer Motion */}
      <FeaturesSection features={features} />

      {/* Categories Section with Framer Motion */}
      <CategoriesSection categories={categories} />

      {/* Featured Products Section */}
      <ProductsSection 
        featuredProducts={featuredProducts} 
        isLoading={isLoading} 
      />

      {/* CTA Section with Framer Motion */}
      <CTASection />
    </div>
  )
}

// Features Section Component
const FeaturesSection = ({ features }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon
            return (
              <motion.div
                key={index}
                className="glass-card p-6 text-center cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.9 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      ease: 'backOut'
                    }
                  }
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FeatureIcon className="w-10 h-10 mx-auto mb-4 text-blue-400" />
                </motion.div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// Categories Section Component
const CategoriesSection = ({ categories }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop by Category</h2>
          <p className="text-slate-400 text-lg">Find exactly what you're looking for</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
                  visible: { 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    transition: {
                      duration: 0.6,
                      ease: 'backOut'
                    }
                  }
                }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`/products?category=${category.name}`}
                  className="glass-card p-6 md:p-8 text-center group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 relative overflow-hidden cursor-pointer block"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <motion.div 
                      className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.gradient} p-3 md:p-4 shadow-lg`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 12,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <IconComponent className="w-full h-full text-white" strokeWidth={2.5} />
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors mb-2">
                      {category.name}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm font-medium group-hover:text-slate-300 transition-colors">
                      {category.count} Products
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// Products Section Component
const ProductsSection = ({ featuredProducts, isLoading }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Featured Products</h2>
            <p className="text-slate-400 text-lg">Handpicked items just for you</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/products" className="btn-secondary hidden sm:flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {featuredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.9 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        duration: 0.5
                      }
                    }
                  }}
                  whileHover={{ y: -10 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="text-center mt-12 sm:hidden"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
                <span>View All Products</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}

// CTA Section Component
const CTASection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="glass-card p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
          <div className="relative z-10 space-y-6">
            <motion.h2 
              className="text-4xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Get 20% Off Your First Order
            </motion.h2>
            <motion.p 
              className="text-slate-400 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Subscribe to our newsletter and receive exclusive deals
            </motion.p>
            <motion.form 
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" 
              onSubmit={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.input
                type="email"
                placeholder="Enter your email"
                className="input-field flex-1"
                required
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button 
                type="submit" 
                className="btn-primary whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe Now
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Home
