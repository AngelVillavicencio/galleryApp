import React, { createContext, useState, useEffect } from "react";
import uuid from "react-native-uuid";
export const GalleryContext = createContext();

import { db, storage } from "../firebase/authFirebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";

import { AuthContext } from "./AuhContext";
import { async } from "@firebase/util";

const GalleryProvider = ({ children }) => {
  const [listGallery, setListGallery] = useState([]);
  const { user } = React.useContext(AuthContext);

  const addImageInList = (photo) => {
    const newPhoto = { ...photo, id: uuid.v4(), isFavorite: false };
    setListGallery([...listGallery, newPhoto]);
  };

  const deleteImageInList = async (id) => {

    const imagesRef = collection(db, user.email);

    const res = await imagesRef.update({ estado: false });

    const newList = listGallery.filter((photo) => photo.id != id);
    setListGallery(newList);
  };

  const switchFavorite = (id, isFavorite) => {
    const list = listGallery.map((photo) =>
      photo.id == id ? { ...photo, isFavorite: !isFavorite } : photo
    );
    setListGallery(list);
  };

  const getImagesFireStore = async () => {
    const imagesRef = collection(db, user.email);
    console.log("images fire store", imagesRef)

    const q = query(imagesRef, where("estado", "==", true));
    let images = []
    const querySnapshot = await getDocs(q);
    console.log("images fire store", imagesRef)

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      images.push({ ...doc.data(), id: doc.id });
    });

    console.log("images", images)
    setListGallery(images);


  }



  return (
    <GalleryContext.Provider
      value={{
        listGallery: listGallery,
        addImageInList: addImageInList,
        deleteImageInList: deleteImageInList,
        switchFavorite: switchFavorite,
        getImagesFireStore: getImagesFireStore
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;
