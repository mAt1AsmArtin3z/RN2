import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import useStyles from './styles';

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const styles = useStyles();

    const handleRegister = () => {
        axios.post('http://192.168.1.39/register.php', {
            username,
            email,
            password,
        })
        .then(response => {
            if (response.data.success) {
                alert('Registro exitoso');
                navigation.navigate('Login');
            } else {
                alert('Error en el registro: ' + response.data.message);
            }
        })
        .catch(error => {
            console.error(error);
            alert('Error en la conexión: ' + error.message);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Usuario" 
                onChangeText={setUsername} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Email" 
                onChangeText={setEmail} 
                keyboardType="email-address" 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Contraseña" 
                onChangeText={setPassword} 
                secureTextEntry 
            />
            <Button title="Registrarse" onPress={handleRegister} />
        </View>
    );
};

export default Register;