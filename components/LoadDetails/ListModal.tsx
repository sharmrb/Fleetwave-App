
import React, { useState } from 'react';
import {  View, TouchableOpacity, Linking } from 'react-native';
import {  Modal, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Heading, Text, Button, ButtonText, Divider, ModalContent, CloseIcon, Icon, ModalBackdrop, FlatList, HStack, Box, AddIcon, ButtonIcon, GluestackUIProvider } from '@gluestack-ui/themed';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { config } from '@gluestack-ui/config';

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

  const [scannedImage, setScannedImage] = useState(null);
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

const uploadDocument = async () => {
  try {
      // Send scannedImage to backend for upload
      // Make sure to handle file upload in your backend
      // You can use fetch or axios to make the HTTP request
      console.log('Uploading document:', scannedImage);
      // Example fetch request
      // const response = await fetch('backend-upload-url', {
      //     method: 'POST',
      //     body: scannedImage,
      //     headers: {
      //         'Content-Type': 'image/jpeg', // Adjust content type as per your requirement
      //     },
      // });
      // const data = await response.json();
      // Handle response from backend if necessary
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
          <Button  size="md"
                   variant="outline"
                   action="positive"
                  onClick={() => uploadDocument()}>
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
