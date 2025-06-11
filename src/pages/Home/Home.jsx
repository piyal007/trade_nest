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
    <div className=''>
      <div className="banner-section mb-20">
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
          className="mySwiper overflow-hidden shadow-2xl" style={{ height: `calc(100vh - var(--nav-height))` }}
        >
          {bannerSlides.map(slide => (
            <SwiperSlide key={slide.id}>
              <div 
                className="relative h-full w-full bg-cover bg-center" 
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-500">
                    <h1 className="text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 drop-shadow-lg">{slide.title}</h1>
                    <h2 className="text-4xl font-bold text-yellow-300 mb-6 drop-shadow-lg tracking-wide">{slide.subtitle}</h2>
                    <p className="text-2xl mb-10 text-gray-100 font-medium drop-shadow-md max-w-2xl mx-auto">{slide.description}</p>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-4 px-10 rounded-full transition duration-300 transform hover:scale-110 hover:shadow-xl hover:from-blue-700 hover:to-blue-900 uppercase tracking-wider text-lg">
                      Shop Now
                     </button>
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