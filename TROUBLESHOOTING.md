# EcoShop Troubleshooting Guide

## 🚀 Quick Start

If you're experiencing issues, try these steps first:

```bash
cd e-commerce
npm install
npx expo start --clear
```

## 🔧 Common Issues & Solutions

### 1. Navigation Error: "NAVIGATE action not handled"

**Problem**: Error like `The action 'NAVIGATE' with payload {"name":"Cart"} was not handled by any navigator`

**Solution**: 
- The navigation structure has been fixed to use nested navigation properly
- Cart navigation now uses: `navigation.navigate('UserTabs', { screen: 'Cart' })`
- Make sure you're using the latest version of the files

### 2. Login Buttons Not Working

**Problem**: Demo login buttons don't respond or have inconsistent styling

**Solution**: 
- Updated login screen with improved design and proper button handling
- Both "Login as User" and "Login as Admin" buttons now work correctly
- New card-based design with better visual feedback

### 3. Design Inconsistencies

**Problem**: UI elements don't match the green theme or look inconsistent

**Solution**: 
- Redesigned login/signup screens with consistent green theme
- Fixed spacing issues (replaced `space-x` and `space-y` with proper gap styling)
- Added proper color consistency throughout the app

### 4. Metro/Expo Build Issues

**Problem**: App won't start or build fails

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npx expo start --clear

# If still having issues, try:
npx expo install --fix
```

### 5. TypeScript Errors

**Problem**: Type errors in components or navigation

**Solution**:
- All components now have proper TypeScript interfaces
- Navigation types are properly defined
- Run `npx tsc --noEmit` to check for type errors

### 6. Redux State Issues

**Problem**: Cart, wishlist, or auth state not working

**Solution**:
- Redux store is properly configured with all slices
- State persistence works across app sessions
- Check Redux DevTools if available

## 📱 Testing the App

### Demo Accounts
1. **User Account**: Tap "Login as Customer" - Full shopping experience
2. **Admin Account**: Tap "Login as Admin" - Product & order management

### Key Features to Test
- ✅ Login/Signup flow
- ✅ Product browsing (grid/list view)
- ✅ Search and filtering
- ✅ Add to cart/wishlist
- ✅ Checkout process
- ✅ Admin product management
- ✅ Admin order management

## 🛠️ Development Setup

### Required Dependencies
```json
{
  "@react-navigation/native": "^7.0.15",
  "@react-navigation/stack": "^7.1.1",
  "@react-navigation/bottom-tabs": "^7.1.0",
  "@reduxjs/toolkit": "^2.4.0",
  "react-redux": "^9.1.2",
  "nativewind": "latest"
}
```

### File Structure Check
Ensure these key files exist:
- `src/navigation/AppNavigator.tsx`
- `src/store/store.ts`
- `src/components/Button.tsx`
- `src/screens/Auth/LoginScreen.tsx`
- All screen components in proper folders

## 🎨 Design System

### Color Palette
- Primary: `#2ECC71` (Emerald Green)
- Secondary: `#27AE60` (Leafy Green)
- Accent: `#1ABC9C` (Aqua Green)
- Background: `#F4F9F4` (Mist White)
- Text: `#2C3E50` (Charcoal)

### Component Usage
```tsx
// Buttons
<Button title="Click Me" onPress={handlePress} />
<Button title="Secondary" variant="secondary" onPress={handlePress} />
<Button title="Outline" variant="outline" onPress={handlePress} />

// Inputs
<Input 
  label="Email" 
  placeholder="Enter email"
  leftIcon="mail-outline"
  value={email}
  onChangeText={setEmail}
/>
```

## 🔍 Debugging Tips

### 1. Check Console Logs
- Open developer console in Expo
- Look for navigation, Redux, or component errors
- Check network requests for API calls

### 2. Redux DevTools
- Install Redux DevTools extension
- Monitor state changes in real-time
- Check action dispatching

### 3. Navigation Debugging
```tsx
// Add this to see navigation state
import { useNavigationState } from '@react-navigation/native';

const navigationState = useNavigationState(state => state);
console.log('Navigation State:', navigationState);
```

### 4. Component Debugging
```tsx
// Add error boundaries around problematic components
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

## 📞 Getting Help

### Before Asking for Help
1. ✅ Check this troubleshooting guide
2. ✅ Clear cache and reinstall dependencies
3. ✅ Test with demo accounts
4. ✅ Check console for error messages
5. ✅ Verify file structure is correct

### Common Error Messages & Solutions

**"Cannot resolve module"**
```bash
npm install
npx expo install --fix
```

**"Element type is invalid"**
- Check import statements
- Verify component exports
- Check file paths

**"Actions must be plain objects"**
- Check Redux action creators
- Verify middleware setup
- Check async action handling

**"Cannot read property of undefined"**
- Add null checks in components
- Verify Redux state structure
- Check prop passing

## 🚀 Performance Tips

1. **Optimize Images**: Use appropriate image sizes
2. **Lazy Loading**: Implement for large lists
3. **Memoization**: Use React.memo for expensive components
4. **Bundle Size**: Check with `npx expo bundle-size`

## 📋 Checklist for Working App

- [ ] App starts without errors
- [ ] Login screen displays correctly
- [ ] Demo buttons work
- [ ] Navigation between screens works
- [ ] Products display in grid/list view
- [ ] Cart functionality works
- [ ] Admin panel accessible
- [ ] Redux state updates properly
- [ ] No console errors

---

**Need more help?** Check the main README.md or create an issue with detailed error information.