import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes';
import AuthProvider from './src/contexts/auth';
import React from 'react';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}