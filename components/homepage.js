import React from 'react'
import { useEffect, useState } from "react";
import {Button,Radio, Box, Select,Center, FormControl, CheckIcon, Input, Flex, HStack, Image} from "native-base";
import { StatusBar } from 'expo-status-bar';

export default function Homepage({navigation}) {
    const [type, setType] = useState("")
    const [amount, setAmount] = useState("")
    const [times, setTimes] = useState(0)
    const [gender, setGender] = useState("")
    const [duration, setDuration] = useState("")
    const [unit, setUnit] = useState(0)
    const [cirrhotic, setCirr] = useState(false);
    const [finished, setFinish] = useState(false);

    useEffect(()=>{

        if(Number(unit) != 0){
            if(gender == "male"){
                if(Number(unit) >=21 ){
                    setCirr(true)
                }
            }else if(gender == "female"){
                if(Number(unit) >=14 ){
                    setCirr(true)
                }
            }
            setFinish(true)
        }
    },[unit])
    useEffect(()=>{
        if(finished){
            const property = {unit, cirrhotic}
            console.log(property)
            navigation.navigate('Result',property)
        }
        
    },[finished])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          setFinish(false);
          setUnit(0)
          setCirr(false)
        });
        
        return unsubscribe;
      }, [navigation])

    const typeOfAlcohol = [
        {Name: "Brandy", ABV: "40"},
        {Name: "Whiskey", ABV: "45"},
        {Name: "Vodka", ABV: "46"},
        {Name: "Rum", ABV: "43"},
        {Name: "Wine", ABV: "14"},
        {Name: "Beer", ABV: "4"},
        {Name: "Gin", ABV: "42"},
        {Name: "Tequila", ABV: "44"},
        {Name: "Absinthe", ABV: "90"}, 
        {Name: "Hard Cider", ABV: "5"},
    ]
    const alcoholType = () =>{
        const alcoholArray = []
        alcoholArray.push(typeOfAlcohol.map((val)=>{
        return(<Select.Item label={val.Name}  value={val.ABV} />)
        }))
        return alcoholArray
    }
    const alcoholArray = alcoholType()
    
    const calculate = () =>{
        const ABV = Number(type) 
        if(duration == "week"){
            console.log(amount)
            const quantity = Number(amount)*Number(times)
            const units = (ABV*quantity)/1000
            setUnit(units)
            console.log(times)
            
        }else if(duration == "month"){
            const time = Number(times)/4
            const quantity = Number(amount)*Number(time)
            const units = (ABV*quantity)/1000
            setUnit(units)
        }else if(duration == "year"){
            const time = Number(times)/52
            const quantity = Number(amount)*Number(time)
            const units = (ABV*quantity)/1000
            setUnit(units)
        }
        
    }
    
    return (
        <Box alignSelf="center" safeArea>
          <StatusBar style="auto" />

            <FormControl isRequired isInvalid>
              <Flex direction="column" mt="10">
                <Center>
                  <Image resizeMode="contain" width={"200"} height={"200"} source={require("../assets/normal.png")} />
                </Center>
                <Select mx="5" my="2" selectedValue={type} minWidth="100" accessibilityLabel="Type" placeholder="Type of beverage" _selectedItem={{
                  bg: "teal.600", endIcon: <CheckIcon size="5" />}}  onValueChange={itemValue => setType(itemValue)}>
                  {
                    [...alcoholArray]
                  }
                </Select>
                <Select mx="5" my="2" selectedValue={amount} minWidth="100" accessibilityLabel="Amount" placeholder="Amount Consumed" _selectedItem={{
                  bg: "teal.600", endIcon: <CheckIcon size="5" />}} onValueChange={itemValue => setAmount(itemValue)}>
                  <Select.Item label="Quarter" value="180" />
                  <Select.Item label="Half" value="375" />
                  <Select.Item label="Full" value="750" />
                </Select>
                <HStack my="2">
                  <Box  w="25%"><Input ml="5" keyboardType='numeric' placeholder="Times" onChangeText={(val)=>{setTimes(val)}} /></Box>
                  <Box  w="75%"><Select w="100%" mx="5" selectedValue={duration}  accessibilityLabel="Duration" placeholder="Duration" _selectedItem={{
                    bg: "teal.600", endIcon: <CheckIcon size="5" />}}  onValueChange={itemValue => setDuration(itemValue)}>
                    <Select.Item label="times per week" value="week" />
                    <Select.Item label="times per month" value="month" />
                    <Select.Item label="times per year" value="year" />
                  </Select></Box>
                </HStack>
                <Radio.Group name="myRadioGroup" accessibilityLabel="Gender" value={gender} onChange={nextValue => {setGender(nextValue)}}>
                    <Flex direction='row' ml="5">
                      <Box w="50%"><Radio value="male" my={1}>Male</Radio></Box>
                      <Box w="50%"><Radio value="female" my={1}>Female</Radio></Box>
                    </Flex>
                </Radio.Group>;
                <Box style={{display: "flex",alignItems:"flex-end"}}><Button mx="5" my="2" w="30%" size={"sm"} onPress={() => calculate()}>Calculate</Button></Box>
              </Flex>
            </FormControl>
        </Box>
    )
    
}
