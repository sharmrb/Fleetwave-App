// src/components/HeaderComponent.js or src/components/HeaderComponent.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type HeaderComponentProps = {
  navigation: any; // You can replace 'any' with the specific type if you have it
  route: RouteProp<Record<string, object | undefined>, string>;
  options: any; // You can replace 'any' with the specific type if you have it
};
const HeaderComponent: React.FC<HeaderComponentProps> = ({ navigation, route, options }) => {
  return (
    <View>
      {/* Customize your header as needed */}
      <Text>My App Header</Text>
    </View>
  );
};

export default HeaderComponent;
