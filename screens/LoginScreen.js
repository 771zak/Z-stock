import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, Alert, Button, View, TextInput, Text, KeyboardAvoidingView} from 'react-native';
import {
	getAuth, 
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth"

const LoginScreen = ({navigation}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPass, setShowPass] = useState(true);

	useEffect(()=>{
		const unsubscribe = getAuth().onAuthStateChanged(user=>{
			if (user) {
				navigation.replace("Home")
			}
		})
	}, [])

	const handleSignIn= () => {
		let cred = {
			userEmail: email,
			userPassword: password
		};
		if (cred.userEmail != "" || cred.userPassword != "") {
			const auth = new getAuth();
			signInWithEmailAndPassword(auth, email, password)
				.then((userCred) =>{
					console.log("logged in with: ", userCred.user.email);
					navigation.navigate("Home");
				})
				.catch(err => console.log(err.message));
			setEmail('');
			setPassword('');
		} else {
			Alert.alert(
				"Wrong email or password",
				"Please renter email and password again!."
			)
		}
	}

	const handleSignUp= () => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCred)=>{
				const user = userCred.user;
				console.log(user);
			})
			.catch((error) => {
				console.log(error.message);
			})
	}

	return (
		<KeyboardAvoidingView 
			style={styles.container} 
			behavior="padding"
			keyboardVerticalOffset={-600}
		>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Email"
					value={email}
					onChangeText={text => setEmail(text)}
					style={styles.input}
				/>
				<TextInput
					placeholder="Password"
					value={password}
					onChangeText={text => setPassword(text)}
					style={styles.input}
					secureTextEntry={showPass}
				/>
				<TouchableOpacity 
					style={styles.showPass}
					onPress={()=>{
						setShowPass(!showPass);
					}}
				>
					<Text style={{color: "white"}}>{showPass?"Show":"Hide"}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={handleSignIn}
				>
					<Text style={{ color: "white", fontSize: 16 }}>Log in</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={handleSignUp}
					style={styles.buttonOutline}
				>
					<Text style={{ color: "#333", fontSize: 16 }}>Register</Text>
				</TouchableOpacity>

			</View>
		</KeyboardAvoidingView>
	)
}

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputContainer: {
		width: "90%",
	},
	input: {
		backgroundColor: "white",
		padding: 15,
		fontSize: 16,
		marginTop: 7,
		marginBottom: 10,
		borderRadius: 12,
		shadowColor: "red",
		shadowOffset: { width: 20, height: 10 },
		elevation: 2,
		shadowOpacity: 2,
		position: "relative",
	},
	buttonContainer: {
		width: "60%",
	},
	button: {
		width: "100%",
		padding: 10,
		backgroundColor: "#333",
		alignItems: "center",
		marginTop: 13,
		borderRadius: 10,
	},
	buttonOutline: {
		padding: 7,
		alignItems: "center",
		backgroundColor: "#fff",
		marginTop: 5,
		borderRadius: 10,
		borderColor: "#333",
		borderWidth: 2,
	},
	showPass: {
		backgroundColor: "#333",
		height: 57.5,
		width: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		position: "absolute",
		bottom: 10,
		right: 0,
		elevation: 3,
	}
})
