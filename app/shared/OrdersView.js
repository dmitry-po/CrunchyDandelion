import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function OrdersView({ orders, onPressHandler }) {
    return (
        <FlatList
            data={orders}
            numColumns={1}
            keyExtractor={(item) => item.OrderId.toString()}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.card}
                        onPress={() => onPressHandler(item)}>
                        <Text style={styles.cardHeader}>Заказ {item.OrderId}</Text>
                        <Text style={styles.cardText}>{item.DeliveryAddress}</Text>
                        <Text style={styles.cardText}>{'Ожидаемое время доставки: ' + item.DeliveryTime.slice(11, 16)}</Text>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        elevation: 1,
        flex: 1,
        //height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        margin: 8,
        marginBottom: 0,
        padding: 8,
        borderColor: '#A1A2A6',
        borderWidth: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    cardHeader: {
        fontSize: 18,
        paddingBottom: 4,
        //paddingLeft: 24,
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    cardText: {
        fontSize: 16,
        paddingBottom: 4,
        paddingRight: 8,
        //margin:5,
        justifyContent: 'center'
    }
})