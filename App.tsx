import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
import { GluestackUIProvider, Text } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config" // Optional if you want to use default theme


import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadDetails from "./components/LoadDetails/LoadDetails";
import Expenses from "./components/Expenses/Expenses";
import TabNavigator from './components/navigation/TabNavigator';
const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <GluestackUIProvider config={config}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </GluestackUIProvider>
  );
};

export default App;