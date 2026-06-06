# Basudev Agency - Cold Drinks & Snacks E-Commerce Website

## Overview

A fully functional e-commerce website for Basudev Agency, specializing in cold drinks and snacks. This application features an animated home page, user authentication, product browsing, ordering system, and an owner dashboard to manage incoming orders.

## 🎯 Features

### 🏠 Home Page
- **Animated Cold Drink Theme**
  - Falling ice cube animations
  - Gradient background with floating particle effects
  - Smooth fade and slide animations
  - Bounce animation on logo

### 👤 User Authentication
- **Sign Up / Registration**
  - Gmail integration option (demo)
  - Email-based registration
  - Password creation and validation
  - Automatic account creation

- **Login**
  - Email and password verification
  - Session management
  - User role differentiation (Customer vs Owner)

### 🛒 User Dashboard
- Browse all cold drinks and snacks
- Product catalog with:
  - Product name and emoji icon
  - Description
  - Price in Indian Rupees (₹)
  - Quantity selector with +/- buttons
  - "Order Now" button

- **Order Placement**
  - Select quantity for each product
  - Instant order confirmation
  - Real-time order transmission to owner

### 📊 Owner Dashboard
- **Order Management**
  - View all incoming orders
  - Customer email for each order
  - Order timestamp
  - Itemized order details with quantities and prices
  - Total order amount
  - Order status (Pending/Completed)

- **Owner Access**
  - Email: `subhamnandy27@gmail.com`
  - Dedicated owner login interface
  - Real-time order updates

## 🛍️ Products Available

### Cold Drinks
1. **Coca Cola** - ₹40
2. **Sprite** - ₹40
3. **Fanta Orange** - ₹40
4. **Iced Tea** - ₹50
5. **Pepsi** - ₹40
6. **Lemonade** - ₹30

### Snacks
7. **Chips** - ₹20
8. **Snacks Mix** - ₹60

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs entirely in the browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nandysubham95-sudo/basudev-agency.git
```

2. Navigate to the project directory:
```bash
cd basudev-agency
```

3. Open `index.html` in your web browser:
```bash
open index.html
# or
start index.html
```

## 📖 How to Use

### For Customers

1. **Landing Page**
   - Click "User Login" button
   - Watch the cold drink animation

2. **Sign Up (First Time)**
   - Enter your email address
   - Create a password (minimum 4 characters)
   - Account created successfully

3. **Login**
   - Enter your registered email
   - Enter your password
   - Access the product catalog

4. **Shopping**
   - Browse all available products
   - Adjust quantity using +/- buttons
   - Click "Order Now" to place order
   - View order confirmation

### For Owner

1. **Owner Login**
   - Click "Owner Login" on landing page
   - Email: `subhamnandy27@gmail.com`
   - Create a password
   - Access owner dashboard

2. **View Orders**
   - All customer orders appear in real-time
   - See customer email, timestamp, items, and total amount
   - Track order status

## 💻 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Storage**: Browser LocalStorage (Mock Database)
- **Styling**: CSS3 with animations and gradients
- **Architecture**: Single Page Application (SPA)

## 📁 File Structure

```
basudev-agency/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── app.js              # JavaScript application logic
└── README.md           # This file
```

## ✨ Features in Detail

### Animation Effects
- **Falling Ice Cubes**: Continuous falling animation on home page
- **Bounce Animation**: Logo bounces on home page
- **Fade & Slide**: Smooth entrance animations for content
- **Hover Effects**: Product cards lift on hover
- **Button Interactions**: Smooth color and shadow transitions

### Color Scheme
- **Primary Gradient**: Purple (#667eea) to Dark Purple (#764ba2)
- **Owner Gradient**: Pink (#f093fb) to Red (#f5576c)
- **Accent Colors**: Teal (#4ecdc4), Red (#ff6b6b)

## 💾 Data Storage

Currently uses in-memory storage with browser localStorage compatibility. Orders and user data persist during the session.

### Future Enhancement: Firebase Integration
```javascript
// Configuration ready for Firebase
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "basudev-agency.firebaseapp.com",
    projectId: "basudev-agency",
    storageBucket: "basudev-agency.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

## 🔮 Future Enhancements

- [ ] Firebase authentication integration
- [ ] Real database backend
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] SMS/Email notifications
- [ ] Order history for customers
- [ ] Admin product management
- [ ] Delivery tracking
- [ ] User reviews and ratings
- [ ] Mobile app version
- [ ] Dark mode theme

## 📱 Responsive Design

- **Desktop**: Full grid layout (4 columns)
- **Tablet**: 2-3 columns responsive grid
- **Mobile**: Single column responsive layout

## 🌐 Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## 🔒 Security Notes

⚠️ **Current Implementation**: This is a demo version with mock authentication. For production use:

1. Implement proper backend authentication
2. Use Firebase or similar service
3. Hash passwords using bcrypt
4. Use HTTPS/SSL
5. Implement CSRF protection
6. Add input validation and sanitization
7. Implement rate limiting

## 🧪 Testing Credentials

### Owner Account
- **Email**: subhamnandy27@gmail.com
- **Password**: (Create during first signup)

### Sample User Account
- **Email**: user@example.com
- **Password**: (Create during signup)

## 📄 License

This project is created for Basudev Agency. All rights reserved.

## 📞 Contact

**Basudev Agency**
- Cold Drinks & Snacks
- Premium Quality Products
- Fast Delivery Service

## 🤝 Support

For issues, feature requests, or suggestions, please contact the development team.

---

**Made with ❄️ for Basudev Agency**