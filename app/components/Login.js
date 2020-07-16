import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginPage() {
    const logingButton = () => { }
    const forgetPasswordButton = () => { }

    return (
        <View style={styles.container}>
            <View style={styles.bg} >
                <View style={styles.bgUpper}></View>
            </View>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.textInputContainer}>
                        {/*<MaterialIcons name='person' size={32} />*/}
                        <TextInput style={styles.textInput} placeholder='Введите логин' />
                    </View>
                    <View style={styles.textInputContainer}>
                        {/*<MaterialIcons name='lock' size={32} />*/}
                        <TextInput style={styles.textInput} placeholder='Введите пароль' secureTextEntry={true} />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={logingButton}>
                        <Text style={styles.buttonText} >ВОЙТИ</Text>
                    </TouchableOpacity>
                    <Text onPress={forgetPasswordButton} style={styles.forgetPasswordButton}>Забыли пароль?</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bg: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#fafafa'
    },
    bgUpper: {
        backgroundColor: '#163147',
        height: '50%',
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 3,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 24
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 24
    },
    textInput: {
        height: 45,
        width: 300,
        borderWidth: 1,
        borderColor: '#A1A2A6',
        backgroundColor: '#FAFAFA',
        padding: 8,
        borderRadius: 6,
        fontSize: 18
        //marginLeft: 24
    },
    button: {
        width: 300,
        height: 45,
        backgroundColor: '#FF8217',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        borderRadius: 6
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18
    },
    forgetPasswordButton: {
        marginTop: 8,
        color: "#064578",
        fontSize: 14
    }
})