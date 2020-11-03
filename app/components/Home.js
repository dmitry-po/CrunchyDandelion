import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Picker, FlatList, Dimensions, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { serverAddress } from '../config';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const AppWidth = SCREEN_WIDTH > 1000 ? 975 : SCREEN_WIDTH;
const numColumns = Math.floor(AppWidth / 200);

export default function HomePage({ navigation }) {
    // data
    const [shops, setShops] = useState([])
    const [selectedShop, setSelectedShop] = useState({ChannelId:''})
    const [shifts, setShifts] = useState([])

    // data fetch
    useEffect(() => {
        fetch(serverAddress + '/channels/')
        .then(responce => responce.json())
        .then(data => {
            setShops(data);
            setSelectedShop(data[0]);
        })
    }, [])

    useEffect(() => {
        const shopId = selectedShop['ChannelId']
        fetch(serverAddress + '/shifts/?channelid=' + shopId)
        .then(responce => responce.json())
        .then(data => setShifts(data))
    }, [selectedShop])

    const updateShifts = (shop) => {
        setSelectedShop(shops.filter(item => item['ChannelId'] == shop)[0]);
    }

    const shiftPressHandler = (shift) => {
        navigation.navigate("Заказы", {shop: selectedShop, shift});
    }

    const ShopsPicker = () => (
        <View style={styles.dropdownListContainer}>
            <Picker
                selectedValue={selectedShop['ChannelId']}
                style={styles.dropdownList}
                onValueChange={(itemValue) => updateShifts(itemValue)}>
                {shops.map(item => (<Picker.Item key={item['ChannelId']} label={item['ChannelAddress']} value={item['ChannelId']} />))}
            </Picker>
        </View>
    )

    const ShiftsView = () => (
        <FlatList
            data={shifts}
            numColumns={numColumns}
            keyExtractor={(item) => item.ShiftId.toString()}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.card}
                        onPress={ () => shiftPressHandler(item) }>
                        < MaterialIcons name="access-time" size={24} />
                        <Text style={styles.cardText}> {item.ShiftTime}</Text>
                    </TouchableOpacity>

                )
            }}
        />
    )

    // layout
    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Смены</Text>
            </View>
            < ShopsPicker />
            < ShiftsView />
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
    dropdownList: {
        height: 60,
        padding: 0,
        borderWidth: 0,
        borderRadius: 6,
        //fontSize: 18,
    },
    dropdownListContainer: {
        borderWidth: 1,
        borderColor: '#A1A2A6',
        justifyContent: 'center',
        margin: 8,
        borderRadius: 6,
        borderWidth: 1,
        paddingHorizontal: 0
    },
    card: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        elevation: 1,
        flex: 1,
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        margin: 8,
        marginTop: 0,
        borderColor: '#A1A2A6',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardText: {
        fontSize: 18,
        padding: 5,
        //margin:5,
        justifyContent: 'center'
    }
})