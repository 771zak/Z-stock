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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(true);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
  }, []);

  const handleSignIn = () => {
    let cred = {
      userEmail: email,
      userPassword: password,
    };
    if (cred.userEmail != "" &&  cred.userPassword != "") {
      const auth = new getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
					navigation.navigate("Home");
        })
				.catch((err) =>{
					if (err.message == "auth\/invalid-email") {
						Alert.alert(
							"wrong email or password",
							"please try again."
						)
					}
				})
			setTimeout(() =>{
				setEmail("")
				setPassword("")
			}, 2000)
    } else {
      Alert.alert(
        "Email or Password can't be empty !.",
        "Please renter email and password again!."
      );
    }
  };

  const handleSignUp = () => {
    const auth = getAuth();
		if (email != "" && password != "") {
			if (password.length < 6){
				return Alert.alert("Password should be at least 6 characters",
					"Please try again"
				)
			}
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCred) => {
					const user = userCred.user;
				})
				.catch((error) => {
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
          <Text style={{ color: "#320617", fontSize: 16 }}>{showPass ? "Show" : "Hide"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={{ color: "white", fontSize: 16 }}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp} style={styles.buttonOutline}>
          <Text style={{ color: "#333", fontSize: 16 }}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
