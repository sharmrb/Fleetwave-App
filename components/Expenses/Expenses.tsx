import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem, Divider, GluestackUIProvider, InputField ,FlatList, Heading, Box, HStack, VStack,Text, Modal, ModalFooter, ModalBackdrop, Icon, ModalContent, ModalHeader, ModalCloseButton, CloseIcon, ModalBody, InputIcon, SearchIcon, InputSlot, ChevronDownIcon, Button, ButtonText, ButtonIcon, AddIcon, Card, Menu, MenuItem, Input, MenuItemLabel} from '@gluestack-ui/themed';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { VITE_API_URL, VITE_API_URL_aidf} from '@env'
import { config } from '@gluestack-ui/config';


const Expenses = () => {
const [Expenses, setExpenses] = useState<Expense[]>([]);
const [fuelModalVisible, setFuelModalVisible] = useState(false);
const [fuelCost, setFuelCost] = useState('');
const [fuelDate, setFuelDate] = useState('');

const [repairModalVisible, setRepairModalVisible] = useState(false);
const [repairCost, setRepairCost] = useState('');
const [repairDate, setRepairDate] = useState('');
const [repairDetails, setRepairDetails] = useState('');

  const handleFuelSubmit = async () => {
    // Code to submit fuel expense data
    setFuelCost('');
    setFuelDate('');
    setFuelModalVisible(false);
  };

  const handleRepairSubmit = async () => {
    // Code to submit repair expense data
    setRepairCost('');
    setRepairDate('');
    setRepairDetails('');
    setRepairModalVisible(false);
  };


const handleOpenFuelModal = () => {
  
  setFuelModalVisible(true);
};

const handleOpenRepairModal = () => {
  
  setRepairModalVisible(true);
};



  useEffect(() => {
    const fetchExpenses = async () => {
      const apiUrl = `${VITE_API_URL}/fuel`;
      const response = await fetch(apiUrl);
      const data1 = await response.json();
      console.log(data1);
      const formattedFuelData = data1.map(item => ({
        ...item,
        Type: 'Fuel',
        DatenoTime:new Date(item.date).toISOString().split('T')[0]
      }));
      console.log(formattedFuelData);
      const apiUrl2= `${VITE_API_URL}/repairs`;
      const response2 = await fetch(apiUrl2);
      const data2 = await response2.json();
     console.log(data2);
     const formattedRepairData = data2.map(item => ({
      ...item,
      Type: 'Repair',
      DatenoTime:new Date(item.repairDate).toISOString().split('T')[0]
    }));
    console.log(formattedRepairData);
    
      const allExpenses = [...formattedFuelData, ...formattedRepairData];
     console.log(allExpenses);
      allExpenses.sort((a, b) => {
        // Extract the date values, considering both 'date' and 'repairDate' properties
        const dateA = new Date(a.repairDate || a.date);
        const dateB = new Date(b.repairDate || b.date);
      
        // Sort by date in descending order
        return dateB - dateA;
      });
      console.log(allExpenses);
      setExpenses(allExpenses);
    };
 
    fetchExpenses();
  }, []);

  const allexpenses= Expenses;
  return (
    <GluestackUIProvider config={config}>
    <View>
    


{/* <Menu
        placement="bottom"
        trigger={({ ...triggerProps }) => (
          <TouchableOpacity {...triggerProps}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Button>
                <ButtonText>Add Expense</ButtonText>
              <ButtonIcon as={AddIcon} />
              </Button>
            </View>
          </TouchableOpacity>
        )}
      > */}
      <Menu
  placement="top"
  trigger={({ ...triggerProps }) => {
    return (
      <Button {...triggerProps}>
        <ButtonText>Add Expense</ButtonText>
        <ButtonIcon as={AddIcon} />
      </Button>
    )
  }}
      >
        <MenuItem textValue='Add Fuel' onPress={() => handleOpenFuelModal()}>
         <MenuItemLabel>Add Fuel</MenuItemLabel>
          <Text>Add Fuel</Text>
        </MenuItem>
        <MenuItem textValue="Add Repair" onPress={() => handleOpenRepairModal()}>
        <MenuItemLabel>Add Repair</MenuItemLabel>
        <Text>Add Repair</Text>
        </MenuItem>
      </Menu>



      <Divider my="$0.5" />

    <Card size="md" m="$3">
    {/* <FlatList
        data={Expenses}
        renderItem={( { item }: { item: any } ) => (
          
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
             Expense Type: {item.loadNumber}
            </Text>
            <Text color="$coolGray600" $dark-color="$warmGray200">
             Pickup Location- {item.pickupLocation.split(',')[0].split(',')[0]}
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
     
    )}
    keyExtractor={item => item._id || item.id}
  /> */}
  <FlatList
  data={Expenses}
  renderItem={({ item }) => (
    
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
        <Text
          color="$coolGray800"
          fontWeight="$bold"
          $dark-color="$warmGray100"
        >
          Type: {item.Type}
        </Text>
        <Text color="$coolGray800" fontWeight="$bold">
          Cost: ${item.repairCost || item.cost}
        </Text>
        <Text
          fontSize="$xs"
          color="$coolGray800"
          alignSelf="flex-start"
          $dark-color="$warmGray100"
        >
          Date: {item.DatenoTime}
        </Text>
      </HStack>
    </Box>
  )}
  keyExtractor={item => item._id || item.id}
/>
    </Card>

    <Modal isOpen={fuelModalVisible} onClose={() => setFuelModalVisible(false)}>
      <Card>
        <ModalContent>
          <ModalHeader>
            <Text>Add Fuel Expense</Text>
            <TouchableOpacity onPress={() => setFuelModalVisible(false)}>
              <CloseIcon />
            </TouchableOpacity>
          </ModalHeader>
          <ModalBody>
            <KeyboardAvoidingView behavior="padding">
            <Input>
                <InputField
                  placeholder="Cost"
                  value={fuelCost}
                  onChangeText={(text) => setFuelCost(text)}
                  keyboardType="numeric"
                />
              </Input>
              <Input>
                <InputField
                  placeholder="Date"
                  value={fuelDate}
                  onChangeText={(text) => setFuelDate(text)}
                  // You can use a date picker here for better user experience
                />
            </Input>
              <Button onPress={handleFuelSubmit}>
                <Text>Submit</Text>
              </Button>
            </KeyboardAvoidingView>
          </ModalBody>
        </ModalContent>
        </Card>
      </Modal>

      <Modal isOpen={repairModalVisible} onClose={() => setRepairModalVisible(false)}>
        <ModalContent>
          <ModalHeader>
            <Text>Add Repair Expense</Text>
            <TouchableOpacity onPress={() => setRepairModalVisible(false)}>
              <CloseIcon />
            </TouchableOpacity>
          </ModalHeader>
          <ModalBody>
            <KeyboardAvoidingView behavior="padding">
            <Input>
                <InputField
                  placeholder="Cost"
                  value={fuelCost}
                  onChangeText={(text) => setFuelCost(text)}
                  keyboardType="numeric"
                />
              </Input>
              <Input>
                <InputField
                  placeholder="Date"
                  value={fuelDate}
                  onChangeText={(text) => setFuelDate(text)}
                  // You can use a date picker here for better user experience
                />
            </Input>
            <Input>
              <InputField
                placeholder="Repair Details"
                value={repairDetails}
                onChangeText={(text) => setRepairDetails(text)}
              />
            </Input>
              <Button onPress={handleRepairSubmit}>
                <Text>Submit</Text>
              </Button>
            </KeyboardAvoidingView>
          </ModalBody>
        </ModalContent>
      </Modal>
    </View>
    </GluestackUIProvider>
  );
};

