import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { GalleryContext } from "../../context/GalleryContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function index({ id, uri, isFavorite, navigation }) {
  const [lastPress, setLastPress] = useState(0);
  const onDoublePress = () => {
    const time = new Date().getTime();
    const delta = time - lastPress;

    const DOUBLE_PRESS_DELAY = 400;
    if (delta < DOUBLE_PRESS_DELAY) {
      // Success double press
      console.log("double press");
      switchFavorite(id, isFavorite);
    } else {
      console.log("one touch");
      navigation.navigate("DetailPhoto", { id, uri, isFavorite, navigation });
    }
    setLastPress(time);
  };
  const { deleteImageInList, switchFavorite } = useContext(GalleryContext);
  const onPress = () => {
    console.log("Hello");
  };

  const onDeleteImage = () => {
    deleteImageInList(id);
  };
  return (
    <View
      style={styles.photo}
      onStartShouldSetResponder={(evt) => onDoublePress()}
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
        <TouchableOpacity
          style={styles.containerfavoriteIcon}
          onPress={onDeleteImage}
        >
          <MaterialIcons name="favorite" size={25} color="#000"></MaterialIcons>
        </TouchableOpacity>
      )}
    </View>
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
