
import React, { useState } from 'react';
import {  View, TouchableOpacity, Linking } from 'react-native';
import {  Modal, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Heading, Text, Button, ButtonText, Divider, ModalContent, CloseIcon, Icon, ModalBackdrop, FlatList, HStack, Box, AddIcon, ButtonIcon, GluestackUIProvider } from '@gluestack-ui/themed';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { config } from '@gluestack-ui/config';
import * as ImagePicker from 'expo-image-picker';
import { VITE_API_URL } from '@env'

interface LoadDetailsPopupProps {
  isVisible: boolean;
  onClose: () => void;
  selectedItem: any; // Adjust the type according to your data structure
}

const LoadDetailsPopup: React.FC<LoadDetailsPopupProps> = ({
  isVisible,
  onClose,
  selectedItem,
}) => {
  if (!isVisible || !selectedItem) {
    return null;
  }
  const dataToShow = [
    ['Load Number', selectedItem.loadNumber],
    ['Truck', selectedItem.truckObject],
    ['Trailer', selectedItem.trailerObject],
    ['Driver', selectedItem.driverObject],
    ['Pickup Time', selectedItem.pickupTime], 
    ['Pickup Location', selectedItem.pickupLocation, true],
    ['Delivery Location', selectedItem.deliveryLocation, true],
    ['Comments', selectedItem.comments],
  ];
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const [ annedImage, setScannedImage] = useState(null);
  const scanDocument = async () => {
    try {
        const { scannedImages, status } = await DocumentScanner.scanDocument();
        if (status === 'success' && scannedImages.length > 0) {
            setScannedImage(scannedImages[0]);
        } else if (status === 'cancel') {
            // Handle cancellation
        } else {
            // Handle other errors
        }
    } catch (error) {
        console.error('Error scanning document:', error);
        // Handle error
    }
};

const updateLoadDocuments = async (loadId, newDocuments) => {
  //console.log(newDocuments)
  try {
    // Fetch existing load details
    const response = await fetch(`${VITE_API_URL}/loadDetails/${loadId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch existing load details');
    }
    const existingLoad = await response.json();

    // Combine existing documents with new documents
    const updatedDocuments = [...(existingLoad.documents || []), ...newDocuments];


    // Make PATCH request to update load details with the combined documents
    const updateResponse = await fetch(`${VITE_API_URL}/loadDetails/${loadId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ documents: updatedDocuments }),
    });

    // Check if request was successful
    if (!updateResponse.ok) {
      
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    // Handle successful response
    const responseData = await updateResponse.json();
    console.log('Load details updated successfully:', responseData);
    // Optionally, you can update your app state or UI to reflect the changes
  } catch (error) {
    // Handle error
    console.error('Error updating load details:', error.message);
    // Optionally, you can show an error message to the user
  }
};

const uploadDocument2 = async () => {

  try {
    // Request permission to access the device's image library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    // If permission is granted, launch the image picker
    if (permissionResult.granted === false) {
      console.log('Permission to access media library is required');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!pickerResult.canceled) {
      // If user selected new documents, call the function to update load details
      console.log(pickerResult.assets[0])
      console.log("Calling updateLoadDocuments ")
      console.log("passing"+selectedItem.loadNumber)
      updateLoadDocuments( selectedItem._id, [pickerResult.assets[0]]);
    }
    // Check if the user canceled the image picker
    if (pickerResult.cancelled === true) {
      console.log('Image picker canceled');
      return;
    }


    // Get the selected image URI
    const selectedImageUri = pickerResult.assets[0].uri;

    // Now you can handle the selected image, such as uploading it to your backend
    console.log('Selected image URI:', selectedImageUri);

  } catch (error) {
    console.error('Error uploading document:', error);
    // Handle error
  }
};


  return (
<GluestackUIProvider config={config}>

    <Modal isOpen={isVisible} onClose={onClose}  size="lg">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Load Detail</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
            {/* <Text>Hello, I'm a modal!</Text> */}
            <Divider my="$0.5" />
            <ModalBody>
          
            
        
         <FlatList
          data={dataToShow}
          renderItem={({ item }: { item: [string, any] }) => {
            const [key, value] = item;
            const isLocation = false; 
            return (
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
              {key}
            </Text>
            {isLocation ? (
              <TouchableOpacity onPress={() => Linking.openURL(`https://maps.google.com/maps?q=${encodeURIComponent(value)}`)}>
        
                <Text
                  fontSize="$xs"
                  color="$coolGray800"
                  alignSelf="flex-start"
                  $dark-color="$warmGray100"
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                fontSize="$sm"
                color="$coolGray800"
                alignSelf="flex-start"
                $dark-color="$warmGray100"
              >
                {value}
              </Text>
            )}
                </HStack>
              </Box>
              );
              }}
              keyExtractor={(item, index) => `${item[0]}-${index}`}
          />
          

                  <Button
                    size="md"
                    variant="outline"
                    action="positive"
                    onPress={uploadDocument2}
                    
                  >
                    <ButtonText>Add Document</ButtonText>
                    <ButtonIcon as={AddIcon} />
                  </Button>
          </ModalBody>
            <ModalFooter>
            {/* <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setPopupVisible(false)
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button> */}
            </ModalFooter>
            </ModalContent>
            
        </Modal>
        </GluestackUIProvider>
  );
};

export default LoadDetailsPopup;
