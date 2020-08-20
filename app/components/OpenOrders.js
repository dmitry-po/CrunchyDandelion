import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from 'react-query';

import { serverAddress } from '../config';
import OrderDetailsModal from '../shared/OrderDetails';
import OrdersView from '../shared/OrdersView';

export default function OpenOrdersPage() {
    const [orders, setOrders] = useState([])

    // popup -->
    const [showDetails, setShowDetails] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState('')
    const hidePopup = () => setShowDetails(false);
    const popupButtons = [
        { title: 'Назад', onPressEventHandler: hidePopup },
        { title: 'Взять', onPressEventHandler: () => console.log('take') },
    ]
    // popup <--

    const orderOnPressHandler = (order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    }

    // data fetch
    async function getOrders() {
        let url = serverAddress + '/orders/'
        let response = await fetch(url)
        let data = await response.json()
        setOrders(data);
    }

    useEffect(() => {
        getOrders();
    }, [])

    // layout
    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Открытые заказы</Text>
            </View>
            < OrdersView orders={orders} onPressHandler={orderOnPressHandler} />
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
    }
})