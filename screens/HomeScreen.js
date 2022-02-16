import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { db } from "../firebase";
import { collection, getDocs} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import Icon from "react-native-vector-icons/Feather";

const HomeScreen = ({ navigation }) => {
  const Read= () => {
		getDocs(collection(db, "products"))
			.then((products) =>{
				products.forEach((product) =>{
					let doc = product
					console.log(`${doc.id} => ${doc.data()}`);
				})
			})
  };

 return (
    <View style={styles.HomeScreen}>
			<View style={styles.searchBar}>
				<TextInput 
					style={{fontSize:18 ,width: "90%"}}
					placeholder="Search"
				/>
				<Icon
					name="search"
					type="feather"
					style={{fontSize:22}}
					color="#EF1A69"
				/>
			</View>
			<Button title="get data" onPress={Read}/>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  HomeScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
  },
	searchBar: {
		width: "90%",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		backgroundColor: "#fff",
		position: "absolute",
		top: 40,
		padding: 10,
		borderRadius: 12,
		shadowColor: "#333",
		shadowOffset: {
			width: 20,
			height: 30
		},
		shadowOpacity: 10,
		elevation: 2,
		shadowRadius: 10,
	}
});
