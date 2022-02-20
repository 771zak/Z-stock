import React, {useState, useEffect} from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Button
} from "react-native";
import {BarCodeScanner} from "expo-barcode-scanner";
import Icon from "react-native-vector-icons/Ionicons";
import {db} from "../firebase"
import { collection, addDoc } from "firebase/firestore"

const AddProduct = ({navigation}) => {
	const [barCode, setBarCode] = useState("");
	const [name, setName] = useState("");
	const [brand, setBrand] = useState("");
	const [expDate, setExpDate] = useState("");
	const [qte, setQte] = useState(Number);
	const [showScanner, setShowScanner] = useState(false);
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false)

	useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [])
	
	const addProduct = async ()=> {
		const docRef = await addDoc(collection(db, "products"), {
			name: name,
			brand: brand,
			barCode: barCode,
			qte: qte,
			expDate: expDate,
		})
	}

	const handleScanner = ({type, data}) => {
		setScanned(true);
		setBarCode(data)
		setShowScanner(false)
	}

	const openScanner = () => {
		setShowScanner(true)
		navigation.setOptions({
			tabBarStyle: {display: "none"}
		})
	}

	const hideScanner = () => {
		setShowScanner(false);
		navigation.setOptions({tabBarStyle: {display: "flex"}})
	}
	
	if (hasPermission == null) {
		return <Text>requestPermissions for camera</Text>
	}
	if (hasPermission == false) {
		return <Text>No access to camera</Text>
	}

	return (
		<>
			<BarCodeScanner 
				onBarCodeScanned={scanned ? undefined : handleScanner}
				style={showScanner ? style.showCamera: undefined}
			/>
		<View style={{
				marginTop: 70,
				flex: 1,
				position: "relative",
				alignItems: "center",
			}}>
			<TextInput 
				placeholder="BarCode" 
				onChangeText={text => setBarCode(text)}
				value={barCode}
				style={style.input}
			/>
			<TouchableOpacity 
				style={style.scannerBtn}
				onPress={openScanner}
			>
				<Icon
					name="barcode-outline"
					style={{fontSize:32}}
				/>
			</TouchableOpacity>

			<View style={style.inputContainer}>
				<TextInput 
					placeholder="Brand" 
					value={brand}
					onChangeText={(text) => setBrand(text)}
					style={style.smallInput}
				/>
				<TextInput 
					placeholder="Name" 
					value={name}
					onChangeText={(text) => setName(text)}
					style={style.smallInput}
				/>
			</View>

			<View style={style.inputContainer}>
				<TextInput 
					placeholder="Purchase Price"
					style={style.smallInput}
				/>
				<TextInput 
					placeholder="Selling Price"
					style={style.smallInput}
				/>
			</View>

			<View style={style.inputContainer}>
				<TextInput 
					placeholder="Quantity" 
					value={qte}
					onChangeText={(text) =>setQte(text)}
					style={style.smallInput}
				/>
				<TextInput 
					placeholder="EXP date" 
					value={expDate}
					onChangeText={(text) =>setExpDate(text)}
					style={style.smallInput}
				/>
			</View>

			<View style={style.submitBtn}>
				<Button 
					title="Submit"
					onPress={addProduct}
				/>
			</View>

			
			{ showScanner &&
				<View style={style.hideCam}>
					<View style={{marginBottom:10}}>
						<Button 
							title="Scan"
							onPress={()=>{setScanned(false)}}
						/>
					</View>
					<Button 
						onPress={hideScanner} 
						title="Hide camera"
					/>
				</View>
			}
		</View>
		</>
	)
}

const style = StyleSheet.create({
	input: {
		width: "80%",
		padding: 10,
		fontSize: 15,
		borderRadius: 10,
		backgroundColor: "#fff",
	},
	inputContainer: {
		flexDirection: "row",
		justifyContent: "center",
		width: "100%",
	},
	showCamera: {
		...StyleSheet.absoluteFillObject,
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		elevation: 3,
		left: 0,
		width: "100%",
		height: "100%",
	},
	scannerBtn: {
		position: "absolute",
		right: 40,
		top: 8,
	},
	hideCam: {
		position: "absolute",
		bottom: 90,
	},
	smallInput: {
		width: "45%",
		padding: 10,
		backgroundColor: "#fff",
		borderRadius: 10,
		fontSize: 15,
		margin : 10,
	},
	submitBtn: {
		elevation: 1,
	}
})

export default AddProduct
