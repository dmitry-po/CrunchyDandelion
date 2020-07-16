import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Picker, FlatList, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const AppWidth = SCREEN_WIDTH > 1000 ? 975 : SCREEN_WIDTH;
const numColumns = Math.floor(AppWidth / 200);

export default function OpenOrdersPage() {
    // data
    const [orders, setOrders] = useState([])

    // data fetch
    async function getOrders() {
        let url = 'http://192.168.0.102:3000/orders/'
        let response = await fetch(url)
        let data = await response.json()
        setOrders(data);
    }

    useEffect(() => {
        getOrders();
    }, [])

    // navigation
    const openShifts = () => { }
    const openAllOrders = () => { }
    const openMyOrders = () => { }

    // layout
    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Открытые заказы</Text>
            </View>
            <FlatList
                data={orders}
                numColumns={1}
                keyExtractor={(item) => item.OrderId.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.card}>
                            <Text style={styles.cardHeader}>Заказ {item.OrderId}</Text>
                            {/*<Text style={{...styles.cardText, fontWeight:'bold'}}>Адрес доставки:</Text>*/}

                            <Text style={styles.cardText}>{item.DeliveryAddress}</Text>
                            <Text style={styles.cardText}>{item.DeliveryTime.slice(11, 16)}</Text>
                        </TouchableOpacity>

                    )
                }}
            />
            <View style={styles.navigationBar} >
                <TouchableOpacity onPress={openShifts} style={styles.navigationButtons}>
                    <MaterialIcons name='date-range' color='#fff' size={24} />
                    <Text style={styles.navigationTitles}>Смены</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openShifts} style={styles.navigationButtons}>
                    <MaterialIcons name='format-list-numbered' color='#fff' size={24} />
                    <Text style={styles.navigationTitles}>Заказы</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openShifts} style={styles.navigationButtons}>
                    <MaterialIcons name='shopping-cart' color='#fff' size={24} />
                    <Text style={styles.navigationTitles}>Мои заказы</Text>
                </TouchableOpacity>
            </View>
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
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'black',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        height: 48,
        width: '100%'
    },
    navigationButtons: {
        padding: 8,
        alignItems: 'center',
        flex: 1
    },
    navigationTitles: {
        color: '#fff',
        fontSize: 10
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