import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { VITE_API_URL } from '@env'

const LoadDetails = () => {
  const [topLoads, setTopLoads] = useState([]);

  useEffect(() => {
    const fetchTopLoads = async () => {
      const apiUrl = `${VITE_API_URL}/loadDetails`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Sort loads by a relevant field (e.g., pickup date)
     

      // Take the top 3 loads
      setTopLoads(data.slice(0, 3));
    };

    fetchTopLoads();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <ScrollView>
        <Text>{item.loadNumber}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Pickup: {item.pickupLocation.split(',')[0]}</Text>
          <Text>Delivery: {item.deliveryLocation.split(',')[0]}</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <View>
      <Text>Top 3 Loads</Text>
      <FlatList
        data={topLoads}
        renderItem={renderItem}
        keyExtractor={item => item._id || item.id} // Replace with unique identifier for each load
        horizontal={true} // Display cards horizontally
        showsHorizontalScrollIndicator={false} // Hide scroll indicator
      />
    </View>
  );
};

export default LoadDetails;
