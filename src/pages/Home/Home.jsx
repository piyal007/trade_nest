import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Import custom styles
import './Home.css';

const Home = () => {

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

  return (
    <div className='w-full' style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="banner-section mb-8 md:mb-16 lg:mb-20 w-full relative">
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
          style={{ height: `calc(100vh - var(--nav-height))` }}
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
                  <div className="text-center text-white px-6 sm:px-8 md:px-10 w-full max-w-5xl mx-auto py-8 sm:py-10 md:py-12 transform transition-all duration-700 hover:scale-[1.01]">
                    <div className="animate-fadeIn backdrop-blur-sm backdrop-brightness-75 bg-black/30 p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl">
                      <span className="inline-block text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-blue-300 mb-2 sm:mb-3 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-[fadeIn_0.8s_ease_0.2s_both]">B2B Wholesale</span>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 md:mb-6 text-white bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300 drop-shadow-[0_3px_5px_rgba(0,0,0,0.9)] animate-[fadeIn_0.8s_ease_0.4s_both] animate-float">{slide.title}</h1>
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-300 mb-4 sm:mb-5 md:mb-7 drop-shadow-[0_3px_5px_rgba(0,0,0,0.9)] tracking-wide animate-[fadeIn_0.8s_ease_0.6s_both]">{slide.subtitle}</h2>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-3xl mx-auto leading-relaxed animate-[fadeIn_0.8s_ease_0.8s_both]">{slide.description}</p>
                      <div className="flex justify-center gap-4 animate-[fadeIn_0.8s_ease_1s_both]">
                        <button className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 px-8 sm:py-3 sm:px-10 md:py-4 md:px-12 uppercase tracking-wider text-sm sm:text-base md:text-lg rounded-lg shadow-lg hover:shadow-blue-500/50 transform transition-all duration-300 hover:scale-105 hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border-2 border-blue-400/30 animate-float">
                          Shop Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Scroll indicator */}
      
    </div>
  );
};

export default Home;