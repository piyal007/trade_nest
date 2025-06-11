import React from 'react';
import Banner from '../../components/Banner/Banner';
import FeaturedCategories from '../../components/FeaturedCategories/FeaturedCategories';
import SpecialOffers from '../../components/SpecialOffers/SpecialOffers';
import Testimonials from '../../components/Testimonials/Testimonials';
import CallToAction from '../../components/CallToAction/CallToAction';

// Import custom styles
import './Home.css';

const Home = () => {
  return (
    <div className='w-full' style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Banner Section */}
      <Banner />
      
      {/* Featured Categories Section */}
      <FeaturedCategories />
      
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