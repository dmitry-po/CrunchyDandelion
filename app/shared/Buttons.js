import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const FlatButton = ({ title = "Press", buttonColor = "#000", textColor = "#fff", onPress = () => { }, style = {} }) => {
    const buttonStyle = {
        ...styles.button,
        backgroundColor: buttonColor,
        ...style
    }
    return (
        <TouchableOpacity style={{
            ...styles.button,
            backgroundColor: buttonColor,
            ...style
        }}
            onPress={onPress}>
            <Text style={{
                ...styles.text,
                color: textColor
            }} > {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = {
    button: {
        padding: 8,
        borderRadius: 5,
        //marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingHorizontal: 12,
        textTransform: 'uppercase',
    }
}