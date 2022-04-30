import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { GalleryContext } from "../../context/GalleryContext";
import Photo from "../../components/Photo/index";

export default function FavoritesScreen({ navigation }) {
  const { listGallery } = useContext(GalleryContext);

  const renderItem = ({ item }) => (
    <Photo
      navigation={navigation}
      id={item.id}
      uri={item.uri}
      isFavorite={item.isFavorite}
    />
  );
  return (
    <>
      {listGallery.filter((item) => item.isFavorite).length == 0 ? (
        <View style={styles.containerWithOutImages}>
          <Text style={styles.title}>No hay favoritos aún</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            horizontal={false}
            numColumns={2}
            data={listGallery.filter((item) => item.isFavorite)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerWithOutImages: {
    flex: 1,
    backgroundColor: "#fff",
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C2B33",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 20,
    textAlign: "center",
  },
  buttonAdd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAddImage: {
    fontSize: 12,
    fontWeight: "500",
    color: "#3b5998",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 20,
    textAlign: "center",
  },
  gallery: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#f0f",
  },
});
