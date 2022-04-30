import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { GalleryContext } from "../../context/GalleryContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DoubleClick from "../../helpers/DoubleClick";

export default function index({ id, uri, isFavorite, navigation }) {
  const [lastPress, setLastPress] = useState(0);

  const { deleteImageInList, switchFavorite } = useContext(GalleryContext);

  const onDeleteImage = () => {
    deleteImageInList(id);
  };

  return (
    <DoubleClick
      styles={styles.photo}
      singleTap={() => {
        navigation.navigate("DetailPhoto", { id, uri, isFavorite });
      }}
      doubleTap={() => {
        switchFavorite(id, isFavorite);
      }}
      delay={200}
    >
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
      {isFavorite && (
        <TouchableOpacity style={styles.containerfavoriteIcon}>
          <MaterialIcons
            name="favorite"
            size={25}
            color="#3b5998"
          ></MaterialIcons>
        </TouchableOpacity>
      )}
    </DoubleClick>
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
    width: "100%",
    height: "100%",
  },
  containerDeleteIcon: {
    position: "absolute",
    left: -5,
    top: -5,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 0,
  },
  containerfavoriteIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    padding: 0,
    borderTopLeftRadius: 15,
    padding: 2,
  },
});
