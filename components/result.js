import { Box,Image, Button,Text, Flex, Center, Icon } from 'native-base'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';



export default function Result({route,navigation},) {
    const {unit, cirrhotic} = route.params;
    
    const cirrhosis = () =>{
        return(<Image resizeMode="contain" width={"200"} height={"200"} source={require("../assets/cirrhosis.png")} />)
    }
    
  return (
    <Flex direction='column' safeArea>
        <StatusBar style="auto" />

            <Button alignSelf="flex-start" onPress={ ()=> {navigation.navigate('Home')} } variant="link">
                <Flex direction='row'>
                    <Icon size='2xl' as={MaterialCommunityIcons} name='chevron-left'/>
                    <Text fontSize='2xl'>Back</Text> 
                </Flex>
            </Button>
        
        
        
        
        <Flex direction='column' mt='10'>
            <Center>{(cirrhotic) ? cirrhosis() : <Image resizeMode="contain" width={"200"} height={"200"} source={require("../assets/normal.png")} />}</Center>
            <Center>
                <Box  mx='5' my='2' borderColor='primary.300' borderWidth='1'>
                    <Text p='2' color='primary.800' fontSize='xl'>Total amount of alcohol consumed is <Text bold>{unit}</Text> units per week.</Text>
                </Box>
                <Box mx='5' my="2" bg='primary.300' borderColor='primary.300' borderWidth='1' ><Text p='2' fontSize='lg' color='primary.900'>Risk of cirrhosis of liver increases if unit of alcohol consumed per week is greater than 21 for men and 14 for women for more than 10 years.</Text></Box>
            </Center>
        </Flex>
    </Flex>
  )
}
