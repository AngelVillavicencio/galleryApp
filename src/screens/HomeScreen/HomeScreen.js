import { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import Photo from "../../components/Photo/index";
import { GalleryContext } from "../../context/GalleryContext";
import ModalPhoto from "../../components/ModalPhoto/index";

import FontAwesome from "@expo/vector-icons/FontAwesome";
function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <Photo
      navigation={navigation}
      id={item.id}
      uri={item.uri}
      isFavorite={item.isFavorite}
    />
  );
  const { listGallery } = useContext(GalleryContext);
  return (
    <>
      {listGallery.length == 0 ? (
        <View style={styles.containerWithOutImages}>
          <Text style={styles.title}>No hay imágenes aún</Text>
          <ModalPhoto>
            <View style={styles.buttonAdd}>
              <FontAwesome
                name="camera"
                size={20}
                color="#3b5998"
              ></FontAwesome>
              <Text style={styles.buttonAddImage}>Agrega una imagen</Text>
            </View>
          </ModalPhoto>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            horizontal={false}
            numColumns={2}
            data={listGallery}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
}

export default HomeScreen;

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
