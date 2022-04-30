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

  return (
    <GalleryContext.Provider
      value={{
        listGallery: listGallery,
        addImageInList: addImageInList,
        deleteImageInList: deleteImageInList,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;
