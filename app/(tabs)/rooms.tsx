import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, useWindowDimensions, ScrollView } from "react-native";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { fetchRoomData } from "../api-request/RoomsScreen";

export default function Rooms() {
    const [isTipVisible, setTipVisible] = useState(true);
    const [activeTab, setActiveTab] = useState('AllRooms');
    const [showSearch, setShowSearch] = useState(false);
    const [rooms, setRooms] = useState([]);

    const navigation = useNavigation();
    const { width } = useWindowDimensions();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchRoomData();
                setRooms(response.data);
            } catch (error) {
                console.log('Error fetching rooms');
            }
        };
        fetchData();
    }, []);

    const handleHideTip = () => {
        setTipVisible(false);
    };

    const handleShowMyRooms = () => {
        setActiveTab('MyRooms');
    };

    const handleShowAllRooms = () => {
        setActiveTab('AllRooms');
    };

    const toggleSearch = () => {
        setShowSearch(true);
    };

    const handleCloseSearch = () => {
        setShowSearch(false);
    };

    const handleMenuPress = () => {
        navigation.navigate('Profile' as never);
    };

    const handleChatRoom = () => {
        navigation.navigate('Createroom' as never);
    };

    const isSmallScreen = width < 360;

    return (
        <View style={styles.mainContainer}>
            <View style={[styles.topMain, isSmallScreen && styles.topMainSmall]}>
                {showSearch ? (
                    <View style={styles.search}>
                        <Entypo name="menu" size={28} color="black" onPress={handleMenuPress} />
                        <TextInput placeholder="Search rooms...." style={styles.searchInput} />
                        <TouchableOpacity style={styles.searchButton} onPress={handleCloseSearch}>
                            <Text style={{ color: 'white' }}>X  Close</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <Entypo name="menu" size={28} color={'black'} onPress={handleMenuPress} />
                        <View style={styles.middle}>
                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    activeTab === 'AllRooms' && styles.activeTab,
                                ]}
                                onPress={handleShowAllRooms}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === 'AllRooms' && styles.activeTabText,
                                    ]}
                                >
                                    All Rooms
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    activeTab === 'MyRooms' && styles.activeTab,
                                ]}
                                onPress={handleShowMyRooms}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === 'MyRooms' && styles.activeTabText,
                                    ]}
                                >
                                    My Rooms
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={toggleSearch}>
                            <AntDesign name="search1" size={24} color="black" />
                        </TouchableOpacity>
                    </>
                )}
            </View>
            <View style={styles.subContainer}>
                {activeTab === 'MyRooms' ? (
                    <View style={styles.myRoomsContainer}>
                        <Text style={{ fontSize: 18, fontWeight: '700' }}>Your Rooms</Text>
                        <TouchableOpacity style={{ backgroundColor: 'black', height: '5%', width: '50%', borderRadius: 26, justifyContent: 'center', alignItems: 'center' }} onPress={handleChatRoom}>
                            <Text style={{ color: 'white' }}>CREATE CHAT ROOM</Text>
                        </TouchableOpacity>
                        <Text>You have not created any chat room.</Text>
                    </View>
                ) : (
                    <>
                        {isTipVisible && (
                            <View style={styles.tipContainer}>
                                <View style={styles.tipTextContainer}>
                                    <AntDesign name="infocirlceo" size={18} color="black" />
                                    <Text style={styles.tipText}>Tip: All your groups will appear here you can chat anytime</Text>
                                </View>
                                <TouchableOpacity style={styles.hideButton} onPress={handleHideTip}>
                                    <Text style={styles.hideButtonText}>Hide</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={styles.featuredContainer}>
                            <Text>Group Chat - Featured</Text>
                            <AntDesign name="pluscircle" size={24} color="black" />
                        </View>

                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '700' }}>My Room List</Text>
                            <ScrollView style={{flexDirection:'column', width:'100%', alignContent:"center"}}>
                            {rooms?.map((room:any) => (
                                <TouchableOpacity key={room.id}>
                                    <View style={styles.roomcard}>
                                        <View style={{flexDirection:'row', justifyContent:'flex-start', width:'100%'}}>
                                        <Text style={{fontWeight:'600'}}>Room ID: </Text>
                                        <Text>{room.room_id}</Text>
                                        </View>
                                    
                                    <View style={{flexDirection:'row',justifyContent:'flex-start',width:'100%'}}>
                                    <Text style={{fontWeight:'600'}}>Room Name: </Text>
                                    <Text>{room.room_name}</Text>
                                    </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                            </ScrollView>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    topMain: {
        height: '12%',
        backgroundColor: '#A487E7',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: '2%',
        paddingRight: '4%',
    },
    topMainSmall: {
        height: '15%', // Adjust as necessary for smaller screens
    },
    search: {
        width: '100%',
        height: "60%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchInput: {
        backgroundColor: 'white',
        height: '80%',
        borderRadius: 25,
        width: '60%',
        paddingLeft: '5%',
    },
    searchButton: {
        backgroundColor: 'black',
        height: '85%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    middle: {
        width: '60%',
        height: '45%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tab: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    activeTab: {
        backgroundColor: '#7B55D3',
    },
    tabText: {
        fontWeight: '500',
        fontSize: 18,
        color: 'black',
    },
    activeTabText: {
        color: 'white',
    },
    subContainer: {
        height: '100%',
        width: '100%',
        rowGap: 10,
        padding: '2%',
    },
    myRoomsContainer: {
        flex: 1,
        height: '100%',
        rowGap: 13
    },
    tipContainer: {
        flexDirection: 'column',
        rowGap: 10,
        paddingRight:'4%',
        marginBottom: 10,
    },
    tipTextContainer: {
        flexDirection: 'row',
        columnGap: 5,
    },
    tipText: {
        fontWeight: '500',
        fontSize: 13,
    },
    hideButton: {
        backgroundColor: 'black',
        height: 30,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    hideButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    featuredContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    roomcard:{
        width: '90%',
        height: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection:'column',
      
    },
});
