import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

function getDateFormatted(date) {
  const dateObj = new Date(date.seconds * 1000); //coverts firestamp Timestap to JS date

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();

  return `${day}. ${month} ${year}`;
}

const MemoryBox = ({ memory }) => {
  const date = getDateFormatted(memory.createdDate);

  const navigation = useNavigation();

  function navigateToMemory() {
    navigation.navigate("Memory", { memory: memory });
  }

  return (
    <TouchableOpacity
      style={styles.box}
      onPress={() => {
        navigateToMemory();
      }}
    >
      <View style={styles.imgContainer}></View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{memory.title}</Text>
        <Text>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MemoryBox;

const styles = StyleSheet.create({
  box: {
    width: "100%",
    backgroundColor: "pink",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },

  imgContainer: {
    height: 60,
    width: 60,
    backgroundColor: "gray",
    borderRadius: 10,
    marginRight: 15,
  },
  titleWrapper: {
    display: "flex",
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
  },
});
