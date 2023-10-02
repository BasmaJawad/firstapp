import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import MemoryBox from "../components/memoryBox";

const HomeScreen = ({ navigation, route }) => {
  const [newTitle, setNewtitle] = useState("");

  const { user } = route.params;

  //Henter fra db
  const q = query(collection(db, "notes"), where("userID", "==", user.uid));
  const [values, loading, error] = useCollection(q);
  const data = values?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  if (data) {
    data.sort((a, b) => {
      return b.createdDate.seconds - a.createdDate.seconds;
    });
  }

  //Gemmer til db
  async function addNewMemory(title) {
    const dateObj = new Date();
    const formattedDate = dateObj.toLocaleDateString("fr-FR");

    let memory = {
      userID: user.uid,
      title: title,
      createdDate: dateObj,
      desciption: "",
      imagePaths: [],
    };

    try {
      await addDoc(collection(db, "notes"), memory);
    } catch (err) {
      console.log("fejl i db: " + err);
    }
    navigation.navigate("Memory", { memory: memory });
  }

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() =>
            Alert.prompt("Angiv Titel", "", (text) => addNewMemory(text))
          }
        >
          <Text>Tilføj</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={({ item }) => <MemoryBox memory={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: "gray",
    padding: 3,
    color: "white",
    width: 50,
  },
  list: {
    padding: 20,
  },
});
