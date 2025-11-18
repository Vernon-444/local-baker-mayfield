'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const SIZES: Record<string, string> = {
  small: '6 inch (Serves 4-6)',
  medium: '8 inch (Serves 8-10)',
  large: '10 inch (Serves 12-15)',
};

const FLAVORS: Record<string, string> = {
  classic: 'Classic New York',
  strawberry: 'Strawberry Swirl',
  chocolate: 'Triple Chocolate',
  blueberry: 'Blueberry Delight',
  caramel: 'Salted Caramel',
  oreo: 'Cookies & Cream',
};

export default function CheckoutContent() {
  const searchParams = useSearchParams();
  
  const size = searchParams.get('size') || '';
  const flavor = searchParams.get('flavor') || '';
  const price = searchParams.get('price') || '0';

  const [activeTab, setActiveTab] = useState<'delivery' | 'payment'>('delivery');
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [orderComplete, setOrderComplete] = useState(false);

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('payment');
  };

  const handleStripePayment = async () => {
    // In a real application, you would:
    // 1. Create a payment intent on your backend
    // 2. Use Stripe Elements to collect card details securely
    // 3. Confirm the payment
    
    // For this demo, we'll simulate a successful payment
    alert('Stripe integration ready!\n\nIn production, this would:\n1. Securely collect card details\n2. Process payment through Stripe\n3. Confirm your order');
    setOrderComplete(true);
  };

  const handlePayPalApprove = (data: unknown, actions: unknown) => {
    const actionsTyped = actions as {
      order: {
        capture: () => Promise<{ payer: { name: { given_name: string } } }>;
      };
    };
    return actionsTyped.order.capture().then((details) => {
      alert(`Payment successful! Transaction completed by ${details.payer.name.given_name}`);
      setOrderComplete(true);
    });
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-4xl font-bold text-green-700 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-700 mb-6">
              Thank you for your order! Your delicious {FLAVORS[flavor]} cheesecake is being prepared.
            </p>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700">
                <strong>Order Summary:</strong>
              </p>
              <p className="mt-2">{SIZES[size]} - {FLAVORS[flavor]}</p>
              <p className="text-2xl font-bold text-green-700 mt-2">${price}.00</p>
            </div>
            <p className="text-gray-600 mb-6">
              You will receive a confirmation email at {deliveryInfo.email} with tracking information.
            </p>
            <Link
              href="/"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Order Another Cheesecake
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-12">
      {/* Header */}
      <header className="bg-amber-800 text-white shadow-lg mb-8">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold hover:text-amber-200">
            ← Back to Shop
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">Checkout</h1>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Order Summary</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Size:</span> {SIZES[size]}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Flavor:</span> {FLAVORS[flavor]}
              </p>
              <p className="text-3xl font-bold text-amber-800 mt-4">
                Total: ${price}.00
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('delivery')}
                className={`flex-1 py-4 px-6 font-semibold text-lg transition-colors ${
                  activeTab === 'delivery'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                1. Delivery Information
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                disabled={!deliveryInfo.name}
                className={`flex-1 py-4 px-6 font-semibold text-lg transition-colors ${
                  activeTab === 'payment'
                    ? 'bg-amber-600 text-white'
                    : deliveryInfo.name
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                2. Payment
              </button>
            </div>

            <div className="p-8">
              {/* Delivery Tab */}
              {activeTab === 'delivery' && (
                <form onSubmit={handleDeliverySubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-amber-900 mb-4">
                    Delivery Details
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.name}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={deliveryInfo.email}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={deliveryInfo.phone}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.address}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.city}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.state}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, state: e.target.value })}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.zip}
                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, zip: e.target.value })}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg transition-colors text-lg"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {/* Payment Tab */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-amber-900 mb-4">
                    Payment Method
                  </h3>

                  {/* Payment Method Selection */}
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={() => setPaymentMethod('stripe')}
                      className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-colors ${
                        paymentMethod === 'stripe'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      💳 Credit/Debit Card (Stripe)
                    </button>
                    <button
                      onClick={() => setPaymentMethod('paypal')}
                      className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-colors ${
                        paymentMethod === 'paypal'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      PayPal
                    </button>
                  </div>

                  {/* Stripe Payment */}
                  {paymentMethod === 'stripe' && (
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-4">
                          This is a demo. In production, Stripe Elements would be integrated here for secure card processing.
                        </p>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="4242 4242 4242 4242"
                              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                              disabled
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                disabled
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                CVC
                              </label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleStripePayment}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors text-lg"
                      >
                        Pay ${price}.00 with Stripe
                      </button>
                    </div>
                  )}

                  {/* PayPal Payment */}
                  {paymentMethod === 'paypal' && (
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <p className="text-sm text-gray-600 mb-4">
                        This is a demo. In production, you would need to configure PayPal with your client ID.
                      </p>
                      <PayPalScriptProvider
                        options={{
                          clientId: 'test',
                          currency: 'USD',
                        }}
                      >
                        <PayPalButtons
                          style={{ layout: 'vertical' }}
                          disabled={true}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              intent: 'CAPTURE',
                              purchase_units: [
                                {
                                  amount: {
                                    currency_code: 'USD',
                                    value: price,
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={handlePayPalApprove}
                        />
                      </PayPalScriptProvider>
                      <p className="text-xs text-gray-500 mt-4 text-center">
                        PayPal buttons would be functional with a valid client ID
                      </p>
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      🔒 Your payment information is secure and encrypted. We never store your card details.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
