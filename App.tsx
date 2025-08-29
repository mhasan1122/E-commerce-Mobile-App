import './global.css';
import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { ErrorBoundary } from './src/components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <StatusBar style="light" backgroundColor="#2ECC71" />
        <AppNavigator />
      </Provider>
    </ErrorBoundary>
  );
}


