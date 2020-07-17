import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export default function OrderDetails() {
    const orderId = 1
    const [order, setOrder] = useState({})
    const orderLines = [{ lineNum: 1, content: 'Горошек', volume: '1', unit: 'кг' },
    { lineNum: 2, content: 'Кукуруза', volume: '3', unit: 'шт' }]

    // data fetch
    async function getOrderDetails() {
        let url = `http://192.168.0.102:3000/orderDetails/?orderid=${orderId}`
        let response = await fetch(url)
        let data = await response.json()
        console.log(data);
        setOrder(data);
    }

    useEffect(() => {
        getOrderDetails();
    }, [])

    const details = [
        { key: 1, name: `Заказчик`, icon: 'person', content: order.Recepient },
        { key: 2, name: `Телефон`, icon: 'phone-android', content: order.RecepientPhone },
        { key: 3, name: `Адрес доставки`, icon: 'home', content: order.DeliveryAddress },
        { key: 4, name: `Вес отправления`, icon: 'work', content: order.Weight }
    ]
    console.log('dets: ', details)

    return (
        <View style={styles.page}>
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Заказ {order.OrderId}</Text>
                </View>

                <FlatList
                    data={details}
                    renderItem={({ item }) =>
                        (
                            <View style={{ margin: 8, marginBottom: 0 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    < MaterialIcons name={item.icon} size={22} />
                                    <Text style={styles.subHeader}>{item.name}: </Text>
                                </View>
                                <Text style={styles.text}>{item.content}</Text>
                            </View>
                        )
                    } />

                <View style={{ margin: 8, marginBottom: 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        < MaterialIcons name='shopping-cart' size={22} />
                        <Text style={styles.subHeader}>Содержимое:</Text>
                    </View>
                    <FlatList
                        data={orderLines}
                        keyExtractor={item => item.lineNum.toString()}
                        style={{ marginTop: 8 }}
                        renderItem={({ item }) => (
                            <Text style={styles.text}>{item.content}, {item.volume} {item.unit};</Text>
                        )} />
                </View>
            </View>

            <View style={{ alignSelf: 'flex-end', flexDirection: 'row', paddingTop: 10, justifyContent: 'center', margin: 8 }}>
                <TouchableOpacity
                    style={{ backgroundColor: 'white', padding: 8, borderRadius: 5, marginLeft: 8 }}>
                    <Text style={{ color: '#F25D27', fontWeight: 'bold', fontSize: 18, paddingHorizontal: 12 }}>НАЗАД</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: '#025159', padding: 8, borderRadius: 5, marginLeft: 8 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, paddingHorizontal: 12 }}>ВЗЯТЬ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fafafa'
        //width:800,
        //alignSelf:'center'
    },
    header: {
        backgroundColor: '#163147',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        color: '#ffffff',
        //fontWeight:'bold',
        fontSize: 20
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    itemButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    text: {
        fontSize: 16,
        marginLeft: 5
    }
})