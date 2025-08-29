import React from 'react';
import { View, Text } from 'react-native';
import { Button } from './Button';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 justify-center items-center px-6 bg-green-50">
          <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
            Oops! Something went wrong
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <Button
            title="Reload App"
            onPress={() => this.setState({ hasError: false, error: undefined })}
          />
        </View>
      );
    }

    return this.props.children;
  }
}