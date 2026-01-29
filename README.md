# LuxeStore - Modern E-Commerce Frontend

A premium, modern e-commerce frontend built with React, Tailwind CSS, and Framer Motion. This project showcases advanced UI/UX design with smooth animations, glassmorphism effects, and a complete shopping experience.

## ✨ Features

### Pages & Functionality
- **Home Page**: Hero banner, featured categories, featured products with smooth animations
- **Product Listing**: Grid layout with advanced filtering (category, price, rating) and sorting
- **Product Details**: Image gallery, size/color selection, quantity control, add to cart/wishlist
- **Shopping Cart**: Full cart management with quantity controls and order summary
- **Wishlist**: Save favorite products for later

### UI/UX Highlights
- 🎨 **Dark Theme** with soft gradients and glassmorphism effects
- ✨ **Smooth Animations** using Framer Motion principles
- 🎯 **Micro-interactions** on hover, focus, and click
- 📱 **Fully Responsive** design for all screen sizes
- 🔍 **Search Functionality** with real-time filtering
- 💫 **Skeleton Loading** states for better UX
- 🎭 **Premium Typography** with Inter font family

### Technical Features
- ⚛️ React with React Router for navigation
- 🎨 Tailwind CSS for styling
- 🔄 Context API for state management (Cart & Wishlist)
- 💾 LocalStorage persistence for cart and wishlist
- 🖼️ Lazy loading images with loading states
- ♿ Accessible color contrast and semantic HTML

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Sticky navigation with search
│   ├── Footer.jsx      # Footer with links and newsletter
│   ├── ProductCard.jsx # Product card with animations
│   └── SkeletonCard.jsx # Loading skeleton
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Products.jsx    # Product listing with filters
│   ├── ProductDetail.jsx # Single product view
│   ├── Cart.jsx        # Shopping cart
│   └── Wishlist.jsx    # Saved products
├── context/            # React Context for state
│   ├── CartContext.jsx # Cart state management
│   └── WishlistContext.jsx # Wishlist state
├── data/               # Mock data
│   └── products.json   # Product catalog
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles & utilities
```

## 🎨 Design System

### Colors
- **Primary**: Blue (500-600) to Purple (500-600) gradients
- **Background**: Dark slate (900-950) with gradients
- **Text**: White and slate shades for hierarchy
- **Accents**: Blue, purple, pink for CTAs and highlights

### Components
- **Glass Cards**: `backdrop-blur-xl` with subtle borders
- **Buttons**: Gradient backgrounds with hover effects
- **Inputs**: Glass effect with focus states
- **Animations**: Fade-in, slide-up, scale-in effects

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion** - Animation library (via CSS animations)
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

## 📦 Key Dependencies

```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "tailwindcss": "^3.3.6",
  "lucide-react": "^0.294.0",
  "vite": "^5.0.8"
}
```

## 🎯 Features Showcase

### State Management
- Cart and wishlist use React Context API
- LocalStorage persistence across sessions
- Real-time updates across components

### Filtering & Sorting
- Filter by category, price range, and rating
- Sort by price, rating, and popularity
- Search functionality across products

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible mobile menu
- Adaptive grid layouts

### Performance
- Image lazy loading
- Skeleton loading states
- Optimized re-renders with proper state management
- CSS-based animations for better performance

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js` to modify the color palette:

```js
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ }
    }
  }
}
```

### Adding Products
Edit `src/data/products.json` to add or modify products.

### Styling
Global styles and utilities are in `src/index.css`.

## 📝 License

This project is open source and available for portfolio and learning purposes.

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

## 📧 Contact

Built with ❤️ as a modern e-commerce frontend showcase.

---

**Note**: This is a frontend-only project. No backend or authentication is implemented. All data is stored in localStorage and mock JSON files.
