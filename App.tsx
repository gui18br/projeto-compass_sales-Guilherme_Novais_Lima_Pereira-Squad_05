import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';

import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#F0F0F0' barStyle={'dark-content'} />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}