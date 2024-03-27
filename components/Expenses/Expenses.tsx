import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem, Divider, GluestackUIProvider, InputField ,FlatList, Heading, Box, HStack, VStack,Text, Modal, ModalFooter, ModalBackdrop, Icon, ModalContent, ModalHeader, ModalCloseButton, CloseIcon, ModalBody, InputIcon, SearchIcon, InputSlot, ChevronDownIcon, Button, ButtonText, ButtonIcon, AddIcon} from '@gluestack-ui/themed';
// import DateTimePicker from '@react-native-community/datetimepicker';



const Expenses = () => {
  return (
    <View>
      <Text>Expenses Component</Text>
            <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
      >
        <ButtonText>Add Expense </ButtonText>
        <ButtonIcon as={AddIcon} />
      </Button>
    </View>
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