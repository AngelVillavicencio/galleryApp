import { Camera } from "expo-camera";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert, ActivityIndicator
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GalleryContext } from "../../context/GalleryContext";
import { db, storage } from "../../firebase/authFirebase";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuhContext";



export default function index({ children }) {
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [isTaken, setIsTaken] = useState(null);
  const [photoCaptured, setPhotoCaptured] = useState(null);
  const { addImageInList } = useContext(GalleryContext);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onOpen = () => {
    setModalVisible(true);
    setIsTaken(false);
  };
  const onClose = () => {
    setIsTaken(false);
    setModalVisible(false);
  };
  const onCapture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      console.log(photo);
      setPhotoCaptured(photo);
      setIsTaken(true);
    }
  };
  const onCancel = () => {
    setIsTaken(false);
    setPhotoCaptured(null);
  };
  const onSave = async () => {
    setIsLoading(true)
    try {
      const imageRef = ref(storage, `${user.email}/${photoCaptured.uri}`);
      const response = await fetch(photoCaptured.uri);
      const blob = await response.blob();
      //await imageRef.put(blob);
      await uploadBytes(imageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });

      try {
        const imageData = { ...photoCaptured, uri: await getDownloadURL(imageRef), descripcion: "" };
        console.log("imageData", imageData);

        const data = { email: user.email, imageUrl: imageData.uri }; // Asegúrate de tener photoCaptured definido
        console.log("Data", data);

        const response = await fetch('http://146.190.37.161:3000/api/process', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          // Procesa la respuesta de la API según sea necesario
          console.log("Resultado de la API:", result);
          const dataDocument = { ...imageData, descripcion: result.visionResult, estado: true, isFavorite: false }
          console.log("Add documento:", dataDocument)
          // Continúa con el resto de tu lógica después de la respuesta exitosa
          const docRef = await addDoc(collection(db, user.email), dataDocument);
          addImageInList(dataDocument);
          setIsTaken(false);
          setPhotoCaptured(null);
          setModalVisible(false);
          setIsLoading(false);
          console.log("Documento escrito con ID: ", docRef.id);
        } else {
          // Maneja el caso de respuesta no exitosa
          console.error("Error al hacer la solicitud a la API.");
          setIsLoading(false);
        }
      } catch (e) {
        console.error("Error al agregar el documento: ", e);
        setIsLoading(false);
      }


    } catch (error) {
      Alert.alert("No se pudo procesar la foto");
    }

  };


  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        {
          isLoading ? (<View style={styles.container}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text>Procesando la imagen...</Text>
          </View>) : (<View style={styles.centeredView}>
            <View style={styles.modalView}>
              {isTaken == false ? (
                <>
                  <View style={styles.buttonClose}>
                    <TouchableOpacity>
                      <FontAwesome
                        name="close"
                        size={30}
                        color="#fff"
                        onPress={onClose}
                      ></FontAwesome>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonCaptureContainer}>
                    <View style={styles.buttonCapture}>
                      <TouchableOpacity>
                        <FontAwesome
                          name="circle-thin"
                          size={80}
                          color="#fff"
                          onPress={onCapture}
                        ></FontAwesome>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.buttonRevert}>
                    <TouchableOpacity
                      onPress={() => {
                        setType(
                          type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                      }}
                    >
                      <MaterialIcons
                        name="flip-camera-ios"
                        size={30}
                        color="#fff"
                      ></MaterialIcons>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.buttonCancelPhoto}>
                    <View style={styles.buttonCapture}>
                      <TouchableOpacity>
                        <FontAwesome
                          name="trash"
                          size={80}
                          color="#fff"
                          onPress={onCancel}
                        ></FontAwesome>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.buttonSavePhoto}>
                    <View style={styles.buttonCapture}>
                      <TouchableOpacity>
                        <FontAwesome
                          name="check-circle-o"
                          size={80}
                          color="#fff"
                          onPress={onSave}
                        ></FontAwesome>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}

              {isTaken == false ? (
                <Camera
                  style={styles.camera}
                  type={type}
                  ref={(ref) => setCamera(ref)}
                ></Camera>
              ) : (
                <Image
                  style={styles.image}
                  source={{ uri: photoCaptured?.uri }}
                ></Image>
              )}
            </View>
          </View>)
        }

      </Modal>
      <TouchableOpacity onPress={onOpen}>{children}</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  modalView: {
    flex: 1,
    width: "100%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
    backgroundColor: "#000",
  },
  buttonCancelPhoto: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: "absolute",
    left: 55,
    bottom: 25,
    zIndex: 2,
  },
  buttonSavePhoto: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: "absolute",
    right: 55,
    bottom: 25,
    zIndex: 2,
  },
  buttonClose: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: "absolute",
    left: 15,
    top: 15,
    zIndex: 2,
  },
  buttonCaptureContainer: {
    position: "absolute",
    bottom: 50,
    zIndex: 2,
  },
  buttonCapture: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
    height: null,
    resizeMode: "contain",
  },
  buttonRevert: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 2,
  },
});