export default Expenses;
































// const ExpenseForm = ({
//   onAddExpense,
//   onEditExpense,
//   onDeleteExpense,
//   editingExpense,
// }) => {
//   const [newExpense, setNewExpense] = useState({
//     _id: "",
//     type: "",
//     cost: "",
//     date: new Date(),
//     truck: "",
//     driver: "",
//     additionalName: "",
//   });
//   const [categoryValue, setCategoryValue] = useState('');
//   const [trucks, setTrucks] = useState([]);
//   const [drivers, setDrivers] = useState([]);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     const fetchTrucksAndDrivers = async () => {
//       // Fetch trucks data
//       // Fetch drivers data
//     };

//     fetchTrucksAndDrivers();
//   }, []);

//   const handleInputChange = (name, value) => {
//     setNewExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (editingExpense) {
//       onEditExpense && onEditExpense(newExpense);
//     } else {
//       onAddExpense(newExpense);
//     }
//   };

//   const handleDelete = () => {
//     onDeleteExpense && onDeleteExpense(editingExpense);
//   };

//   return (
//     <View>
//       <Text>{editingExpense ? `Edit ${editingExpense.type}` : "Add Expense"}</Text>
//       <TextInput
//         placeholder="Type"
//         value={newExpense.type}
//         onChangeText={(text) => handleInputChange("type", text)}
//       />
//       <TouchableOpacity onPress={() => setShowDatePicker(true)}>
//         <Text>Select Category</Text>
//       </TouchableOpacity>
//       {showDatePicker && (
//         <DateTimePicker
//           value={newExpense.date}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowDatePicker(false);
//             if (selectedDate) {
//               handleInputChange("date", selectedDate);
//             }
//           }}
//         />
//       )}
//       <Button title={editingExpense ? "Update" : "Add"} onPress={handleSubmit} />
//       {editingExpense && (
//         <Button title="Delete" onPress={() => setIsDeleteDialogOpen(true)} />
//       )}
//       <Modal visible={isDeleteDialogOpen} animationType="slide">
//         <View>
//           <Text>Confirm Deletion</Text>
//           <Button title="Cancel" onPress={() => setIsDeleteDialogOpen(false)} />
//           <Button title="Delete" onPress={handleDelete} />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default ExpenseForm;





// components/Dashboard.js
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
//import React from 'react';
// import { View, Image, Button } from 'react-native';
// import DocumentScanner from 'react-native-document-scanner-plugin';

// const DocumentScannerTest = () => {
//   const [scannedImage, setScannedImage] = React.useState(null);

//   const scanDocument = async () => {
//     try {
//       const { scannedImages, status } = await DocumentScanner.scanDocument();
//       if (status === 'success' && scannedImages.length > 0) {
//         setScannedImage(scannedImages[0]);
//       } else if (status === 'cancel') {
//         // Handle cancellation
//       } else {
//         // Handle other errors
//       }
//     } catch (error) {
//       console.error('Error scanning document:', error);
//       // Handle error
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {scannedImage ? (
//         <Image style={{ width: 200, height: 200 }} source={{ uri: scannedImage }} />
//       ) : (
//         <Button title="Scan Document" onPress={scanDocument} />
//       )}
//     </View>
//   );
// };

//
//export default DocumentScannerTest;