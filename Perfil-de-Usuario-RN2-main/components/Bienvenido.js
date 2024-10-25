import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bienvenido = ({ route }) => {
    const { user } = route.params || {};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Bienvenido!</Text>
            {user && <Text style={styles.text}>Hola, {user.name || 'Usuario'}</Text>}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
    },
});

export default Bienvenido;
