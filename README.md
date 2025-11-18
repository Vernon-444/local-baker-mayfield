# Baker Mayfield's Cheesecakes 🍰

A modern, fully-featured Next.js e-commerce website for selling handmade cheesecakes with integrated payment processing through Stripe and PayPal.

![Baker Mayfield's Cheesecakes](https://github.com/user-attachments/assets/2c54e858-b62b-476f-b0ec-efefbb9a8b42)

## Features

- 🎨 **Beautiful UI** - Built with Next.js 16 and Tailwind CSS 4
- 📦 **Size Selection** - Multiple cheesecake sizes (6", 8", 10")
- 🎂 **Flavor Options** - 6 delicious flavors to choose from
- 🚚 **Delivery System** - Complete delivery information collection
- 💳 **Payment Integration** - Stripe and PayPal payment options
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Optimized with Next.js App Router

## Available Cheesecakes

### Sizes
- **Small (6 inch)** - Serves 4-6 people - $25
- **Medium (8 inch)** - Serves 8-10 people - $35
- **Large (10 inch)** - Serves 12-15 people - $45

### Flavors
- Classic New York
- Strawberry Swirl
- Triple Chocolate
- Blueberry Delight
- Salted Caramel
- Cookies & Cream

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Vernon-444/local-baker-mayfield.git
cd local-baker-mayfield
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional for demo):
```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` - Your PayPal client ID

### Running the Application

#### Development Mode
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Project Structure

```
local-baker-mayfield/
├── app/
│   ├── checkout/              # Checkout page
│   │   ├── page.tsx          # Checkout wrapper
│   │   └── CheckoutContent.tsx # Checkout logic
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/
│   └── CheesecakeOrder.tsx   # Order form component
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── package.json              # Dependencies
└── README.md                 # This file
```

## Payment Integration

### Stripe
The application is ready to integrate with Stripe. To enable:
1. Get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Add them to `.env.local`
3. Implement Stripe Elements for secure card collection
4. Create payment intents on your backend

### PayPal
PayPal integration uses the PayPal JavaScript SDK. To enable:
1. Get your Client ID from [PayPal Developer](https://developer.paypal.com/)
2. Add it to `.env.local`
3. The PayPal buttons will automatically become functional

## Screenshots

### Homepage
![Homepage](https://github.com/user-attachments/assets/2c54e858-b62b-476f-b0ec-efefbb9a8b42)

### Order Selection
![Order Selection](https://github.com/user-attachments/assets/26eb3415-04a7-4a7c-a6cd-dc0aaf0f8d98)

### Delivery Information
![Delivery Information](https://github.com/user-attachments/assets/47cdfba4-4c99-40e6-9777-fbda0683e0ee)

### Payment - Stripe
![Payment Stripe](https://github.com/user-attachments/assets/e88c323f-ed6e-4648-ab18-bab7bbfa0164)

### Payment - PayPal
![Payment PayPal](https://github.com/user-attachments/assets/c75218ed-89f2-4995-8293-9b8ec0e3b9d5)

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Stripe** - Payment processing
- **PayPal SDK** - PayPal integration

## Security Notes

- Payment information is never stored in the application
- Stripe Elements provides PCI-compliant card collection
- All payment processing happens through secure third-party providers
- Environment variables keep API keys secure

## Future Enhancements

- [ ] Backend API for order processing
- [ ] Database integration for order management
- [ ] Email confirmation system
- [ ] Order tracking
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Customer accounts
- [ ] Order history

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please open an issue on GitHub.
