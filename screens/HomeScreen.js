import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {BarCodeScanner} from "expo-barcode-scanner";
import {db} from "../firebase"
import {collection, addDoc} from "firebase/firestore"

const HomeScreen = ({navigation}) => {
	
	const Create = () => {
		try {
			const docRef = addDoc(collection(db,	"products"), {
				name: "bifa",
				barCode: barCode,
				qte: 24
			});
			console.log("writern with", docRef.id);
		} catch (err) {
			console.log("error is ", err)
		}
	}


	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [showScanner, setShowScanner] = useState(false);
	const [barCode, setBarCode] = useState(null)

	const handleOpen = () => {
		setScanned(false)
		setShowScanner(!showScanner);
		setBarCode(null)
	}
	
	useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

	const handleBarScan = ({type, data}) => {
		setScanned(true);
		setBarCode(data);
		setShowScanner(false);
	}

	if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

	return (
		<View style={styles.HomeScreen}>
			<Text style={{color: "red"}}>{barCode != null ? `barCode is ${barCode}`: "waiting for barCode"}</Text>
			<BarCodeScanner
				onBarCodeScanned={scanned? undefined : handleBarScan }
				style={showScanner? styles.scanner : styles.absoluteFillObject}
			/>
			<Button
				title="scan"
				onPress={()=>{setScanned(false)}}
			/>
			<Button
				title={showScanner? "close" : "Open"}
				onPress={handleOpen}
			/>
			<Button
				title="db"
				onPress={Create}
			/>
		</View>
	)
}

export default HomeScreen;

const styles = StyleSheet.create({
	HomeScreen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: "relative",
		width: "100%",
		height: "100%",
		backgroundColor: "#333"
	},
	scanner: {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		height: 500,
		width: 500
	}
})
