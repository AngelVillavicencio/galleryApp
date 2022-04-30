import { StyleSheet, Text, View, Image } from "react-native";
function PhotoDetailScreen({ route }) {
  const { id, uri, isFavorite } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={styles.image}
        source={{
          uri: uri,
        }}
      ></Image>
    </View>
  );
}

export default PhotoDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
