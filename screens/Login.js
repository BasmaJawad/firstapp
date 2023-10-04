import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,ImageBackground
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native-web";

const LoginScreen = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        console.log("Signed in!", userCredential.user);
        navigation.navigate("Home", { user: userCredential.user });
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        console.log("User account created & signed in!", userCredential.user);
      })
      .catch((error) => {
        console.error(error.code, error.message);
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }
      });
  };

  return (
 
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
    source={require("../assets/background.jpeg")} 
    style={styles.backgroundImage}
  >
  
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={Email}
          onChangeText={(txt) => setEmail(txt)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={Password}
          onChangeText={(txt) => setPassword(txt)}
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text>Opret Bruger</Text>
          </TouchableOpacity>

         </View>
        </View> 
       </ImageBackground>
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
    flex: 1, // Add this to make it take up the available vertical space
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    width: "80%",
    marginTop: 300,
    marginLeft: 30,
  },
  input: {
    backgroundColor: "white",
    height:40,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    width: "100%", // Make inputs take up full width
  },
  buttonContainer: {
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    width: "100%",
    marginTop: 70,
  },
  button: {
    width: "80%",
    backgroundColor: 'rgba(1, 188, 275, 0.5)',
    padding: 12,
    borderRadius: 10,
    textAlign: "center",
    shadowColor: "black", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3,
    shadowRadius: 4, 
    elevation: 2,
  },
  buttonOutline: {
    backgroundColor: "white", 
    marginTop: 10,
    borderColor: "transparent", 
    borderWidth: 2,
    shadowColor: "black", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3,
    shadowRadius: 4, 
    elevation: 2, 
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Make the image cover the entire view
  },
  
  
 
});
