import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const useStyles = () => {
    const { colors } = useTheme();

    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 20,
            backgroundColor: colors.background,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
        },
        input: {
            height: 50,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 15,
        },
        registerLink: {
            marginTop: 15,
            textAlign: 'center',
            color: colors.accent,
        },
    });
};

export default useStyles;