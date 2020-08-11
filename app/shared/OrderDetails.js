import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { serverAddress } from '../config';

export default function OrderDetailsModal({ selectedOrder, buttons, hideEventHandler }) {
    const orderId = selectedOrder.OrderId
    const [order, setOrder] = useState({});
    const [orderLines, setOrderLines] = useState([])
    const [loading, setLoading] = useState(true);

    // data fetch
    async function getOrderDetails() {
        let url = serverAddress + `/orderDetails/?orderid=${orderId}`
        let response = await fetch(url)
        let data = await response.json()
        console.log(data);
        setOrder(data);
        getOrderLines();
    }

    async function getOrderLines() {
        let url = serverAddress + `/orderLines/?orderid=${orderId}`
        let response = await fetch(url)
        let data = await response.json()
        console.log(data);
        setOrderLines(data);
        setLoading(false);
    }

    useEffect(() => {
        getOrderDetails();
    }, [])

    const OrderLinesView = () => {
        if (loading) {
            return ''
        } else {
            return (
                <View>
                    <FlatList
                        data={orderLines}
                        keyExtractor={item => item.LineNum.toString()}
                        renderItem={({ item }) => (
                            <Text style={styles.text}>{item.Item}, {item.Volume} {item.Unit};</Text>
                        )} />
                </View>
            )
        }
    }

    const orderDetails = [
        { key: 1, name: `Заказчик`, icon: 'person', content: order.Recepient },
        { key: 2, name: `Телефон`, icon: 'phone-android', content: order.RecepientPhone },
        { key: 3, name: `Адрес доставки`, icon: 'place', content: order.DeliveryAddress },
        { key: 4, name: `Время доставки`, icon: 'alarm', content: order.DeliveryTime },
        { key: 5, name: `Вес отправления`, icon: 'work', content: order.Weight + " кг" },
        { key: 6, name: `Тип доставки`, icon: 'pan-tool', content: order.DeliveryType },
        { key: 7, name: `Вид оплаты`, icon: 'payment', content: order.PaymentType },
        { key: 8, name: `Стоимость`, icon: 'attach-money', content: order.Price + " руб" },
        { key: 9, name: 'Содержимое', icon: 'shopping-cart', content: OrderLinesView },
        { key: 10, name: 'Комментарий', icon: 'comment', content: order.Comment }
    ]

    const OrderDetailsView = () => {
        if (loading) {
            return (<Text>Loading...</Text>)
        } else {
            return (
                <FlatList
                    data={orderDetails}
                    numColumns={2}
                    renderItem={({ item }) => {
                        const content = typeof (item.content) === 'function' ? < item.content /> : <Text style={styles.text}>{item.content}</Text>
                        return (
                            <View style={styles.card} >
                                <View style={styles.cardHeader}>
                                    < MaterialIcons name={item.icon} size={22} />
                                    <Text style={styles.cardHeaderText}>{item.name}: </Text>
                                </View>
                                {content}
                            </View>
                        )
                    }
                    } />
            )
        }
    }

    const ButtonsView = () => (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.leftButton} onPress={buttons[0].onPressEventHandler}>
                <Text style={styles.leftButtonText}>{buttons[0].title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton} onPress={buttons[1].onPressEventHandler}>
                <Text style={styles.rightButtonText}>{buttons[1].title}</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.canvas}>
            <View style={styles.background} onStartShouldSetResponder={hideEventHandler}></View>
            {loading && <ActivityIndicator color="#FF8217" size="large" />}
            {!loading && (
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerContainerText} > Заказ {order.OrderId}</Text>
                        <TouchableOpacity>
                            <MaterialIcons name='info' size={24} />
                        </TouchableOpacity>
                    </View>
                    < OrderDetailsView />
                    < ButtonsView />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    canvas: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.6
    },
    container: {
        backgroundColor: 'white',
        opacity: 1,
        borderRadius: 10
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 12
    },
    headerContainerText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    card: {
        margin: 8,
        width: '45%'
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    cardHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    text: {
        fontSize: 16,
        marginLeft: 30
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'center',
        margin: 8
    },
    leftButton: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 5,
        marginLeft: 8
    },
    leftButtonText: {
        color: '#F25D27',
        fontWeight: 'bold',
        fontSize: 18,
        paddingHorizontal: 12
    },
    rightButton: {
        backgroundColor: '#025159',
        padding: 8,
        borderRadius: 5,
        marginLeft: 8
    },
    rightButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        paddingHorizontal: 12
    }
})