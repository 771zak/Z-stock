import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {getAuth, signOut} from "firebase/auth";

const InfoScreen = ({navigation})=>{

	const auth = getAuth();
	const signOut = () => {
		auth
			.signOut()
			.then(() =>{
				navigation.replace("Login")
				console.log("user signed out");
			})
	}

	return (
		<View style={styles.container}>
			<Text>hello from info</Text>
			<Button 
				title="Sign out"
				onPress={signOut}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export default InfoScreen;
