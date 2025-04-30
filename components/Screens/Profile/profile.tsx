import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Animated, Easing, TextInput } from "react-native";
import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function Profile() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
    const [shareModalVisible, setShareModalVisible] = useState<boolean>(false);
    const [switchModalVisible, setSwitchModalVisible] = useState<boolean>(false);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false); // New state for edit modal
    const logoutSlideAnim = useRef(new Animated.Value(-300)).current;
    const shareSlideAnim = useRef(new Animated.Value(-300)).current;
    const switchSlideAnim = useRef(new Animated.Value(-300)).current;
    const editSlideAnim = useRef(new Animated.Value(-300)).current; // New animation for edit modal

    const handleBack = () => {
        navigation.goBack();
    };

    const handlevip = () => {
        navigation.navigate('Vip' as never);
    };

    const handleAddAccount = () => {
        navigation.navigate('Login' as never);
    };

    const handleProfile = () =>{
        navigation.navigate('ProfileScreens' as never);
    };

    const handleAbout = () =>{
        navigation.navigate('About' as never);
    };
    const handlelogout = () =>{
        navigation.navigate('Postlogout')
    }

    const handleLogoutPress = () => {
        setLogoutModalVisible(true);
        Animated.timing(logoutSlideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const handleCloseLogoutModal = () => {
        Animated.timing(logoutSlideAnim, {
            toValue: -300,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            setLogoutModalVisible(false);
        });
    };

    const handleSharePress = () => {
        setShareModalVisible(true);
        Animated.timing(shareSlideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const handleCloseShareModal = () => {
        Animated.timing(shareSlideAnim, {
            toValue: -300,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            setShareModalVisible(false);
        });
    };

    const handleSwitchPress = () => {
        setSwitchModalVisible(true);
        Animated.timing(switchSlideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const handleCloseSwitchModal = () => {
        Animated.timing(switchSlideAnim, {
            toValue: -300,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            setSwitchModalVisible(false);
        });
    };

    const handleEditPress = () => { // New function to open edit modal
        setEditModalVisible(true);
        Animated.timing(editSlideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const handleCloseEditModal = () => { // New function to close edit modal
        Animated.timing(editSlideAnim, {
            toValue: -300,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            setEditModalVisible(false);
        });
    };

    return (
        <View style={styles.maincontainer}>
            <View style={styles.subcontainer}>
                <TouchableOpacity>
                    <Ionicons name="chevron-back-outline" size={22} style={styles.icon} onPress={handleBack}/>
                </TouchableOpacity>
                <Image
                    source={require('../../../assets/images/Profile.png')}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.leoremcontainer}>Lorem Ipsum</Text>
                    <Text style={styles.tapContainer}>Tap the pencil to write...</Text>
                </View>
                <TouchableOpacity style={styles.pencontainer} onPress={handleEditPress}>
                    <MaterialCommunityIcons name="pencil" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.allcontainer} onPress={handleProfile}>
                <Ionicons name="person-circle-outline" size={25}/>
                <Text style={styles.profilecontainer}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutcontainer} onPress={handleLogoutPress}>
                <Ionicons name="log-out-outline" size={25}/>
                <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.informationcontainer} onPress={handleAbout}>
                <Ionicons name="information-circle" size={25}/>
                <Text style={styles.information}>About Lorem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sharecontainer} onPress={handleSharePress}>
                <Ionicons name="share-social" size={25}/>
                <Text style={styles.share}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dollercontainer} onPress={handlevip}>
                <Ionicons name="logo-usd" size={25} />
                <Text style={styles.vip}>Become a Vip </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.switchcontainer} onPress={handleSwitchPress}>
                <Ionicons name="people" size={25}/>
                <Text style={styles.people}>Switch Accounts</Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={logoutModalVisible}
                animationType="none"
                onRequestClose={handleCloseLogoutModal}
            >
                <View style={styles.modalBackground}>
                    <Animated.View style={[styles.modalContainer, { transform: [{ translateX: logoutSlideAnim }] }]}>
                        <View style={styles.modelsub}><Text style={styles.modalText}>Logout ?</Text></View>
                        <View style={{width:'100%',height:'69%',padding:'3%'}}>
                            <View style={{width:'100%',height:'50%',paddingLeft:'5%',paddingTop:'3%'}}><Text style={{fontSize:16,fontWeight:'500'}}>Are you sure ?</Text></View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',height:'69%',paddingLeft:'5%',paddingRight:'5%',paddingTop:'5%'}}>   
                                <Text style={styles.modalcancelText} onPress={handleCloseLogoutModal}>CANCEL</Text>
                                <TouchableOpacity onPress={handlelogout}><Text style={styles.modallogoutText}>LOGOUT</Text></TouchableOpacity>
                            </View>
                        </View>    
                    </Animated.View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={shareModalVisible}
                animationType="none"
                onRequestClose={handleCloseShareModal}
            >
                <View style={styles.modalBackground}>
                    <Animated.View style={[styles.modalContainershare, { transform: [{ translateX: shareSlideAnim }] }]}>
                        <View style={styles.modelsubshare}><Text style={styles.modalTextshare}>Share ?</Text><Ionicons name="close" size={24} color="white" onPress={handleCloseShareModal}/></View>
                        <View style={{width:'100%',height:'85%',padding:'3%'}}>
                            <View style={{width:'100%',height:'35%',paddingLeft:'5%',paddingRight:'8%',paddingTop:'3%'}}>
                            <Text style={{fontSize:16,fontWeight:'400'}}>If you have an account on any among the below Platforms, you may share Lorem with your buddies so that they can join and make the place more interesting.</Text>
                            </View>
                            <View style={{flexDirection:'column',alignItems:'center',height:'69%'}}>  
                            <View style={{flexDirection:'row',backgroundColor:'#E6E6FF',borderRadius:5,width:'45%',height:'20%',justifyContent:'center',alignItems:'center',columnGap:10}}><TouchableOpacity><FontAwesome5 name="copy" size={24} color="black"/></TouchableOpacity><Text>Lorem.IN</Text></View>
                            <View style={{width:'100%',height:'80%'}}>
                            <View style={{width:'100%',height:'40%',flexDirection:'row',columnGap:55,alignItems:'center',justifyContent:'center'}}>
                            <FontAwesome name="whatsapp" size={24} color="black" />
                            <Entypo name="facebook" size={24} color="black" />
                            <AntDesign name="skype" size={24} color="black" />
                            <Entypo name="twitter" size={24} color="black" />
                            </View>
                            <View style={{width:'100%',height:'40%',flexDirection:'row',columnGap:55,alignItems:'center',justifyContent:'center'}}>
                            <Entypo name="linkedin" size={24} color="black" />
                            <FontAwesome name="telegram" size={24} color="black" />
                            <MaterialIcons name="message" size={24} color="black" />
                            <MaterialIcons name="email" size={24} color="black" />
                            </View>
                            </View>
                            </View>
                        </View>    
                    </Animated.View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={switchModalVisible}
                animationType="none"
                onRequestClose={handleCloseSwitchModal}
            >
                <View style={styles.modalBackground}>
                    <Animated.View style={[styles.modalContainerswitch, { transform: [{ translateX: switchSlideAnim }] }]}>
                        <View style={styles.modelsubswitch}><Text style={styles.modalTextswitch}>Switch Accounts ?</Text><Ionicons name="close" size={24} color="white" onPress={handleCloseSwitchModal}/></View>
                        <View style={{width:'100%',height:'74%',paddingTop:'3%',rowGap:20}}>
                            <View style={{height:'30%',paddingLeft:'7%',justifyContent:'flex-end'}}><Text style={{fontSize:18,fontWeight:'600'}}>Login as :</Text></View>
                            <View style={{height:'30%',paddingLeft:'4%'}}><TouchableOpacity style={{height:'100%',width:'35%',backgroundColor:'black',borderRadius:25,justifyContent:'center',alignItems:'center'}} onPress={handleAddAccount}><Text style={{color:'white'}}>ADD ACCOUNT</Text></TouchableOpacity></View>
                        </View>    
                    </Animated.View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={editModalVisible}
                animationType="none"
                onRequestClose={handleCloseEditModal}
            >
                <View style={styles.modalBackground}>
                    <Animated.View style={[styles.modalContainerEdit, { transform: [{ translateX: editSlideAnim }] }]}>
                        <View style={styles.modelsubedit}><Text style={styles.modalTextEdit}>Status Update</Text><Ionicons name="close" size={24} color="white" onPress={handleCloseEditModal}/></View>
                        <View style={{width:'100%',height:'74%',rowGap:20}}>
                            <View style={{height:'70%',paddingLeft:'7%',justifyContent:'flex-end',backgroundColor:'red'}}><Text style={{fontSize:18,fontWeight:'600'}}>What's up ?</Text>
                                <TextInput placeholder="Share what you are thinking or doing"/>
                            </View>
                        </View>    
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        rowGap: 15,
    },
    subcontainer: {
        backgroundColor: "#A487E7",
        height: '12%',
        flexDirection: "row",
        alignItems: "flex-end",
        paddingTop:'2%',
        paddingBottom:'4%'
    },
    icon: {
        marginRight: 10,
    },
    image: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        rowGap: 2,
    },
    leoremcontainer: {
        color: "white",
    },
    tapContainer: {
        color: "white",
        fontSize: 12,
    },
    pencontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    },
    allcontainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        columnGap: 20,
        marginLeft:4,
        marginTop: 15,
        paddingHorizontal: 20,
    },
    profilecontainer: {
        fontWeight: "600",
        fontSize: 15,
    },
    logoutcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft:7,
        columnGap: 17,
        paddingHorizontal: 20,
    },
    logout: {
        fontWeight: "600",
        fontSize: 15,
    },
    informationcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft:4,
        columnGap: 19,
        paddingHorizontal: 20,
    },
    information: {
        fontWeight: "600",
        fontSize: 15,
    },
    sharecontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft:3,
        columnGap: 21,
        paddingHorizontal: 20,
    },
    share: {
        fontWeight: "600",
        fontSize: 15,
    },
    dollercontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft:4,
        columnGap: 20,
        paddingHorizontal: 20,
    },
    vip: {
        fontWeight: "600",
        fontSize: 15,
    },
    switchcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft:5,
        columnGap: 19,
        paddingHorizontal: 20,
    },
    people: {
        fontWeight: "600",
        fontSize: 15,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        height:'20%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent:'center',
        alignItems: 'center',
    },
    modelsub:{
        backgroundColor:'black',
        width:'100%',
        flexDirection:'row',
        height:'31%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingLeft:'7%',
        paddingRight:'7%',
        justifyContent:'space-between',
        alignItems:'center'
    },
    modalText: {
        fontSize: 18,
        color: 'white',
    },
    modalcancelText: {
        color: '#F66161',
        fontSize: 16,
        fontWeight:'500'
    },
    modallogoutText: {
        color: '#7B55D3',
        fontSize: 16,
    },
    modalContainershare: {
        backgroundColor: 'white',
        height:'55%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
    },
    modelsubshare:{
        backgroundColor:'black',
        width:'100%',
        flexDirection:'row',
        height:'12%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingLeft:'7%',
        paddingRight:'7%',
        justifyContent:'space-between',
        alignItems:'center'
    },
    modalTextshare: {
        fontSize: 18,
        color: 'white',
    },
    modalContainerswitch: {
        backgroundColor: 'white',
        height:'25%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    modelsubswitch:{
        backgroundColor:'black',
        width:'100%',
        flexDirection:'row',
        height:'26%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingLeft:'7%',
        paddingRight:'7%',
        justifyContent:'space-between',
        alignItems:'center'
    },
    modalTextswitch: {
        fontSize: 18,
        color: 'white',
    },
    modalswitchText: {
        color: '#7B55D3',
        fontSize: 16,
    },
    modalContainerEdit: { // New styles for edit modal
        backgroundColor: 'white',
        height: '35%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    modelsubedit: {
        backgroundColor: 'black',
        width: '100%',
        flexDirection: 'row',
        height: '20%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingLeft: '7%',
        paddingRight: '7%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTextEdit: {
        fontSize: 18,
        color: 'white',
    },
    modalEditText: {
        color: '#7B55D3',
        fontSize: 16,
    },
});

export { Profile };
