import React from "react";
import { NativeBaseProvider} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from "./components/homepage";
import Result from "./components/result";

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Homepage} />
            <Stack.Screen name="Result" component={Result} />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
  )
}