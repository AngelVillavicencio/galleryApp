import React, { createContext, useState } from "react";
import uuid from "react-native-uuid";
export const GalleryContext = createContext();

const GalleryProvider = ({ children }) => {
  const [listGallery, setListGallery] = useState([]);

  const addImageInList = (photo) => {
    const newPhoto = { ...photo, id: uuid.v4(), isFavorite: false };
    setListGallery([...listGallery, newPhoto]);
  };

  const deleteImageInList = (id) => {
    const newList = listGallery.filter((photo) => photo.id != id);
    setListGallery(newList);
  };

  const switchFavorite = (id, isFavorite) => {
    const list = listGallery.map((photo) =>
      photo.id == id ? { ...photo, isFavorite: !isFavorite } : photo
    );
    setListGallery(list);
  };

  return (
    <GalleryContext.Provider
      value={{
        listGallery: listGallery,
        addImageInList: addImageInList,
        deleteImageInList: deleteImageInList,
        switchFavorite: switchFavorite,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;
