'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SIZES = [
  { id: 'small', name: '6 inch (Serves 4-6)', price: 25 },
  { id: 'medium', name: '8 inch (Serves 8-10)', price: 35 },
  { id: 'large', name: '10 inch (Serves 12-15)', price: 45 },
];

const FLAVORS = [
  { id: 'classic', name: 'Classic New York', description: 'Traditional creamy cheesecake' },
  { id: 'strawberry', name: 'Strawberry Swirl', description: 'Fresh strawberries with cream cheese' },
  { id: 'chocolate', name: 'Triple Chocolate', description: 'Rich chocolate lovers dream' },
  { id: 'blueberry', name: 'Blueberry Delight', description: 'Sweet blueberry compote topping' },
  { id: 'caramel', name: 'Salted Caramel', description: 'Caramel drizzle with sea salt' },
  { id: 'oreo', name: 'Cookies & Cream', description: 'Loaded with Oreo cookies' },
];

export default function CheesecakeOrder() {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const router = useRouter();

  const handleOrderNow = () => {
    if (!selectedSize || !selectedFlavor) {
      alert('Please select both a size and flavor');
      return;
    }

    const selectedSizeData = SIZES.find(s => s.id === selectedSize);

    // Navigate to checkout with order details
    router.push(
      `/checkout?size=${selectedSize}&flavor=${selectedFlavor}&price=${selectedSizeData?.price}`
    );
  };

  const selectedSizeData = SIZES.find(s => s.id === selectedSize);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">
        Build Your Perfect Cheesecake
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Size Selection */}
        <div>
          <label className="block text-xl font-semibold text-gray-800 mb-4">
            1. Choose Your Size
          </label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full p-4 border-2 border-amber-300 rounded-lg text-lg focus:outline-none focus:border-amber-500 bg-white"
          >
            <option value="">Select a size...</option>
            {SIZES.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name} - ${size.price}
              </option>
            ))}
          </select>
        </div>

        {/* Flavor Selection */}
        <div>
          <label className="block text-xl font-semibold text-gray-800 mb-4">
            2. Pick Your Flavor
          </label>
          <select
            value={selectedFlavor}
            onChange={(e) => setSelectedFlavor(e.target.value)}
            className="w-full p-4 border-2 border-amber-300 rounded-lg text-lg focus:outline-none focus:border-amber-500 bg-white"
          >
            <option value="">Select a flavor...</option>
            {FLAVORS.map((flavor) => (
              <option key={flavor.id} value={flavor.id}>
                {flavor.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selection Summary */}
      {(selectedSize || selectedFlavor) && (
        <div className="mt-8 p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
          <h3 className="text-xl font-bold text-amber-900 mb-4">Your Selection:</h3>
          <div className="space-y-2">
            {selectedSizeData && (
              <p className="text-gray-700">
                <span className="font-semibold">Size:</span> {selectedSizeData.name}
              </p>
            )}
            {selectedFlavor && (
              <p className="text-gray-700">
                <span className="font-semibold">Flavor:</span> {FLAVORS.find(f => f.id === selectedFlavor)?.name}
                <span className="text-sm text-gray-600 block ml-16">
                  {FLAVORS.find(f => f.id === selectedFlavor)?.description}
                </span>
              </p>
            )}
            {selectedSizeData && (
              <p className="text-2xl font-bold text-amber-800 mt-4">
                Total: ${selectedSizeData.price}.00
              </p>
            )}
          </div>
        </div>
      )}

      {/* Order Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleOrderNow}
          disabled={!selectedSize || !selectedFlavor}
          className={`px-12 py-4 text-xl font-bold rounded-lg transition-all transform hover:scale-105 ${
            selectedSize && selectedFlavor
              ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
