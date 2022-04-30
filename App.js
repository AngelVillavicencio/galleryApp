import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import PhotoDetailScreen from "./src/screens/PhotoDetailScreen/PhotoDetailScreen";
import ModalPhoto from "./src/components/ModalPhoto/index";
import GalleryProvider from "./src/context/GalleryContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GalleryProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "My Pics",
              headerRight: () => (
                <ModalPhoto>
                  <FontAwesome
                    name="camera"
                    size={20}
                    color="#3b5998"
                  ></FontAwesome>
                </ModalPhoto>
              ),
            }}
          />
          <Stack.Screen
            name="DetailPhoto"
            component={PhotoDetailScreen}
            options={{
              title: "Image",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GalleryProvider>
  );
}
/*
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "My Pics",
        headerRight: () => (
          <ModalPhoto>
            <FontAwesome name="camera" size={20} color="#3b5998"></FontAwesome>
          </ModalPhoto>
        ),
      }}
    />
    <Stack.Screen
      name="DetailPhoto"
      component={PhotoDetailScreen}
      options={{
        title: "Image",
      }}
    />
  </Stack.Navigator>
</NavigationContainer>;
*/
