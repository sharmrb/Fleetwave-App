import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem, Divider, GluestackUIProvider, InputField ,FlatList, Heading, Box, HStack, VStack,Text, Modal, ModalFooter, ModalBackdrop, Icon, ModalContent, ModalHeader, ModalCloseButton, CloseIcon, ModalBody, InputIcon, SearchIcon, InputSlot, ChevronDownIcon, Button, ButtonText,Spinner, ButtonIcon, AddIcon, Card, Menu, MenuItem, Input, MenuItemLabel, FormControl, CalendarDaysIcon, InfoIcon} from '@gluestack-ui/themed';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { VITE_API_URL, VITE_API_URL_aidf} from '@env'
import { config } from '@gluestack-ui/config';
import { useAuth } from '@clerk/clerk-expo';

interface Fuel {
  _id: string;
  cost: string;
  truckObject: string;
  date: string;
  comments: string;
}

interface Repair {
  _id: string;
  repair: string;
  truckObject: string;
  trailerObject: string;
  repairDate: string;
  repairCost: string;
  repairComments: string;
}

const SignOut = () => {
  const { isLoaded,signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }

};
const Expenses = () => {
  const [trucks, setTrucks] = useState<Object[]>([]);
const [Expenses, setExpenses] = useState<Expense[]>([]);
const [fuelModalVisible, setFuelModalVisible] = useState(false);


const [repairModalVisible, setRepairModalVisible] = useState(false);

const [isLoading, setIsLoading] = useState(false);
const [fuelData, setFuelData] = useState<Fuel>({
  _id: '',
  cost: '',
  truckObject: '',
  date: '',
  comments: '',
});
const [repairData, setRepairData] = useState<Repair>({
  _id: '',
  repair: '',
  repairCost: '',
  truckObject: '',
  trailerObject: '',
  repairDate: '',
  repairComments: '',
});
const handleFuelSubmit = async () => {
 // Parse the user-entered date string (assuming it's in MM/DD/YYYY format)
 const userEnteredDateParts = fuelData.date.split('/');
 const month = parseInt(userEnteredDateParts[0]);
 const day = parseInt(userEnteredDateParts[1]);
 const year = parseInt(userEnteredDateParts[2]);
 const userEnteredDate = new Date(year, month - 1, day);

 // Check if the parsed date is valid
 if (isNaN(userEnteredDate.getTime())) {
   console.error('Invalid date format:', fuelData.date);
   return;
 }

 // Format the date into the desired format (YYYY-MM-DD)
 const formattedDate = `${userEnteredDate.getFullYear()}-${String(userEnteredDate.getMonth() + 1).padStart(2, '0')}-${String(userEnteredDate.getDate()).padStart(2, '0')}T13:00:00.000Z`;
  // Format the date into the desired format (YYYY-MM-DD)
  try {
    const response = await fetch(`${VITE_API_URL}/fuel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...fuelData, date: formattedDate }), 
    });

    if (!response.ok) {
      throw new Error('Failed to add fuel expense');
    }
fetchExpenses();
    setFuelData({  _id: '',
    cost: '',
    truckObject: '',
    date: '',
    comments: '' });
    setFuelModalVisible(false);
  } catch (error) {
    console.error('Error adding fuel expense:', error);
  }
};

const handleRepairSubmit = async () => {
   // Parse the user-entered date string (assuming it's in MM/DD/YYYY format)
 const userEnteredDateParts1 = repairData.repairDate.split('/');
 const month1 = parseInt(userEnteredDateParts1[0]);
 const day1 = parseInt(userEnteredDateParts1[1]);
 const year1 = parseInt(userEnteredDateParts1[2]);
 const userEnteredDate1 = new Date(year1, month1 - 1, day1);

 // Check if the parsed date is valid
 if (isNaN(userEnteredDate1.getTime())) {
   console.error('Invalid date format:', repairData.repairDate);
   return;
 }

 // Format the date into the desired format (YYYY-MM-DD)
 const formattedDate1 = `${userEnteredDate1.getFullYear()}-${String(userEnteredDate1.getMonth() + 1).padStart(2, '0')}-${String(userEnteredDate1.getDate()).padStart(2, '0')}T13:00:00.000Z`;
console.log(formattedDate1);
  try {
    const response = await fetch(`${VITE_API_URL}/repairs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...repairData, repairDate: formattedDate1 }), 
    });

    if (!response.ok) {
      throw new Error('Failed to add repair expense');
    }

    setRepairData({   _id: '',
    repair: '',
    repairCost: '',
    truckObject: '',
    trailerObject: '',
    repairDate: '',
    repairComments: '',});
    setRepairModalVisible(false);
  } catch (error) {
    console.error('Error adding repair expense:', error);
  }
};
  const fetchTrucks = async () => {
    console.log('fetching trucks');
    try {
      const truckListResponse = await fetch(`${VITE_API_URL}/truckDetails`);
      const truckListData = await truckListResponse.json();

      if (truckListData) {
        setTrucks(truckListData);
        
      }
    } catch (error) {}
   
  };

  const handleOpenFuelModal = () => {
    setFuelModalVisible(true);
  };

const handleOpenRepairModal = () => {
  
  setRepairModalVisible(true);
};


