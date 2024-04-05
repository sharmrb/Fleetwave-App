

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY } from '@env';
import Constants from "expo-constants";





// Import your components here
import TabNavigator from './components/navigation/TabNavigator';
import SignInScreen from "./components/SignInScreen";
import * as SecureStore from "expo-secure-store";
import { Button, View } from "@gluestack-ui/themed";

const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };
  
const Stack = createNativeStackNavigator();

const SignOut = () => {
  const { isLoaded,signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }

};
 
const App: React.FC = () => {
  console.log("the key is "+EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return (
    
    <ClerkProvider publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SafeAreaView style={styles.container}>
      <SignedIn>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
        </SignedIn>
        <SignedOut>
        <SignInScreen />
        </SignedOut>
        {/* <NavigationContainer>
          <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer> */}
      </SafeAreaView>
    </ClerkProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});