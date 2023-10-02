import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { async } from "@firebase/util";

const MemoryScreen = ({ route }) => {
  let count = 0;
  const { memory } = route.params;
  const navigation = useNavigation();
  let uploadedImagePaths = [];

  const [desciption, setDesciption] = useState(memory.description || "");

  const [imgPaths, setImgPaths] = useState([]);
  //const [imgHeights, setImgHeights] = useState([]);

  const screenWidth = Dimensions.get("window").width;
  const [firebaseImages, setFirebaseImages] = useState([]);

  async function updateDescription() {
    await updateDoc(doc(db, "notes", memory.id), {
      desciption: desciption,
    });
  }

  async function selectImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newImgPaths = result.assets.map((asset) => asset.uri);

      const newImgHeights = result.assets.map((asset) => {
        const aspectRatio = asset.width / asset.height;
        return screenWidth / aspectRatio;
      });

      setImgPaths(newImgPaths);
      //setImgHeights(newImgHeights);
    }
  }

  async function uploadImg(pathsToUpload) {
    console.log(pathsToUpload);

    uploadedImagePaths = [];

    for (let path of pathsToUpload) {
      count++;
      try {
        const res = await fetch(path);
        const blob = await res.blob();

        const imgName = new Date().toISOString() + ".jpg";
        const imgRef = ref(storage, "images/" + imgName);

        await uploadBytes(imgRef, blob);
        console.log("saved " + imgName);

        uploadedImagePaths = [...uploadedImagePaths, imgName];
      } catch (error) {
        console.error(`Error uploading image for path ${path}: `, error);
      }
    }

    // Update the Firestore document with the new image paths
  }

  async function save() {
    await uploadImg(imgPaths);

    console.log("test");
    const docRef = doc(db, "notes", memory.id);
    await updateDoc(docRef, {
      imagePaths: arrayUnion(...uploadedImagePaths),
    });
  }

  async function downLoadImage() {
    getDownloadURL(ref(storage, "navn.jpg")).then((url) => {
      //hvad der skal se med url
    });
  }

  async function deleteMemory() {
    await deleteDoc(doc(db, "notes", memory.id));
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <View style={styles.container}>
              <TouchableOpacity style={styles.deleteBtn} onPress={deleteMemory}>
                <Text style={styles.text}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => save()}>
                <Text>Save</Text>
              </TouchableOpacity>

              <Text style={styles.title}>{memory.title}</Text>
              <TextInput
                defaultValue={memory.desciption}
                onChangeText={setDesciption}
                onEndEditing={updateDescription}
                style={styles.textbox}
                multiline={true}
                placeholder="description"
              />

              <View style={{ alignItems: "baseline", marginVertical: 20 }}>
                <TouchableOpacity style={styles.btn} onPress={selectImage}>
                  <Text style={styles.text}>Upload Pictures</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {imgPaths.map((path) => (
                <Image
                  key={path}
                  source={{ uri: path }}
                  style={{ width: screenWidth, height: 300 }}
                  resizeMode="contain"
                />
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MemoryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },

  title: {
    fontSize: 35,
    marginBottom: 15,
  },
  text: {
    color: "white",
  },

  textbox: {
    padding: 15,
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    minHeight: 60,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: "pink",
    padding: 6,
    borderRadius: 5,
    width: "auto",
  },
  deleteBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "red",
    width: 80,
    display: "flex",
    alignItems: "center",
  },
});
