// src/navigation/TabNavigator.js or src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
// import LoadsScreen from '../screens/LoadsScreen';
// import ExpensesScreen from '../screens/ExpensesScreen';
import LoadDetails from '../LoadDetails/LoadDetails';
import Expenses from '../Expenses/Expenses';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={StackNavigator} /> */}
      {/* <Tab.Screen name="Loads" component={LoadsScreen} />
      <Tab.Screen name="Expenses" component={ExpensesScreen} /> */}
      <Tab.Screen name="Load Detail" component={LoadDetails} />
        <Tab.Screen name="Expenses" component={Expenses} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
