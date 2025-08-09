import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Import custom styles
import './Banner.css';

const Banner = () => {
  const bannerSlides = [
    {
      id: 1,
      image: "https://i.postimg.cc/bwjRrW1Q/slider1.jpg",
      title: "Electronics Mega Sale",
      subtitle: "Up to 50% Off on Bulk Orders",
      description: "Premium gadgets and electronics for your business needs",
    },
    {
      id: 2,
      image: "https://i.postimg.cc/ry0GJMJ1/slider2.jpg",
      title: "Fashion Wholesale Deal",
      subtitle: "Buy More, Save More - 40% Off",
      description: "Latest trending apparel and accessories for your store",
    },
    {
      id: 3,
      image: "https://i.postimg.cc/SRNwBjxx/slider3.jpg",
      title: "Home Appliance Special",
      subtitle: "Exclusive B2B Prices - 30% Off",
      description: "Quality home appliances at wholesale rates",
    },
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    },
  };

  // Text animation variants
  const titleCharsVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    })
  };

  // Entrance animation for the entire banner content
  const bannerContentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren"
      }
    }
  };

  // Button animation
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 5px 15px -5px rgba(59, 130, 246, 0.3)",
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <div className="banner-section w-full relative">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect={'fade'}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper overflow-hidden shadow-[0_5px_30px_rgba(0,0,0,0.3)] w-full" 
        style={{ height: `calc(90vh - var(--nav-height))` }}
      >
        {bannerSlides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div 
              className="relative h-full w-full bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.div 
                  className="text-center text-white px-6 sm:px-8 md:px-10 w-full max-w-5xl mx-auto py-8 sm:py-10 md:py-12"
                  variants={bannerContentVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.7 }}
                >
                  <motion.div 
                    className="backdrop-blur-sm backdrop-brightness-75 bg-black/30 p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.span 
                      className="inline-block text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-blue-300 mb-2 sm:mb-3 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      variants={itemVariants}
                    >
                      TradeNest
                    </motion.span>
                    
                    <div className="overflow-hidden">
                      <motion.h1 
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 md:mb-6 text-white drop-shadow-[0_3px_5px_rgba(0,0,0,0.9)]"
                      >
                        {slide.title.split('').map((char, index) => (
                          <motion.span
                            key={index}
                            custom={index}
                            variants={titleCharsVariant}
                            initial="hidden"
                            animate="visible"
                            style={{ display: 'inline-block' }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </motion.span>
                        ))}
                      </motion.h1>
                    </div>
                    
                    <motion.h2 
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-amber-300 mb-4 sm:mb-5 md:mb-7 drop-shadow-[0_3px_5px_rgba(0,0,0,0.9)] tracking-wide"
                      variants={itemVariants}
                    >
                      {slide.subtitle}
                    </motion.h2>
                    <motion.p 
                      className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-3xl mx-auto leading-relaxed"
                      variants={itemVariants}
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div 
                      className="flex justify-center gap-4"
                      variants={itemVariants}
                    >
                      <motion.button 
                        className="cursor-pointer bg-[var(--color-primary)] text-white font-bold py-3 px-8 sm:py-3 sm:px-10 md:py-4 md:px-12 uppercase tracking-wider text-sm sm:text-base md:text-lg rounded-lg shadow-lg border-2 border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        Shop Now
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;