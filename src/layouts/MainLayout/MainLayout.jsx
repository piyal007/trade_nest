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
      }
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);

    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  return (
    <>
      <div ref={navbarRef}>
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
