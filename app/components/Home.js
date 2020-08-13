import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Picker, FlatList, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { serverAddress } from '../config';
import NavigationBar from '../shared/NavigationBar';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const AppWidth = SCREEN_WIDTH > 1000 ? 975 : SCREEN_WIDTH;
const numColumns = Math.floor(AppWidth / 200);

export default function HomePage({ navigation }) {
    // data
    const [shops, setShops] = useState([])
    const [selectedShop, setSelectedShops] = useState(shops[0])
    const [shifts, setShifts] = useState([])

    // data fetch
    async function getShops() {
        let url = serverAddress + '/channels/'
        let response = await fetch(url)
        let data = await response.json()
        console.log(data);
        setShops(data);
        selectShift(data[0].ChannelId);
    }
    async function getShifts(shopid) {
        let url = serverAddress + '/shifts/?channelid=' + shopid
        let response = await fetch(url)
        response = await response.json()
        setShifts(response);
    }

    useEffect(() => {
        getShops();
    }, [])

    const selectShift = (props) => {
        console.log('props: ', props);
        setSelectedShops(props);
        getShifts(props)
    }

    const shiftPressHandler = () => {
        navigation.navigate("Заказы");
    }

    const ShopsPicker = () => (
        <View style={styles.dropdownListContainer}>
            <Picker
                selectedValue={selectedShop}
                style={styles.dropdownList}
                onValueChange={(itemValue) => selectShift(itemValue)}>
                {shops.map(item => (<Picker.Item key={item.ChannelId} label={item.ChannelAddress} value={item.ChannelId} />))}
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
                        onPress={shiftPressHandler}>
                        < MaterialIcons name="access-time" size={24} />
                        <Text style={styles.cardText}> {item.ShiftTime}
                        </Text>
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
        borderRadius: 6
    },
    dropdownListContainer: {
        borderWidth: 1,
        borderColor: '#A1A2A6',
        justifyContent: 'center',
        margin: 8,
        borderRadius: 6,
        fontSize: 18,
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