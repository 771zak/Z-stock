import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Icon from "react-native-vector-icons/Entypo";
import AppLoader from "../components/AppLoader";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
				setLoggedIn(true)
        navigation.replace("Home");
      }
    });
  }, []);

  const handleSignIn = () => {
    let cred = {
      userEmail: email,
      userPassword: password,
    };
		const auth = getAuth();
		setLoading(true)
		signInWithEmailAndPassword(auth, email, password)
			.then((userCred) => {
				setLoading(false)
				console.log(userCred.user.email);
			})
			.catch((error) => {
				console.log(error.message);
				setLoading(false)
				if (error.code === "auth\/invalid-email") {
					Alert.alert("Alert",
						"Wrong email or password.\nPlease try again."
					)
				}
			})
	};

  const handleSignUp = () => {
    const auth = getAuth();
		setLoading(true)
		if (email != "" && password != "") {
			if (password.length < 6){
				return Alert.alert("Password should be at least 6 characters",
					"Please try again"
				)
			}
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCred) => {
					setLoading(false)
					const user = userCred.user;
				})
				.catch((error) => {
					setLoading(false)
					console.log(error.message);
				});
		} else {
			Alert.alert(
				"email or password can't be blank",
				"Please try again."
			)
		}
  };

  return (
		<>
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={-600}
    >
      <View style={styles.inputContainer}>
				<Text style={{fontSize: 29, marginBottom: 10, fontWeight: 'bold'}}>Welcome to Z-stock</Text>
				<Text style={{fontSize: 22, marginBottom:30, fontWeight: '600'}}>Sign In</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={showPass}
        />
        <TouchableOpacity
          style={styles.showPass}
          onPress={() => {
            setShowPass(!showPass);
          }}
        >
					<Icon 
						name={showPass ? "eye": "eye-with-line"}
						style={{fontSize:22, color: "#320617"}}
					/>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={{ color: "white", fontSize: 16 }}>Log in</Text>
					<Icon 
						name="login"
						type="entypo"
						color="#333"
						style={{fontSize: 18, marginLeft: 5}}
					/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp} style={styles.buttonOutline}>
          <Text style={{ color: "#333", fontSize: 16 }}>Register</Text>
        </TouchableOpacity>
      </View>
			{loading ? <AppLoader /> : null}
    </KeyboardAvoidingView>
		</>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
  },
  input: {
		borderBottomWidth: 2,
		borderColor: "#333",
    padding: 15,
    fontSize: 19,
    marginTop: 7,
    marginBottom: 10,
    shadowOpacity: 12,
    position: "relative",
  },
  buttonContainer: {
    width: "60%",
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "#EF1A69",
    alignItems: "center",
    marginTop: 13,
    borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
  },
  buttonOutline: {
    padding: 7,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 5,
    borderRadius: 10,
    borderColor: "#320617",
    borderWidth: 2,
  },
  showPass: {
    height: 57.5,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 10,
    right: 0,
  },
});
