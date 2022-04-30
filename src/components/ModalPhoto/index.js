import { Camera } from "expo-camera";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GalleryContext } from "../../context/GalleryContext";

export default function index({ children }) {
  const [modalVisible, setModalVisible] = useState(false);
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
  const onSave = () => {
    addImageInList(photoCaptured);
    setIsTaken(false);
    setPhotoCaptured(null);
    setModalVisible(false);
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
        <View style={styles.centeredView}>
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
        </View>
      </Modal>
      <TouchableOpacity onPress={onOpen}>{children}</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
