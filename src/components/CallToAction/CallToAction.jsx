import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Wholesale Shopping?</h2>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">Join thousands of businesses that trust us for their wholesale needs</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg text-lg hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-lg">Create Business Account</button>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg text-lg hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;