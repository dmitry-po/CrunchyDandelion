import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { serverAddress } from '../config';
import OrderDetailsModal from '../shared/OrderDetails';
import NavigationBar from '../shared/NavigationBar';
import OrdersView from '../shared/OrdersView';

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([])

    // popup -->
    const [showDetails, setShowDetails] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState('')
    const hidePopup = () => setShowDetails(false);
    const popupButtons = [
        { title: 'НАЗАД', onPressEventHandler: hidePopup },
        {
            title: selectedOrder.Paid === 0 ? 'ПОДТВЕРДИТЬ ОПЛАТУ' : 'ЗАВЕРШИТЬ',
            onPressEventHandler: () => {
                if (selectedOrder.Paid === 0) {
                    console.log('confirm payment')
                } else {
                    console.log('finish him')
                }
            }
        },
    ]
    // popup <--

    const orderOnPressHandler = (order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    }

    // data fetch
    async function getOrders() {
        let url = serverAddress + '/orders/'    // change to myOrders
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
                <Text style={styles.headerTitle}>Мои заказы</Text>
            </View>
            < OrdersView orders={orders} onPressHandler={orderOnPressHandler} />
            < NavigationBar />
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