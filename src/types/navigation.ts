import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { Product } from './index';

// Define the param list for stack navigator
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  UserTabs: { screen: string };
  AdminTabs: undefined;
  ProductDetail: { product: Product };
  Search: undefined;
  Checkout: undefined;
  OrderSuccess: {
    orderId: string;
    total: number;
  };
  Analytics: undefined;
};

// Define param lists for tab navigators
export type UserTabParamList = {
  Home: undefined;
  Wishlist: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type AdminTabParamList = {
  Dashboard: undefined;
  Products: undefined;
  Orders: undefined;
  Profile: undefined;
};

// Navigation types for stack screens
type RootStackNavigationProp<T extends keyof RootStackParamList> = StackNavigationProp<
  RootStackParamList,
  T
>;

type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

// Combined navigation types for tab screens
type UserTabScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<UserTabParamList>,
  StackNavigationProp<RootStackParamList>
>;

type AdminTabScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AdminTabParamList>,
  StackNavigationProp<RootStackParamList>
>;

// Props interfaces for all screens
export interface ProductDetailScreenProps {
  navigation: RootStackNavigationProp<'ProductDetail'>;
  route: RootStackRouteProp<'ProductDetail'>;
}

export interface LoginScreenProps {
  navigation: RootStackNavigationProp<'Login'>;
  route: RootStackRouteProp<'Login'>;
}

export interface SignupScreenProps {
  navigation: RootStackNavigationProp<'Signup'>;
  route: RootStackRouteProp<'Signup'>;
}

export interface ForgotPasswordScreenProps {
  navigation: RootStackNavigationProp<'ForgotPassword'>;
  route: RootStackRouteProp<'ForgotPassword'>;
}

export interface ResetPasswordScreenProps {
  navigation: RootStackNavigationProp<'ResetPassword'>;
  route: RootStackRouteProp<'ResetPassword'>;
}

export interface SearchScreenProps {
  navigation: RootStackNavigationProp<'Search'>;
  route: RootStackRouteProp<'Search'>;
}

export interface CheckoutScreenProps {
  navigation: RootStackNavigationProp<'Checkout'>;
  route: RootStackRouteProp<'Checkout'>;
}

export interface OrderSuccessScreenProps {
  navigation: RootStackNavigationProp<'OrderSuccess'>;
  route: RootStackRouteProp<'OrderSuccess'>;
}

export interface AnalyticsScreenProps {
  navigation: RootStackNavigationProp<'Analytics'>;
  route: RootStackRouteProp<'Analytics'>;
}

// Tab screen props
export interface HomeScreenProps {
  navigation: UserTabScreenNavigationProp;
  route: RouteProp<UserTabParamList, 'Home'>;
}

export interface WishlistScreenProps {
  navigation: UserTabScreenNavigationProp;
  route: RouteProp<UserTabParamList, 'Wishlist'>;
}

export interface CartScreenProps {
  navigation: UserTabScreenNavigationProp;
  route: RouteProp<UserTabParamList, 'Cart'>;
}

export interface ProfileScreenProps {
  navigation: UserTabScreenNavigationProp;
  route: RouteProp<UserTabParamList, 'Profile'>;
}

export interface AdminDashboardScreenProps {
  navigation: AdminTabScreenNavigationProp;
  route: RouteProp<AdminTabParamList, 'Dashboard'>;
}

export interface AddProductScreenProps {
  navigation: AdminTabScreenNavigationProp;
  route: RouteProp<AdminTabParamList, 'Products'>;
}

export interface OrderManagementScreenProps {
  navigation: AdminTabScreenNavigationProp;
  route: RouteProp<AdminTabParamList, 'Orders'>;
}
