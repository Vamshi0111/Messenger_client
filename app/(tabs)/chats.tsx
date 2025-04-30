import { useState, useEffect } from "react";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Animated, TouchableWithoutFeedback } from "react-native";
import { AntDesign, SimpleLineIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function Chats() {
    const [isTipVisible, setTipVisible] = useState(true);
    const [activeTab, setActiveTab] = useState('People');
    const [isSearchActive, setSearchActive] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [settingsTranslateX] = useState(new Animated.Value(300)); // Start position off-screen
    const [notificationSound, setNotificationSound] = useState(false);
    const [Notification, setNotification] = useState(false);
    const [pmOption, setPmOption] = useState('Everyone');

    const navigation = useNavigation();

    const handleShowPeople = () => {
        setActiveTab('People');
        setSettingsVisible(false); // Reset settings visibility
    };

    const handleShowGames = () => {
        setActiveTab('Games');
        setSettingsVisible(false); // Reset settings visibility
    };

    const handleSearch = () => {
        setSearchActive(true);
    };

    const handleCloseSearch = () => {
        setSearchActive(false);
    };

    const handleMenuPress = () => {
        navigation.navigate('Profile' as never);
    };

    const toggleNotificationSound = () => {
        setNotificationSound(!notificationSound);
    };

    const togglePushNotification = () => {
        setNotification(!Notification);
    };

    const handleSettingsPress = () => {
        if (activeTab === 'People') {
            setSettingsVisible(!settingsVisible);
        }
    };

    useEffect(() => {
        Animated.timing(settingsTranslateX, {
            toValue: settingsVisible ? 0 : 300,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [settingsVisible]);

    return (
        <TouchableWithoutFeedback onPress={() => settingsVisible && setSettingsVisible(false)}>
            <View style={styles.maincontainer}>
                <View style={styles.topmain}>
                    {isSearchActive ? (
                        <View style={styles.search}>
                            <Entypo name="menu" size={28} color="black" onPress={handleMenuPress} />
                            <TextInput placeholder="search messages..." style={styles.searchinput} />
                            <TouchableOpacity style={styles.searchbutton} onPress={handleCloseSearch}>
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
                                        activeTab === 'People' && styles.activeTab,
                                    ]}
                                    onPress={handleShowPeople}
                                >
                                    <Text
                                        style={[
                                            styles.tabText,
                                            activeTab === 'People' && styles.activeTabText,
                                        ]}
                                    >
                                        People
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.tab,
                                        activeTab === 'Games' && styles.activeTab,
                                    ]}
                                    onPress={handleShowGames}
                                >
                                    <Text
                                        style={[
                                            styles.tabText,
                                            activeTab === 'Games' && styles.activeTabText,
                                        ]}
                                    >
                                        Games
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <AntDesign name="search1" size={24} color="black" onPress={handleSearch} />
                            <TouchableOpacity onPress={handleSettingsPress}>
                                <Ionicons name="settings" size={24} color="black" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <View style={styles.subcontainer}>
                    {activeTab === 'Games' ? (
                        <View style={styles.myroomscontainer}>
                        </View>
                    ) : (
                        <>
                            {isTipVisible && (
                                <View style={styles.tipContainer}>
                                    <Text style={{ fontSize: 16, fontWeight: '700' }}>YOUR CONVERSATIONS</Text>
                                    <Text style={{ fontSize: 13, fontWeight: '500' }}>Showing messages from people</Text>
                                </View>
                            )}
                        </>
                    )}
                </View>
                {settingsVisible && activeTab === 'People' && (
                    <Animated.View
                        style={[
                            styles.settingsContainer,
                            { transform: [{ translateX: settingsTranslateX }] },
                        ]}
                    >
                        <Text style={styles.settingsText}>Settings</Text>
                        <View style={styles.settingItem}>
                            <TouchableOpacity onPress={toggleNotificationSound}>
                                <View style={[styles.toggleContainer, { backgroundColor: notificationSound ? '#4CAF50' : '#A487E7' }]}>
                                    <Animated.View
                                        style={[
                                            styles.toggle,
                                            {
                                                transform: [{ translateX: notificationSound ? 20 : 0 }],
                                            },
                                        ]}
                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.textcontainer}>Notification Sound</Text>
                        </View>
                        <View style={styles.settingItem}>
                            <TouchableOpacity onPress={togglePushNotification}>
                                <View style={[styles.toggleContainer, { backgroundColor: Notification ? '#4CAF50' : '#A487E7' }]}>
                                    <Animated.View
                                        style={[
                                            styles.toggle,
                                            {
                                                transform: [{ translateX: Notification ? 20 : 0 }],
                                            },
                                        ]}
                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.textcontainer}>Push Notification</Text>
                        </View>
                        <Text style={styles.pmcontainer}>Who can PM you</Text>
                        <View style={styles.secondcontainer}>
                            <TouchableOpacity onPress={() => setPmOption('Everyone')}>
                                <Ionicons
                                    name={pmOption === 'Everyone' ? "radio-button-on" : "radio-button-off"}
                                    size={24}
                                />
                            </TouchableOpacity>
                            <Text style={styles.textcontainer}>Everyone</Text>
                        </View>
                        <View style={styles.secondcontainer}>
                            <TouchableOpacity onPress={() => setPmOption('Only Friends')}>
                                <Ionicons
                                    name={pmOption === 'Only Friends' ? "radio-button-on" : "radio-button-off"}
                                    size={24}
                                />
                            </TouchableOpacity>
                            <Text style={styles.textcontainer}>Only Friends</Text>
                        </View>
                        <View style={styles.settingsActions}>
                            <TouchableOpacity onPress={() => setSettingsVisible(false)}>
                                <Text style={styles.textcontainer}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.textcontainers}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
    },
    topmain: {
        height: '12%',
        backgroundColor: '#A487E7',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: '2%',
    },
    search: {
        width: '100%',
        height: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchinput: {
        backgroundColor: 'white',
        height: '80%',
        borderRadius: 25,
        width: '60%',
        paddingLeft: '5%',
    },
    searchbutton: {
        backgroundColor: 'black',
        height: '85%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    middle: {
        width: '50%',
        height: '45%',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: '11%',
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
    subcontainer: {
        height: '100%',
        width: '100%',
        rowGap: 10,
        padding: '2%',
    },
    myroomscontainer: {
        flex: 1,
        height: '100%',
        rowGap: 13,
    },
    tipContainer: {
        flexDirection: 'column',
        rowGap: 10,
        marginBottom: 10,
    },
    textcontainers: {
        color: 'red',
    },
    textcontainer: {
        marginLeft: 10,
        // Add styles here if needed
    },
    settingsActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    secondcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    pmcontainer: {
        fontSize: 16,
        fontWeight: '700',
        paddingVertical: 10,
    },
    settingsContainer: {
        position: 'absolute',
        top: '12%',
        right:0,
        width: 250,
        backgroundColor: '#fff',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 10,
    },
    settingsText: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    toggleContainer: {
        width: 40,
        height: 22,
        borderRadius: 15,
        justifyContent: 'center',
        padding: 3,
        marginRight: 10,
    },
    toggle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
    },
});
