// import { StatusBar } from 'expo-status-bar';
// //import { StyleSheet, Text, View } from 'react-native';
// import { GluestackUIProvider, Text } from "@gluestack-ui/themed"
// import { config } from "@gluestack-ui/config" // Optional if you want to use default theme


// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoadDetails from "./components/LoadDetails/LoadDetails";
// import Expenses from "./components/Expenses/Expenses";
// import TabNavigator from './components/navigation/TabNavigator';
// const Stack = createNativeStackNavigator();
// import { ClerkProvider } from "@clerk/clerk-expo";
// import { SafeAreaView, StyleSheet } from "react-native";
// import { VITE_CLERK_PUBLISHABLE_KEY } from '@env';
// import Constants from "expo-constants"

// const App: React.FC = () => {
//   return (
//   <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
//     <SafeAreaView style={styles.container}>
//       <Text>Hello world!</Text>
   
//     <GluestackUIProvider config={config}>
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Tabs" component={TabNavigator} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     </GluestackUIProvider>
//     </SafeAreaView>
//   </ClerkProvider>
//   );
// };

// export default App;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY } from '@env';
import Constants from "expo-constants";





// Import your components here
import TabNavigator from './components/navigation/TabNavigator';
import SignInScreen from "./components/SignInScreen";

const Stack = createNativeStackNavigator();

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