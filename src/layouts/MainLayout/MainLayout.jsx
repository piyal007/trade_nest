import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const MainLayout = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    const updateNavHeight = () => {
      if (navbarRef.current) {
        const navHeight = navbarRef.current.offsetHeight;
        document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
        console.log('Navbar height:', navHeight); // For debugging
      }
    };

    // Initial calculation
    updateNavHeight();
    
    // Recalculate on resize
    window.addEventListener('resize', updateNavHeight);
    
    // Recalculate after a short delay to ensure all elements are fully loaded
    const timeoutId = setTimeout(updateNavHeight, 100);

    return () => {
      window.removeEventListener('resize', updateNavHeight);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass the ref directly to Navbar component */}
      <Navbar ref={navbarRef} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
