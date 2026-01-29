import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import productsData from '../data/products.json'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('featured')

  const categories = ['All', 'Electronics', 'Fashion', 'Sports', 'Home']

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProducts(productsData)
      setIsLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    let result = [...products]

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Search filter
    const searchQuery = searchParams.get('search')
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Rating filter
    result = result.filter(p => p.rating >= minRating)

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        break
    }

    setFilteredProducts(result)
  }, [products, selectedCategory, priceRange, minRating, sortBy, searchParams])

  const resetFilters = () => {
    setSelectedCategory('All')
    setPriceRange([0, 500])
    setMinRating(0)
    setSortBy('featured')
    setSearchParams({})
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {searchParams.get('search') 
              ? `Search Results for "${searchParams.get('search')}"`
              : selectedCategory === 'All' 
                ? 'All Products' 
                : selectedCategory}
          </h1>
          <p className="text-slate-400">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-secondary w-full flex items-center justify-center space-x-2 mb-4"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Category Filter */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Category</h3>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="glass-card p-6">
                <h3 className="text-white font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-blue-500"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">${priceRange[0]}</span>
                    <span className="text-white font-semibold">${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="glass-card p-6">
                <h3 className="text-white font-semibold mb-4">Minimum Rating</h3>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0, 0].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                        minRating === rating
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {rating > 0 ? `${rating}+ Stars` : 'All Ratings'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={resetFilters}
                className="btn-secondary w-full flex items-center justify-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-400 text-sm">
                {filteredProducts.length} results
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field py-2 px-4 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <p className="text-slate-400 text-lg">No products found matching your criteria.</p>
                <button onClick={resetFilters} className="btn-primary mt-4">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
