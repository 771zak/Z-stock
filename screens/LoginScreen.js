import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View, TextInput, Text, KeyboardAvoidingView} from 'react-native';
import {auth} from "../firebase";

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignUp = () => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(userCredentials => {
				const user = userCredentials.user;
				console.log(user.email);
			})
			.catch(error => alert(error.message));
	}

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
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
					secureTextEntry
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
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
		width: "80%",
	},
	input: {
		backgroundColor: "white",
		padding: 10,
		fontSize: 16,
		marginTop: 7,
		borderRadius: 12,
		shadowColor: "red",
		shadowOffset: { width: 20, height: 10 },
		elevation: 2,
		shadowOpacity: 2,
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
	}
})
