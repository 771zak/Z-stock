import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import InfoScreen from "./screens/InfoScreen";
import AddProduct from "./screens/AddProduct";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreenTabs = ()=>(
		<Tab.Navigator 
			screenOptions={{headerShown: false}}
			tabBarOptions={{activeTintColor:"#EF1A69"}}
		>
			<Tab.Screen 
				name="Home" 
				component={HomeScreen} 
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({color, size}) => (
						<MaterialCommunityIcons name="home" color={color} size={size}/>
				)
				}}
			/>
			<Tab.Screen 
				name="Add" 
				component={AddProduct} 
				options={{
					tabBarLabel: "Add",
					tabBarIcon: ({color, size}) => (
						<MaterialCommunityIcons name="plus" color={color} size={size}/>
				)
				}}
			/>
			<Tab.Screen 
				name="info" 
				component={InfoScreen} 
				options={{
					tabBarLabel: "Add",
					tabBarIcon: ({color, size}) => (
						<MaterialCommunityIcons name="information" color={color} size={size}/>
				)
				}}
			/>
		</Tab.Navigator>
)

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreenTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
