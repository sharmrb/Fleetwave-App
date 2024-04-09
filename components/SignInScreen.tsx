import React, { useState } from "react";
import {  TextInput, TouchableOpacity, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Text, Button, ButtonText, FormControl, Heading, Input, InputField, InputSlot, VStack, EyeIcon, EyeOffIcon, InputIcon, GluestackUIProvider, Image } from "@gluestack-ui/themed";
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

    
    <View  >
    <FormControl
    p="$4"
    borderWidth="$1"
    borderRadius="$lg"
    borderColor="$borderLight300"
    $dark-borderWidth="$1"
    $dark-borderRadius="$lg"
    $dark-borderColor="$borderDark800"
    marginTop={200}
    padding={20}
  >
 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 

</View>

<VStack alignItems="center">

  <Image style={{ width: 100, height: 100 , marginBottom: 20}}
    alt="Logo"
    size="md"
    borderRadius="$md"
    source={{
      uri: "https://i.ibb.co/RHtfSDb/android-chrome-192x192.png[/img][/url]co/SvHbx3y",
    }}
  />


</VStack>
<VStack alignItems="center" marginBottom={20}>
<Heading>
    
    <Heading color="$indigo400">Welcome to Fleetwave Driver App</Heading>
  </Heading>
</VStack>
        <VStack space="xl">
        
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