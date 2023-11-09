import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from "react-native";

function PhotoDetailScreen({ route }) {
  const { id, uri, descripcion } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image
          style={styles.image}
          source={{
            uri: uri,
          }}
        ></Image>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>{descripcion}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PhotoDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 450,
    alignSelf: "center",
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#eee",
    width: "95%",
    alignSelf: "center",
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
  },
});
