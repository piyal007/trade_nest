## TradeNest — B2B Wholesale Marketplace (Client)

### Overview

TradeNest is a global B2B wholesale marketplace connecting bulk suppliers (manufacturers, distributors) with retailers, resellers, and institutional buyers. This repository contains the React + Vite frontend for the TradeNest platform.

### Links

- **Live**: [`https://assignment-11-ec3c7.web.app/`](https://assignment-11-ec3c7.web.app/)
- **Backend API**: [`https://a11-server-ebon.vercel.app`](https://a11-server-ebon.vercel.app)

### Features

- **Authentication**: Email/password, Google login, JWT, protected routes
- **Products**: Category listings, add/update/delete, search & filters, card/table views, availability filter (min order quantity > 100)
- **Shopping**: Detailed product pages, ratings, cart, bulk ordering, minimum order enforcement
- **UI/UX**: Responsive layout, dynamic titles, loading spinners, toasts, 404 page, animations, carousels/sliders

### Tech Stack

- **Core**: React (Vite), React Router DOM, Firebase Auth
- **Styling**: Tailwind CSS, DaisyUI, React Icons
- **Data & State**: Axios (with interceptors), React Context API
- **UX**: Framer Motion, SwiperJS, React Hot Toast, SweetAlert2, React Simple Star Rating, React Spinners

### Project Structure

```
├── public/                 # Public assets
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   │   ├── Banner/
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── contexts/           # Context providers
│   │   ├── AuthContext.jsx
│   │   └── LoadingContext.jsx
│   ├── Firebase/           # Firebase configuration
│   ├── layouts/            # Layout components
│   ├── pages/              # Page components (AddProduct, AllProducts, Cart, Home, ...)
│   └── routes/             # Application routes
└── ...                     # Configuration files
```

### Getting Started

#### Prerequisites

- Node.js
- npm or yarn
- Firebase account

#### Setup

1) Install dependencies

```bash
npm install
```

2) Create a `.env` file in the project root

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=https://a11-server-ebon.vercel.app
```

3) Run the app

```bash
npm run dev
```

### Available Scripts

- **dev**: Start Vite dev server
- **build**: Production build
- **preview**: Preview production build
- **lint**: Run ESLint

### Deployment (Firebase Hosting)

This app is configured for Firebase Hosting.

1) Install Firebase CLI and log in

```bash
npm install -g firebase-tools
firebase login
```

2) Build and deploy

```bash
npm run build
firebase deploy
```

Relevant files: `firebase.json` (hosting config) and `public/_redirects` (SPA routing rewrites).
