import Swal from 'sweetalert2';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { createRoot } from 'react-dom/client';
import StripePaymentForm from '../components/StripePaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const showPurchaseModal = (product, quantity, user) => {
    return Swal.fire({
        title: `<div class="flex items-center gap-3 justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span class="text-gray-900">Complete Your Purchase</span>
    </div>`,
        html: `
      <div class="text-left px-2">
        <!-- Product Summary Card - Full Width -->
        <div class="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 mb-6 shadow-2xl">
          <div class="flex items-center gap-4 mb-4">
            <img src="${product.image}" alt="${product.name}" class="w-20 h-20 object-cover rounded-xl border-4 border-white/30 shadow-lg" />
            <div class="flex-1">
              <h3 class="text-white text-lg font-bold mb-2 leading-tight">${product.name}</h3>
              <div class="flex gap-2 flex-wrap">
                <span class="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">${product.category}</span>
                <span class="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">${product.brandName}</span>
              </div>
            </div>
          </div>
          <div class="bg-white/15 backdrop-blur-md rounded-xl p-4">
            <div class="flex justify-between mb-2.5 text-white/90 text-sm">
              <span>Price per unit:</span>
              <span class="font-semibold">$${product.price}</span>
            </div>
            <div class="flex justify-between mb-2.5 text-white/90 text-sm">
              <span>Quantity:</span>
              <span class="font-semibold">${quantity} units</span>
            </div>
            <div class="border-t-2 border-white/30 pt-3 mt-3 flex justify-between text-white text-lg font-bold">
              <span>Total Amount:</span>
              <span>$${(product.price * quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <!-- Two Column Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <!-- Left Column: Customer Information & Shipping -->
          <div class="space-y-4">
            <!-- Customer Information -->
            <div class="bg-gray-50 rounded-xl p-5">
              <h4 class="text-gray-700 text-sm font-bold mb-4 uppercase tracking-wide flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Customer Information
              </h4>
              <div class="grid gap-3">
                <div>
                  <label class="block text-sm font-semibold text-gray-600 mb-1.5">Full Name</label>
                  <input id="name" value="${user.displayName || ''}" readonly class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-white text-gray-500 cursor-not-allowed" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-600 mb-1.5">Email Address</label>
                  <input id="email" value="${user.email || ''}" readonly class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-white text-gray-500 cursor-not-allowed" />
                </div>
              </div>
            </div>

            <!-- Shipping Details -->
            <div class="bg-gray-50 rounded-xl p-5">
              <h4 class="text-gray-700 text-sm font-bold mb-4 uppercase tracking-wide flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Shipping Details
              </h4>
              <div class="grid gap-3">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1.5">Shipping Address <span class="text-red-500">*</span></label>
                  <textarea id="address" rows="3" placeholder="Enter your complete shipping address" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm resize-vertical transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number <span class="text-red-500">*</span></label>
                  <input id="phone" type="tel" placeholder="+1 (555) 000-0000" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none" />
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Stripe Payment Form -->
          <div class="bg-gray-50 rounded-xl p-5">
            <h4 class="text-gray-700 text-sm font-bold mb-4 uppercase tracking-wide flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payment Information
            </h4>
            <div id="stripe-payment-container"></div>
          </div>
        </div>

        <!-- Security Note - Full Width -->
        <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div>
            <p class="text-sm text-emerald-800 font-semibold mb-1">Secure Transaction</p>
            <p class="text-xs text-emerald-700 leading-relaxed">Your information is encrypted and secure. We never share your personal details.</p>
          </div>
        </div>
      </div>
    `,
        width: '80rem',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#6b7280',
        customClass: {
            popup: 'rounded-3xl',
            cancelButton: 'px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-base border-2 border-gray-200 hover:bg-gray-200 transition-all duration-300'
        },
        buttonsStyling: false,
        didOpen: () => {
            const container = document.getElementById('stripe-payment-container');
            if (container) {
                const root = createRoot(container);

                const handlePaymentSuccess = (paymentMethod) => {
                    const address = document.getElementById('address').value.trim();
                    const phone = document.getElementById('phone').value.trim();

                    if (!address || address.length < 10) {
                        Swal.showValidationMessage('⚠️ Please enter a complete shipping address');
                        return;
                    }

                    if (!phone || phone.length < 10) {
                        Swal.showValidationMessage('⚠️ Please enter a valid phone number');
                        return;
                    }

                    Swal.close();
                    Swal.fire({
                        title: '<div class="text-center"><h2 class="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2></div>',
                        html: `
              <div class="text-center py-4">
                <div class="mb-6">
                  <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
                  <div class="mb-4">
                    <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Payment Method</p>
                    <p class="text-xl font-bold text-gray-800">${paymentMethod.card.brand.toUpperCase()} •••• ${paymentMethod.card.last4}</p>
                  </div>
                <p class="mb-2"><strong>Amount:</strong> $${(product.price * quantity).toFixed(2)}</p>
                <p class="text-base text-gray-600 leading-relaxed">Your order has been placed successfully!</p>
                <p class="text-sm text-gray-500 mt-2">You will receive a confirmation email shortly.</p>
              </div>
            `,
                        icon: false,
                        showConfirmButton: true,
                        confirmButtonText: '<span class="px-4">OK, Got it!</span>',
                        confirmButtonColor: '#2563eb',
                        customClass: {
                            popup: 'rounded-3xl',
                            confirmButton: 'px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold text-base shadow-lg hover:bg-blue-700 transition-all duration-300'
                        },
                        buttonsStyling: false
                    }).then(() => {
                        // Trigger the actual purchase with payment info
                        window.dispatchEvent(new CustomEvent('stripe-payment-success', {
                            detail: { paymentMethod, address, phone }
                        }));
                    });
                };

                const handlePaymentError = (error) => {
                    Swal.showValidationMessage(`⚠️ Payment Error: ${error}`);
                };

                root.render(
                    <Elements stripe={stripePromise}>
                        <StripePaymentForm
                            amount={product.price * quantity}
                            onPaymentSuccess={handlePaymentSuccess}
                            onPaymentError={handlePaymentError}
                        />
                    </Elements>
                );
            }
        },
        willClose: () => {
            const container = document.getElementById('stripe-payment-container');
            if (container) {
                const root = createRoot(container);
                root.unmount();
            }
        }
    });
};
