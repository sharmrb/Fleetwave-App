import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {Spinner, Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem, Divider, GluestackUIProvider, InputField ,FlatList, Heading, Box, HStack, VStack,Text, Modal, ModalFooter, ModalBackdrop, Icon, ModalContent, ModalHeader, ModalCloseButton, CloseIcon, ModalBody, InputIcon, SearchIcon, InputSlot, ChevronDownIcon, SafeAreaView} from '@gluestack-ui/themed';

import {
  Button,
  ButtonText,
  ButtonIcon,
  ButtonSpinner,
  ButtonGroup,
} from "@gluestack-ui/themed"
import { Input,Card  } from '@gluestack-ui/themed';
import { VITE_API_URL } from '@env'
import { config } from '@gluestack-ui/config';
import LoadDetailsPopup from './ListModal';



const LoadDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [topLoads, setTopLoads] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedStatus, setSelectedStatus] = useState('All');
  
  const handleSelectValueChange = (value) => {
    setSelectedStatus(value);
    //const filteredItems = items.filter(item => item.status === selectedStatus); 
    console.log(selectedStatus);
  };
  const handleSearchSelectChange = (selectedValue: any) => {
    setSearchTerm(String(selectedValue));
  };


  const handleItemPress = (item) => {
    setSelectedItem(item);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };
  
  useEffect(() => {
    const fetchTopLoads = async () => {
      setIsLoading(true);
      const apiUrl = `${VITE_API_URL}/loadDetails`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Sort loads by a relevant field (e.g., pickup date)
     

      // Take the top 3 loads
      setTopLoads(data.slice(0, 70));
      setIsLoading(false);
    };

    fetchTopLoads();
  }, []);
console.log(topLoads)
const filteredLoads = topLoads.filter(item => {
  if (selectedStatus === 'All') {
      return true; // Show all loads if 'All' is selected
  } else {
      return item.status === selectedStatus;
  }
});

  const renderItem = ({ item }: { item: any }) => {
    return (
      
      <View style={{ flexDirection: 'column', marginBottom: 10 }}>
       
        <Text >Pickup: {item.pickupLocation.split(',')[0]}</Text>
        <Text>Delivery: {item.deliveryLocation.split(',')[0]}</Text>
      </View>
      
    );
  };
  return (
    <GluestackUIProvider config={config}>
    <View >
      
    
      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        // onChangeText={handleSearchSelectChange}
      >
<InputSlot pl="$3">
    <InputIcon as={SearchIcon} /> 
  </InputSlot>
  <InputField placeholder="Search Loads" />
</Input>

   
      <Divider my="$0.5" />
      <Heading size="xl" p="$4" pb="$3" alignSelf='center'>
    Assigned Loads
    </Heading>
    <Select onValueChange={handleSelectValueChange}>
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select status" />
          <SelectIcon >
            <ChevronDownIcon />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
          <SelectItem label="All" value="All" />
            <SelectItem label="Todo" value="To-Do" bgColor='$rose500'/>
            <SelectItem label="In-progress" value="In Progress" bgColor='$yellow300' />
            <SelectItem label="Completed" value="Completed" bgColor='$lime300' />
            <SelectItem label="Older" value="older"  />
          </SelectContent>
        </SelectPortal>
      </Select>
      
        
      {isLoading ? (
            <Spinner size="large" color="$indigo600" /> // Show spinner when loading
          ) : (
     
      <FlatList
      bgColor='$trueGray200'
      style={{marginBottom: 150, padding: 10}}
        data={filteredLoads}
        renderItem={( { item }: { item: any } ) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <Box
              borderBottomWidth="$1"
              borderColor="$trueGray800"
              $dark-borderColor="$trueGray100"
              $base-pl={0}
              $base-pr={0}
              $sm-pl="$4"
              $sm-pr="$5"
              py="$2"
            >
        <HStack space="md" justifyContent="space-between">
         
          <VStack>
            <Text
              color="$coolGray800"
              fontWeight="$bold"
              $dark-color="$warmGray100"
            >
             Load Number: {item.loadNumber}
            </Text>
            <Text color="$coolGray600" $dark-color="$warmGray200">
             Pickup Location- {item.pickupLocation.split(',')[0].split(',')[0].substring(0, 20)}
            </Text>
          </VStack>
          <Text
            fontSize="$xs"
            color="$coolGray800"
            alignSelf="flex-start"
            $dark-color="$warmGray100"
          >
            {item.deliveryTime.split('T')[0]}
          </Text>
        </HStack>
      </Box>
      </TouchableOpacity>
    )}
    keyExtractor={item => item._id || item.id}
  />
  )}
  
      
      
   
 {popupVisible && (
        <LoadDetailsPopup
          isVisible={popupVisible}
          onClose={closePopup}
          selectedItem={selectedItem}
        />
      )}



  </View>
  </GluestackUIProvider>
  );
};

export default LoadDetails;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//   head: {  height: 40,  backgroundColor: '#f1f8ff'  },
//   wrapper: { flexDirection: 'row' },
//   title: { flex: 1, backgroundColor: '#f6f8fa' },
//   row: {  height: 28  },
//   text: { textAlign: 'center' },
//   border: { borderWidth: 1, borderColor: '#f1f8ff' }
// });