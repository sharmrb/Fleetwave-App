// src/navigation/TabNavigator.js or src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import LoadDetails from '../LoadDetails/LoadDetails';
import Expenses from '../Expenses/Expenses';
import HeaderComponent from '../HeaderComponent'; 
import { ButtonText, Button } from '@gluestack-ui/themed';
import { useAuth } from '@clerk/clerk-expo';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  const { signOut } = useAuth();

const handleLogout = async () => {
  await signOut();
};
  return (
    
    <>
    {/* <HeaderComponent navigation={{}} route={{}} options={{}} /> */}
    <Tab.Navigator >
    
      {/* <Tab.Screen name="Home" component={StackNavigator} /> */}
      {/* <Tab.Screen name="Loads" component={LoadsScreen} /> */}
      <Tab.Screen name="Load Detail" component={LoadDetails} options={{
        tabBarIconStyle: { display: "none" },
        tabBarLabelStyle: {
          fontSize: 12,
        },
          headerTitle: "Load Details",
          headerRight: () => (
           <Button
           style={{ marginRight: 5 }}
           onPress={handleLogout}
           size="sm"
  variant="outline"
  action="negative">
            <ButtonText>Logout</ButtonText>
           </Button>
          ),
        }}/>
      <Tab.Screen name="Expenses" component={Expenses} options={{
        tabBarIconStyle: { display: "none" },
        tabBarLabelStyle: {
          fontSize: 12,
        },
          headerTitle: "Expenses",
          headerRight: () => (
           <Button
           style={{ marginRight: 5 }}
           onPress={handleLogout}
           size="sm"
  variant="outline"
  action="negative">
            <ButtonText>Logout</ButtonText>
           </Button>
          ),
        }} />
    </Tab.Navigator>
    </>
  );
};

export default TabNavigator;
