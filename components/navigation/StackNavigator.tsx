// src/navigation/StackNavigator.js or src/navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import HeaderComponent from '../HeaderComponent';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        header: ({ navigation, route, options }) => (
          <HeaderComponent navigation={navigation} route={route} options={options} />
        ),
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
