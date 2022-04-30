import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { GalleryContext } from "../../context/GalleryContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function index({ id, uri }) {
  const { deleteImageInList } = useContext(GalleryContext);
  const onPress = () => {
    console.log("Hello");
  };

  const onDeleteImage = () => {
    deleteImageInList(id);
  };
  return (
    <TouchableOpacity style={styles.photo} onPress={onPress}>
      <Image
        style={styles.image}
        source={{
          uri: uri,
        }}
      ></Image>

      <TouchableOpacity
        style={styles.containerDeleteIcon}
        onPress={onDeleteImage}
      >
        <MaterialIcons name="cancel" size={30} color="#000"></MaterialIcons>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  photo: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "oldlace",
    marginBottom: 6,
    margin: "1%",
    width: "48%",
    textAlign: "center",
    height: 350,
    position: "relative",
  },
  image: {
    flex: 1,
  },
  containerDeleteIcon: {
    position: "absolute",
    left: -5,
    top: -5,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 0,
  },
});
