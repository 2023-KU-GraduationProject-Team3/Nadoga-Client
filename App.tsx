import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React, { useState } from 'react';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { Navigation } from './navigation';
import { Auth } from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [isLogin, setIsLogin] = useState(true);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {isLogin ? <Navigation colorScheme={colorScheme} /> : <Auth colorScheme={colorScheme} />}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
