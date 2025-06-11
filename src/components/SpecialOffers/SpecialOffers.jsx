import React from 'react';

const SpecialOffers = () => {
  const offers = [
    { title: 'Bulk Purchase Discount', discount: '25% OFF', code: 'BULK25' },
    { title: 'New Customer Special', discount: '15% OFF', code: 'NEWB2B' },
    { title: 'Seasonal Clearance', discount: '40% OFF', code: 'SEASON40' }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-50 to-indigo-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Special Offers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Limited time deals exclusively for our B2B customers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Offer Cards */}
          {offers.map((offer, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-blue-600 text-white py-3 px-4 text-center">
                <span className="font-bold">{offer.discount}</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-800">{offer.title}</h3>
                <p className="text-gray-600 mb-4">Use code <span className="font-mono font-semibold bg-gray-100 px-2 py-1 rounded">{offer.code}</span> at checkout</p>
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 font-medium">Claim Offer</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;