const fetchExpenses = async () => {
  setIsLoading(true);
  const apiUrl = `${VITE_API_URL}/fuel`;
  const response = await fetch(apiUrl);
  const data1 = await response.json();
  console.log(data1);
  const formattedFuelData = data1.map(item => ({
    ...item,
    Type: 'Fuel',
    DatenoTime: new Date(item.date).toISOString().split('T')[0]
  }));
  console.log(formattedFuelData);

  const apiUrl2 = `${VITE_API_URL}/repairs`;
  const response2 = await fetch(apiUrl2);
  const data2 = await response2.json();
  console.log(data2);
  const formattedRepairData = data2.map(item => ({
    ...item,
    Type: 'Repair',
    DatenoTime: new Date(item.repairDate).toISOString().split('T')[0]
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
  setIsLoading(false);
  setExpenses(allExpenses);
};
  useEffect(() => {
  
   
 
    fetchExpenses();
    fetchTrucks();
  }, []);

  const allexpenses= Expenses;
  return (
    <GluestackUIProvider config={config}>
    <View>
    {/* <Button  onPress={SignOut}><ButtonText>SignOut</ButtonText></Button> */}

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
  placement="bottom"
  defaultIsOpen={false}
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
          
        </MenuItem>
        <MenuItem textValue="Add Repair" onPress={() => handleOpenRepairModal()}>
        <MenuItemLabel>Add Repair</MenuItemLabel>
        
        </MenuItem>
      </Menu>



      <Divider my="$0.5" />

    <Card size="md" m="$3">
  
  {isLoading ? (
            <Spinner size="large" color="$indigo600" /> // Show spinner when loading
          ) : (
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
)}
    </Card>
    
    <Modal isOpen={fuelModalVisible} onClose={() => setFuelModalVisible(false)} size="lg">
    
    <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
          <Heading color="$text900" lineHeight="$md">
          Add Fuel Expense
        </Heading>
            <TouchableOpacity onPress={() => setRepairModalVisible(false)}>
              <CloseIcon />
            </TouchableOpacity>
          </ModalHeader>
          <ModalBody>
            <KeyboardAvoidingView behavior="padding">
            <FormControl
      p="$4"
      
    >
      <VStack space="xl">
        
        <VStack space="xs">
          
          <Input>
          <InputSlot pl="$3">
    <InputIcon as={InfoIcon} />
  </InputSlot>
            <InputField type="text" placeholder='Fuel Cost'
            value={fuelData.cost}
            onChangeText={(text) => setFuelData({ ...fuelData, cost: text })}/>
          </Input>
        </VStack>
       
        <VStack space="xs">
          
                <Select
                 value={fuelData.truckObject} // Set the value of the selected truck
                 onValueChange={(value) => setFuelData({ ...fuelData, truckObject: value })} >
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Select Truck" />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
            {trucks.map(truck => {
        
          return (
            <SelectItem
          key={truck._id}
          label={truck.truckNumber}
          value={truck.truckNumber} // Use truck._id as value
           // Update fuelData with truck._id
        />
          );
        })}
            </SelectContent>
          </SelectPortal>
        </Select>
        </VStack>
        <VStack space="xs">
          
          <Input>
          <InputSlot pl="$3">
    <InputIcon as={CalendarDaysIcon} />
  </InputSlot>
            <InputField type="text" placeholder='Date (MM/DD/YYYY) Format'
            onChangeText={(text) => setFuelData({ ...fuelData, date: text })}/>
          </Input>
        </VStack>
        <Button
          onPress={handleFuelSubmit}
        >
          <ButtonText color="$white">Save</ButtonText>
        </Button>
      </VStack>
    </FormControl>
            </KeyboardAvoidingView>
          </ModalBody>
        </ModalContent>
        
      </Modal>
      

      <Modal isOpen={repairModalVisible} onClose={() => setRepairModalVisible(false)}>
      <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
          <Heading color="$text900" lineHeight="$md">
          Add Repair Expense
        </Heading>
            <TouchableOpacity onPress={() => setRepairModalVisible(false)}>
              <CloseIcon />
            </TouchableOpacity>
          </ModalHeader>
          <ModalBody>
            <KeyboardAvoidingView behavior="padding">
            <FormControl
      p="$4"
      
    >
      <VStack space="xl">
        
        <VStack space="xs">
          
          <Input>
          <InputSlot pl="$3">
    <InputIcon as={InfoIcon} />
  </InputSlot>
            <InputField type="text" placeholder='Repair Name' value={repairData.repair}
            onChangeText={(text) => setRepairData({ ...repairData, repair: text })}/>
          </Input>
        </VStack>
        <VStack space="xs">
          
          <Input>
            <InputField type="text" placeholder='Repair cost' value={repairData.repairCost} 
            onChangeText={(text)=>setRepairData({...repairData,repairCost:text})}/>
          </Input>
        </VStack>
        <VStack space="xs">
          
        <Select
                 value={repairData.truckObject} // Set the value of the selected truck
                 onValueChange={(value) => setRepairData({ ...repairData, truckObject: value })} >
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Select Truck" />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
            {trucks.map(truck => {
        
          return (
            <SelectItem
          key={truck._id}
          label={truck.truckNumber}
          value={truck.truckNumber} // Use truck._id as value
           // Update fuelData with truck._id
        />
          );
        })}
            </SelectContent>
          </SelectPortal>
        </Select>
  </VStack>
        <VStack space="xs">
          
          <Input>
          <InputSlot pl="$3">
    <InputIcon as={CalendarDaysIcon} />
  </InputSlot>
  <InputField type="text" placeholder='Date (MM/DD/YYYY) Format'
            onChangeText={(text) => setRepairData({ ...repairData, repairDate: text })}/>
          </Input>
        </VStack>
        <Button
          onPress={handleRepairSubmit}
        >
          <ButtonText color="$white">Save</ButtonText>
        </Button>
      </VStack>
    </FormControl>
            </KeyboardAvoidingView>
          </ModalBody>
        </ModalContent>
      </Modal>
    </View>
    </GluestackUIProvider>
  );
};

export default Expenses;






//------------------
{/* <Modal isOpen={repairModalVisible} onClose={() => setRepairModalVisible(false)}>
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
</Modal> */}

























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