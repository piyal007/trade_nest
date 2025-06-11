import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

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
    <div className='w-full mx-auto'>
      <div className="banner-section mb-8 md:mb-16 lg:mb-20 max-w-[1920px] mx-auto">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          effect={'fade'}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="mySwiper overflow-hidden shadow-2xl rounded-none sm:rounded-lg md:rounded-xl" 
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
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="text-center text-white px-4 sm:px-6 md:px-8 w-full max-w-4xl mx-auto py-6 sm:py-8 md:py-10 backdrop-blur-sm bg-black/10 rounded-xl border border-white/10 shadow-2xl">
                    <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300 drop-shadow-lg">{slide.title}</h1>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-300 mb-3 sm:mb-4 md:mb-6 drop-shadow-lg tracking-wide">{slide.subtitle}</h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-5 sm:mb-7 md:mb-10 text-gray-100 font-medium drop-shadow-md max-w-2xl mx-auto">{slide.description}</p>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 px-6 sm:py-3 sm:px-8 md:py-4 md:px-10 rounded-full uppercase tracking-wider text-sm sm:text-base md:text-lg">
                      Shop Now
                     </button>
                    </div>
                   </div>
                 </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;