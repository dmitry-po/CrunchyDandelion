import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useQuery } from 'react-query';

import { serverAddress } from '../config';
import { FlatButton } from './Buttons';

const fetchData = async (key, orderId) => {
    const url = serverAddress + `/${key}/?orderid=${orderId}`
    const res = await fetch(url)
    return res.json()
}

const OrderLinesView = (data) => {
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={item => item.LineNum.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.text}>{item.Item}, {item.Volume} {item.Unit};</Text>
                )} />
        </View>
    )
}

const OrderDetailsView = ({ data }) => {
    return (
        <FlatList
            data={data}
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
            }} />
    )
}

export default function OrderDetailsModal({ selectedOrder, buttons, hideEventHandler }) {
    const orderId = selectedOrder.OrderId

    const orderDetailsData = useQuery(['orderDetails', orderId], fetchData);
    const orderLinesData = useQuery(['orderLines', orderId], fetchData);
    const loading = orderDetailsData.status === "loading";
    const order = orderDetailsData.data;

    const orderDetails = orderDetailsData.status === "success"
        ? [
            { key: 1, name: `Заказчик`, icon: 'person', content: orderDetailsData.data.Recepient },
            { key: 2, name: `Телефон`, icon: 'phone-android', content: orderDetailsData.data.RecepientPhone },
            { key: 3, name: `Адрес доставки`, icon: 'place', content: orderDetailsData.data.DeliveryAddress },
            { key: 4, name: `Время доставки`, icon: 'alarm', content: orderDetailsData.data.DeliveryTime },
            { key: 5, name: `Вес отправления`, icon: 'work', content: orderDetailsData.data.Weight + " кг" },
            { key: 6, name: `Тип доставки`, icon: 'pan-tool', content: orderDetailsData.data.DeliveryType },
            { key: 7, name: `Вид оплаты`, icon: 'payment', content: orderDetailsData.data.PaymentType },
            { key: 8, name: `Стоимость`, icon: 'attach-money', content: orderDetailsData.data.Price + " руб" },
            { key: 9, name: 'Содержимое', icon: 'shopping-cart', content: () => OrderLinesView(orderLinesData.data) },
            { key: 10, name: 'Комментарий', icon: 'comment', content: orderDetailsData.data.Comment }
        ]
        : []

    const ButtonsView = () => (
        <View style={styles.buttonContainer}>
            <FlatButton title={buttons[0].title} onPress={buttons[0].onPressEventHandler} buttonColor="#FFF" textColor="#F25D27" />
            <FlatButton title={buttons[1].title} onPress={buttons[1].onPressEventHandler} buttonColor="#025159" textColor="#FFF" />
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
                    </View>
                    < OrderDetailsView data={orderDetails} />
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
    }
})