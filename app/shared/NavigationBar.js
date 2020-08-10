import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function NavigationBar() {
    const gotoShifts = () => {console.log('Navi.Shifts')}
    const gotoOrders = () => {console.log('Navi.Orders')}
    const gotoMyOrders = () => {console.log('Navi.MyOrders')}

    return (
        <View style={styles.navigationBar} >
            <TouchableOpacity onPress={gotoShifts} style={styles.navigationButtons}>
                <MaterialIcons name='date-range' color='#fff' size={24} />
                <Text style={styles.navigationTitles}>Смены</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoOrders} style={styles.navigationButtons}>
                <MaterialIcons name='format-list-numbered' color='#fff' size={24} />
                <Text style={styles.navigationTitles}>Заказы</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoMyOrders} style={styles.navigationButtons}>
                <MaterialIcons name='shopping-cart' color='#fff' size={24} />
                <Text style={styles.navigationTitles}>Мои заказы</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'black',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        height: 48,
        width: '100%'
    },
    navigationButtons: {
        padding: 8,
        alignItems: 'center',
        flex: 1
    },
    navigationTitles: {
        color: '#fff',
        fontSize: 10
    }
})