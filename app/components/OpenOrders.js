import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from 'react-query';

import { serverAddress } from '../config';
import OrderDetailsModal from '../shared/OrderDetails';
import OrdersView from '../shared/OrdersView';

const fetchOrders = async () => {
    const url = serverAddress + '/orders/'
    const res = await fetch(url)
    return res.json()
}

export default function OpenOrdersPage() {
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

    const { data, status } = useQuery('openOrders', fetchOrders);

    // layout
    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Открытые заказы</Text>
            </View>
            < OrdersView orders={data} onPressHandler={orderOnPressHandler} />
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