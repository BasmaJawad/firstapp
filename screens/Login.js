import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase";

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
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 10,
    textAlign: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 10,
    borderColor: "blue",
    borderWidth: 2,
  },
});
