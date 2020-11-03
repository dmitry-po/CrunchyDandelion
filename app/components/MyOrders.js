import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { serverAddress } from '../config';
import OrderDetailsModal from '../shared/OrderDetails';
import OrdersView from '../shared/OrdersView';
import { AuthContext } from '../context/AuthContext';

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([])
    const { userName } = useContext(AuthContext);

    // popup -->
    const [showDetails, setShowDetails] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState('')
    const hidePopup = () => setShowDetails(false);
    const popupButtons = [
        { title: 'Назад', onPressEventHandler: hidePopup },
        {
            title: selectedOrder.Paid === 0 ? 'Подтвердить оплату' : 'Завершить',
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

    useEffect(() => {
        fetch(serverAddress + `/orders/?carrierid=${userName}`)   // change to myOrders
        .then(responce => responce.json())
        .then(data => setOrders(data))
    }, [])

    // layout
    const NoOrdersView = () => (
        <View style={styles.noOrdersView}>
            <Text style={styles.noOrdersText}>У Вас нет назначенных заказов</Text>
        </View>
    )

    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Мои заказы</Text>
            </View>
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