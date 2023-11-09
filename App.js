import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import PhotoDetailScreen from "./src/screens/PhotoDetailScreen/PhotoDetailScreen";
import ModalPhoto from "./src/components/ModalPhoto/index";
import GalleryProvider from "./src/context/GalleryContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AuthProvider, { AuthContext } from "./src/context/AuhContext";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import PerfilScreen from "./src/screens/PerfilScreen/PerfilScreen";

const Stack = createNativeStackNavigator();


const RenderStack = () => {

  const { user } = React.useContext(AuthContext)



  if (user == null)
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: "Inicia sesión",
          }}
        />
      </Stack.Navigator>

    )


  return (<Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "RockAI",
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

  </Stack.Navigator>)
}




export default function App() {
  return (
    <AuthProvider>
      <GalleryProvider>
        <NavigationContainer>
          <RenderStack></RenderStack>
        </NavigationContainer>
      </GalleryProvider>
    </AuthProvider>

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
