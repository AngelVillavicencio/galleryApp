import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, StyleSheet, AsyncStorage } from 'react-native';

import { AuthContext } from '../../context/AuhContext';
import { iniciarSesion } from '../../firebase/authFirebase';

function LoginScreen() {
    const { user, login, setUser } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email && password) {
            // Realiza aquí la lógica de inicio de sesión con los valores de email y contraseña
            // Por ejemplo, puedes enviar los datos a un servidor para autenticar al usuario.
            // Si la autenticación es exitosa, puedes navegar a otra pantalla.

            // Ejemplo de mensaje de éxito:

            console.log(email, password);


            await iniciarSesion(email, password).then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const user_str = JSON.stringify(user)
                console.log(user);



                AsyncStorage.setItem('user', user_str)
                    .then(() => {
                        // Los datos se han guardado exitosamente
                        setUser(user)
                        Alert.alert('Inicio de sesión exitoso');
                    })
                    .catch(error => {
                        // Ocurrió un error al guardar los datos
                        Alert.alert('no funciona el storage cache');

                    });


                // ...
            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
            });

        } else {
            Alert.alert('Por favor, ingresa el correo electrónico y la contraseña');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Image source={require('../../../assets/roca_logo.png')} style={styles.logo} />

                <Text style={styles.label}>Correo:</Text>
                <TextInput
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />

                <Text style={styles.label}>Contraseña:</Text>
                <TextInput
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                />
                <Button title="Iniciar Sesión" onPress={handleLogin} />

            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    logo: {
        width: 150, // Ajusta el tamaño de la imagen según tus necesidades
        height: 150, // Ajusta el tamaño de la imagen según tus necesidades
    }, input: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        alignItems: 'center',
    }, label: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    }
});

export default LoginScreen;
