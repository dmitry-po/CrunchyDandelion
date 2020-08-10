import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { serverAddress } from '../config';
import OrderDetailsModal from '../shared/OrderDetails';
import NavigationBar from '../shared/NavigationBar';

export default function OpenOrdersPage() {
    const [orders, setOrders] = useState([])

    // popup -->
    const [showDetails, setShowDetails] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState('')
    const hidePopup = () => setShowDetails(false);
    const popupButtons = [
        { title: 'НАЗАД', onPressEventHandler: hidePopup },
        { title: 'ВЗЯТЬ', onPressEventHandler: () => console.log('take') },
    ]
    // popup <--

    const orderOnPresshandler = (orderId) => {
        setSelectedOrder(orderId);
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

    const OrdersView = ({ orders }) => {
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
                            onPress={() => orderOnPresshandler(item.OrderId)}>
                            <Text style={styles.cardHeader}>Заказ {item.OrderId}</Text>
                            <Text style={styles.cardText}>{item.DeliveryAddress}</Text>
                            <Text style={styles.cardText}>{'Ожидаемое время доставки: ' + item.DeliveryTime.slice(11, 16)}</Text>
                        </TouchableOpacity>

                    )
                }}
            />
        )
    }

    // layout
    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Открытые заказы</Text>
            </View>
            < OrdersView orders={orders} />
            < NavigationBar />
            {showDetails && < OrderDetailsModal orderId={selectedOrder} buttons={popupButtons} hideEventHandler={hidePopup} />}
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