import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage } from 'react-native';
import { AuthContext } from '../../context/AuhContext';


function PerfilScreen() {
    // Aquí puedes obtener el correo electrónico del usuario desde tu estado o contexto de autenticación
    const { user, setUser } = useContext(AuthContext)
    const handleLogout = () => {

        AsyncStorage.setItem('user', "")
            .then(() => {
                // Los datos se han guardado exitosamente
                setUser(null)
            })
            .catch(error => {
                // Ocurrió un error al guardar los datos
            });



    };

    return (
        <View style={styles.container}>
            <Text>Correo Electrónico: {user?.email}</Text>
            <Button title="Cerrar Sesión" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PerfilScreen;
