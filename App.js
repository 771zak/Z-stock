import { StatusBar } from "expo-status-bar";
import React, { useState } from "react"
import { StyleSheet, FlatList, Button,TextInput, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
		<NavigationContainer>
      <Stack.Navigator
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen  name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
		justifyContent: "center"
  }
 });
