# TradeNest - B2B Wholesale Marketplace (Client)

## Project Overview

TradeNest is a global B2B wholesale marketplace connecting bulk suppliers (manufacturers, distributors) with retailers, resellers, and institutional buyers. This repository contains the frontend React application that powers the TradeNest platform.

### Backend Connection

This client application connects to a Node.js/Express backend server deployed at [https://a11-server-ebon.vercel.app](https://a11-server-ebon.vercel.app). The server repository can be found in the `a11-server` directory.

## Live URL

[TradeNest B2B Marketplace](https://assignment-11-ec3c7.web.app/)

## Key Features

### User Authentication
- Email/password-based authentication
- Google social login integration
- JWT token implementation for secure API access
- Protected routes for authenticated users

### Product Management
- Multi-category product listings
- Add, update, and delete products
- Product filtering and search functionality
- Toggle between card and table view for products
- Filter products by availability (minimum selling quantity > 100)

### Shopping Experience
- Detailed product pages with descriptions, pricing, and ratings
- Shopping cart functionality
- Bulk order capabilities
- Minimum order quantity enforcement

### User Interface
- Responsive design for mobile, tablet, and desktop
- Dynamic page titles based on current route
- Loading spinners for better user experience
- Toast notifications for CRUD operations
- 404 page for handling invalid routes
- Animations using Framer Motion
- Interactive carousels and sliders

## Technologies Used

### Core
- React.js with Vite
- React Router DOM for navigation
- Firebase for authentication

### Styling & UI
- Tailwind CSS for utility-first styling
- DaisyUI for component library
- Framer Motion for animations
- SwiperJS for carousels and sliders
- React Icons for icon library

### State Management & API
- React Context API for state management
- Axios for API requests with interceptors

### User Experience
- React Hot Toast for toast notifications
- SweetAlert2 for interactive modals
- React Simple Star Rating for product ratings
- React Spinners for loading indicators

## NPM Packages

### Dependencies
```
@tailwindcss/vite, axios, dotenv, firebase, framer-motion, react, react-dom, 
react-hot-toast, react-icons, react-router, react-router-dom, 
react-simple-star-rating, react-spinners, sweetalert2, swiper, tailwindcss
```

### Dev Dependencies
```
@eslint/js, @types/react, @types/react-dom, @vitejs/plugin-react, daisyui, 
eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, vite
```

## Project Structure

```
├── public/           # Public assets
├── src/              # Source code
│   ├── components/   # Reusable components
│   │   ├── Banner/   # Homepage banner components
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── contexts/     # Context providers
│   │   ├── AuthContext.jsx
│   │   └── LoadingContext.jsx
│   ├── Firebase/     # Firebase configuration
│   ├── layouts/      # Layout components
│   ├── pages/        # Page components
│   │   ├── AddProduct/
│   │   ├── AllProducts/
│   │   ├── Cart/
│   │   ├── Home/
│   │   └── ...
│   └── routes/       # Application routes
└── ...               # Configuration files
```

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
2. Install dependencies
3. Set up environment variables
4. Run the development server

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Firebase
npm run build && firebase deploy
```

### Deployment

This application is configured for deployment on Firebase Hosting:

1. The project includes the following Firebase configuration files:
   - `.firebaserc` - Project configuration
   - `firebase.json` - Hosting configuration
   - `public/_redirects` - URL rewrite rules for SPA routing

2. To deploy to Firebase:
   - Install Firebase CLI: `npm install -g firebase-tools`
   - Login to Firebase: `firebase login`
   - Build the project: `npm run build`
   - Deploy to Firebase: `firebase deploy`

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=https://a11-server-ebon.vercel.app  # Backend API URL
```