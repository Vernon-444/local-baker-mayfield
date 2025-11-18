import CheesecakeOrder from "@/components/CheesecakeOrder";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-amber-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center">🍰 Baker Mayfield&apos;s Cheesecakes</h1>
          <p className="text-center mt-2 text-amber-100">Handmade with Love & Quality Ingredients</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            Premium Cheesecakes Delivered to Your Door
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Experience the perfect blend of creamy texture and rich flavors. 
            Each cheesecake is made fresh to order with the finest ingredients.
          </p>
        </div>

        {/* Order Section */}
        <CheesecakeOrder />

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">👨‍🍳</div>
            <h3 className="text-xl font-bold text-amber-800 mb-2">Handmade</h3>
            <p className="text-gray-600">Each cheesecake is crafted with care and attention to detail</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-amber-800 mb-2">Premium Quality</h3>
            <p className="text-gray-600">Only the finest ingredients make it into our cheesecakes</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-amber-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Fresh delivery right to your doorstep</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Baker Mayfield&apos;s Cheesecakes. All rights reserved.</p>
          <p className="mt-2 text-amber-200">Made with ❤️ and the finest ingredients</p>
        </div>
      </footer>
    </div>
  );
}
