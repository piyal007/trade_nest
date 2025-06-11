import React from 'react';

const Testimonials = () => {
  const testimonials = [
    { name: 'Sarah Johnson', company: 'Tech Solutions Inc.', text: 'The wholesale electronics we purchased were of excellent quality and arrived on time. Great service!' },
    { name: 'Michael Chen', company: 'Fashion Forward', text: 'We\'ve been sourcing our inventory here for over a year. Competitive pricing and reliable shipping every time.' },
    { name: 'Emma Rodriguez', company: 'Home Essentials Co.', text: 'The customer service team went above and beyond to help with our bulk order. Will definitely order again.' }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Trusted by businesses worldwide</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial Cards */}
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-700 italic relative before:content-['\201C'] after:content-['\201D'] before:text-blue-200 after:text-blue-200 before:text-2xl after:text-2xl before:font-serif after:font-serif before:absolute before:-left-1 before:-top-1 after:absolute after:-bottom-5 after:-right-1">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;