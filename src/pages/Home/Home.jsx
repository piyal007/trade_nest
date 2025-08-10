import React from 'react';
import Banner from '../../components/Banner/Banner';
import FeaturedCategories from '../../components/FeaturedCategories/FeaturedCategories';
import SpecialOffers from '../../components/SpecialOffers/SpecialOffers';
import Testimonials from '../../components/Testimonials/Testimonials';
import CallToAction from '../../components/CallToAction/CallToAction';
import useDocumentTitle from '../../hooks/useDocumentTitle';

// Import custom styles
import './Home.css';

const Home = () => {
  // Set document title for Home page
  useDocumentTitle('Home');
  
  return (
    <div className='w-full home-page' style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Banner Section */}
      <Banner />
      
      {/* Featured Categories Section (hide decorative circles on homepage) */}
      <FeaturedCategories showDecorations={false} />
      
      {/* Special Offers Section */}
      <SpecialOffers />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Call to Action Section */}
      <CallToAction />
      
    </div>
  );
};

export default Home;