import React, { useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { useTheme } from 'react-native-paper';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

const Login = ({ navigation }) => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: '804528848383-qbdjt45qe64k6hlqdrrd9g8lspn7jj1a.apps.googleusercontent.com',
            scopes: ['openid', 'profile', 'email'],
            redirectUri: makeRedirectUri({
                scheme: 'miapp'
            }),
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            console.log('Autenticación exitosa:', authentication);
            handleServerAuthentication(authentication.accessToken);
        } else if (response?.type === 'error') {
            console.error('Error en la autenticación:', response.error);
            alert('Error en la autenticación con Google: ' + response.error.message);
        }
    }, [response]);

    const handleServerAuthentication = (accessToken) => {
        console.log('Enviando token al servidor:', accessToken);
        axios.post('http://192.168.1.39/google-login.php', {
            access_token: accessToken
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Respuesta del servidor:', response.data);
            if (response.data.success) {
                console.log('Navegando a Profile con datos:', response.data.user);
                navigation.navigate('Profile', { user: response.data.user });
            } else {
                alert('Error en el login con Google: ' + response.data.message);
            }
        })
        .catch(error => {
            console.error('Error al enviar token al servidor:', error);
            alert('Error en la conexión: ' + (error.response ? error.response.data.message : error.message));
        });
    };

    const handleGoogleLogin = () => {
        promptAsync();
    };

    const handleLogin = () => {
        axios.post('http://192.168.1.39/login.php', {
            username,
            email,
            password,
        })
        .then(response => {
            if (response.data.success) {
                navigation.navigate('Bienvenido');
            } else {
                alert('Error en el login: ' + response.data.message);
            }
        })
        .catch(error => {
            console.error(error);
            alert('Error en la conexión: ' + error.message);
        });
    };

    return (
        <View>
            <Text>Iniciar Sesión</Text>
            <TextInput placeholder="Usuario" onChangeText={setUsername} />
            <TextInput placeholder="Email" onChangeText={setEmail} keyboardType="email-address" />
            <TextInput placeholder="Contraseña" onChangeText={setPassword} secureTextEntry />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
            
            <Button
                disabled={!request}
                title="Iniciar Sesión con Google"
                onPress={handleGoogleLogin}
            />
            
            <Text onPress={() => navigation.navigate('Register')}>
                Regristrarse
            </Text>
        </View>
    );
};

export default Login;
