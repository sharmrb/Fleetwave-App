import React, { useState } from "react";
import {  TextInput, TouchableOpacity, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Text, Button, ButtonText, FormControl, Heading, Input, InputField, InputSlot, VStack, EyeIcon, EyeOffIcon, InputIcon, GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

 
export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
 
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState(false)

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
}
  const onSignInPress = async () => {
    console.log("Signing in...");
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <GluestackUIProvider config={config}>   
    
    <View>
    <FormControl
    p="$4"
    borderWidth="$1"
    borderRadius="$lg"
    borderColor="$borderLight300"
    $dark-borderWidth="$1"
    $dark-borderRadius="$lg"
    $dark-borderColor="$borderDark800"
  >
        <VStack space="xl">
        <Heading color="$text900" lineHeight="$md">
          Login
        </Heading>
        <VStack space="xs">
          <Text color="$text500" lineHeight="$xs">
            Email
          </Text>
          <Input>
          <InputField type="text" onChange={(event) => setEmailAddress(event.nativeEvent.text)}  />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text color="$text500" lineHeight="$xs">
            Password
          </Text>
          <Input textAlign="center">
            <InputField type={showPassword ? "text" : "password"}  onChange={(event) => setPassword(event.nativeEvent.text)} />
            <InputSlot pr="$3" onPress={handleState}>
              {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
              <InputIcon
                as={showPassword ? EyeIcon : EyeOffIcon}
                color="$darkBlue500"
              />
            </InputSlot>
          </Input>
        </VStack>
        <Button
          ml="auto"
          onPress={() => {
            onSignInPress();
            // setShowModal(false)
          }}
        >
          <ButtonText color="$white">Log In</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  

    
    </View>
    </GluestackUIProvider>
  );
}