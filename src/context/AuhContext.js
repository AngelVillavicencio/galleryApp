import React, { createContext, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { AsyncStorage } from 'react-native';

import auth, { iniciarSesion } from '../firebase/authFirebase'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);



    useEffect(() => {

        AsyncStorage.getItem('user')
            .then(value => {
                console.log(value)
                if (value !== null) {
                    // Haz algo con el valor recuperado
                    const parseUser = JSON.parse(value)
                    setUser(parseUser)
                } else {
                    // La clave no existe en la caché
                    setUser(null)
                }
            })
            .catch(error => {
                // Ocurrió un error al recuperar los datos
                setUser(null)

            });

    }, [])


    return (
        <AuthContext.Provider
            value={{
                user: user,
                setUser: setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
