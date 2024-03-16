
import React from 'react';
import {  View, TouchableOpacity, Linking } from 'react-native';
import {  Modal, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Heading, Text, Button, ButtonText, Divider, ModalContent, CloseIcon, Icon, ModalBackdrop, FlatList, HStack, Box, AddIcon, ButtonIcon } from '@gluestack-ui/themed';



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

  return (
    // <Modal
    //   transparent
    //   animationType="slide"
    //   visible={isVisible}
    //   onRequestClose={() => onClose()}
    // >
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <View style={{ backgroundColor: 'white', padding: 20 }}>
    //       <Text>Load Details:</Text>
    //       <Text>Load Number: {selectedItem.loadNumber}</Text>
    //       <Text>Pickup Location: {selectedItem.pickupLocation.split(',')[0]}</Text>
    //       {/* Add more details as needed */}
    //       <TouchableOpacity onPress={() => onClose()}>
    //         <Text>Close</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </Modal>

    <Modal isOpen={isVisible} onClose={onClose} animationType="slide" size="lg">
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
            <Text>
              Elevate user interactions with our versatile modals. Seamlessly
              integrate notifications, forms, and media displays. Make an impact
              effortlessly.
              LoadNumber ={selectedItem.loadNumber}
              
            </Text>
            
            {/* <FlatList
          data={selectedItem}
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
              <Text
                    color="$coolGray800"
                    fontWeight="$bold"
                    $dark-color="$warmGray100"
                  >
                  
                  </Text>
                
                <Text
                  fontSize="$xs"
                  color="$coolGray800"
                  alignSelf="flex-start"
                  $dark-color="$warmGray100"
                >
               
                </Text>
              </HStack>
            </Box>
          )}
          keyExtractor={item => item._id || item.id}
        /> */}
        
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
                  onClick={() => onClose()}>
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
  );
};

export default LoadDetailsPopup;
