import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { serverAddress } from '../config';
import OrderDetailsModal from '../shared/OrderDetails';
import OrdersView from '../shared/OrdersView';
import { AuthContext } from '../context/AuthContext';

export default function OpenOrdersPage( { route } ) {
    // popup -->
    const [showDetails, setShowDetails] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState('')
    const [orders, setOrders] = useState([])
    const { userName } = useContext(AuthContext);

    const { shop, shift } = typeof(route.params) === 'undefined' ? {shop:'', shift:''} : route.params;

    const hidePopup = () => setShowDetails(false);
    const takeOrder = () => {
        console.log(`take order ${selectedOrder['OrderId']}`)
    }

    const popupButtons = [
        { title: 'Назад', onPressEventHandler: hidePopup },
        { title: 'Взять', onPressEventHandler: takeOrder },
    ]
    // popup <--

    const orderOnPressHandler = (order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    }

    useEffect(() => {
        fetch(serverAddress + `/orders/?channelid=${shop['ChannelId']}&shiftid=${shift['ShiftId']}`)
        .then(responce => responce.json())
        .then(data => setOrders(data))
    }, [shop, shift])

    // layout
    const NoOrdersView = () => (
        <View style={styles.noOrdersView}>
            { shop === '' ? 
                (<Text style={styles.noOrdersText}>Не выбраны магазин и/или смена</Text>) : 
                (<Text style={styles.noOrdersText}>Нет доступных заказов</Text>) }
        </View>
    )

    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Доступные заказы</Text>
            </View>
            <Text>Доступные заказы магазина {shop['ChannelId']} ({shop['ChannelAddress']}) для смены {shift['ShiftTime']}:</Text>
            { orders.length === 0 ? (<NoOrdersView/>) : (< OrdersView orders={orders} onPressHandler={orderOnPressHandler} />)}
            {showDetails && < OrderDetailsModal selectedOrder={selectedOrder} buttons={popupButtons} hideEventHandler={hidePopup} />}
        </View>
    )
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
    noOrdersView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    noOrdersText: {
        fontSize: 16
    }
})