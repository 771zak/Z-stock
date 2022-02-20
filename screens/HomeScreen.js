import React, { useState, useEffect, useRef } from "react";
import { 
	StyleSheet, 
	View, 
	Text, 
	TextInput, 
	FlatList,
	Button, 
	TouchableOpacity,
	ScrollView
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import Icon from "react-native-vector-icons/Feather";
import ProductCard from "../components/ProductCard";

const HomeScreen = ({ navigation }) => {

	const [productList, setProductList] = useState([]);
	
	useEffect(()=>{
		Read();
		return ()=> {
			console.log("home ummouted");
		}
	}, [])

  const Read= async () => {
		const querySnapshot = await getDocs(collection(db, "products"));
		setProductList(querySnapshot.docs.map((doc)=>(
			{ ...doc.data(), id: doc.id }
		)))
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
			<View style={styles.productsContainer}>
				<FlatList 
					numColumns={2}
					contentContainerStyle={{alignItems: "center"}}
					data={productList}
					renderItem={({item}) => (
						<ProductCard name={item.name} />
					)}
					keyExtractor={item => item.id}
				/>
			</View>
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
		flexDirection: "column",
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
	},
	productsContainer: {
		width: "100%",
		height: "80%",
		paddingTop: 40,
		position: "absolute",
		bottom:65,
		//backgroundColor: "#333",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		flexWrap: "wrap",
	}, 
});
