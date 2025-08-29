# EcoShop - React Native E-Commerce App

A beautiful, modern e-commerce mobile application built with React Native, Expo, and a stunning green theme. Features both user and admin interfaces with complete shopping functionality.

## 🌟 Features

### User Features
- **Beautiful Green Theme UI** - Modern, clean design with green color palette
- **Product Browsing** - Grid and list view options with search and filtering
- **Product Details** - Detailed product pages with image galleries
- **Shopping Cart** - Add, remove, and manage cart items
- **Wishlist** - Save favorite products
- **Checkout Process** - Complete checkout with address and payment
- **User Authentication** - Login/signup functionality
- **Profile Management** - User profile and settings

### Admin Features
- **Admin Dashboard** - Overview of sales, orders, and products
- **Product Management** - Add, edit, and delete products
- **Order Management** - View and update order statuses
- **Inventory Control** - Manage product stock and categories

## 🎨 Design Theme

The app uses a beautiful green-based color palette:
- **Primary Green**: #2ECC71 (Emerald Green)
- **Secondary Green**: #27AE60 (Leafy Green)
- **Accent**: #1ABC9C (Aqua Green)
- **Background**: #F4F9F4 (Mist White)
- **Text**: #2C3E50 (Charcoal)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. **Install dependencies**
   ```bash
   cd e-commerce
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## 📱 Demo Accounts

The app includes demo accounts for testing:

### User Account
- **Email**: user@example.com
- **Password**: Any password
- **Features**: Full shopping experience

### Admin Account
- **Email**: admin@example.com
- **Password**: Any password
- **Features**: Product and order management

## 🏗️ Project Structure

```
e-commerce/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── ProductCard.tsx
│   │   └── Header.tsx
│   ├── screens/            # Screen components
│   │   ├── Auth/           # Authentication screens
│   │   ├── User/           # User-facing screens
│   │   └── Admin/          # Admin screens
│   ├── navigation/         # Navigation configuration
│   ├── store/             # Redux store and slices
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions and theme
│   └── data/              # Mock data
├── assets/                # Images and static assets
└── App.tsx               # Main app component
```

## 🛠️ Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Navigation** - Navigation
- **NativeWind** - Tailwind CSS for React Native
- **Expo Vector Icons** - Icon library

## 📦 Key Dependencies

```json
{
  "@react-navigation/native": "^7.0.15",
  "@react-navigation/stack": "^7.1.1",
  "@react-navigation/bottom-tabs": "^7.1.0",
  "@reduxjs/toolkit": "^2.4.0",
  "react-redux": "^9.1.2",
  "nativewind": "latest",
  "react-native-reanimated": "~3.17.4",
  "react-native-gesture-handler": "~2.22.1"
}
```

## 🎯 Key Features Implementation

### State Management
- Redux Toolkit for global state
- Separate slices for auth, cart, wishlist, and products
- Persistent cart and wishlist data

### Navigation
- Stack navigation for screen transitions
- Bottom tab navigation for main sections
- Conditional navigation based on user role (user/admin)

### UI Components
- Reusable components with consistent styling
- Responsive design for different screen sizes
- Smooth animations and transitions

### Product Management
- Dynamic product listing with search and filters
- Category-based filtering
- Grid and list view modes
- Real-time inventory updates

### Shopping Cart
- Add/remove items with quantity management
- Real-time total calculations
- Persistent cart across app sessions

### Checkout Process
- Address input and validation
- Multiple payment method options
- Order confirmation and tracking

## 🔧 Customization

### Adding New Products
1. Navigate to Admin panel
2. Use "Add Product" tab
3. Fill in product details
4. Products appear immediately in the store

### Modifying Theme Colors
Edit `src/utils/theme.ts` to customize the color palette:

```typescript
export const theme = {
  colors: {
    primary: '#2ECC71',    // Change primary color
    secondary: '#27AE60',  // Change secondary color
    // ... other colors
  }
};
```

### Adding New Screens
1. Create screen component in appropriate folder
2. Add to navigation configuration
3. Update type definitions if needed

## 🚀 Deployment

### Building for Production

1. **Build the app**
   ```bash
   expo build:android
   expo build:ios
   ```

2. **Create standalone app**
   ```bash
   expo build:android --type apk
   ```

### Publishing Updates
```bash
expo publish
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Expo team for the amazing development platform
- React Native community for excellent libraries
- Unsplash for product images
- Tailwind CSS for the utility-first CSS framework

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact: support@ecoshop.com

---

**EcoShop** - Your sustainable shopping destination 🌱