// src/components/HeaderComponent.js or src/components/HeaderComponent.tsx
// import React from 'react';
// import { View, Text } from 'react-native';
// import { RouteProp } from '@react-navigation/native';

// type HeaderComponentProps = {
//   navigation: any; // You can replace 'any' with the specific type if you have it
//   route: RouteProp<Record<string, object | undefined>, string>;
//   options: any; // You can replace 'any' with the specific type if you have it
// };
// const HeaderComponent: React.FC<HeaderComponentProps> = ({ navigation, route, options }) => {
//   return (
//     <View>
//       {/* Customize your header as needed */}
//       <Text>My App Header</Text>
//     </View>
//   );
// };

// export default HeaderComponent;

// src/components/HeaderComponent.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@clerk/clerk-react';

type HeaderComponentProps = {
  navigation: any; // You can replace 'any' with the specific type if you have it
  route: any; // You can replace 'any' with the specific type if you have it
  options: any; // You can replace 'any' with the specific type if you have it
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({ navigation, route, options }) => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Customize your header as needed */}
      <Text>My App Header</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
