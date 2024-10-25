import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Profile = ({ route }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Perfil de Usuario</Text>
            <Text>Nombre: {route.params?.user?.name || 'No disponible'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Profile;
