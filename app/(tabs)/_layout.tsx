import React from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Ionicons, FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Chats from "./chats";
import Meme from "./meme";
import Rooms from "./rooms";
import People from "./people";
import Userprofile from "./profile";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('window');

export default function TabLayout() {
    const navigation = useNavigation();

    const handleMenu = () => {
        navigation.navigate('Settings' as never);
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Meme') {
                        return <FontAwesome6 name="fire-flame-curved" size={size} color={color} />;
                    } else if (route.name === 'Rooms') {
                        return <Entypo name="home" size={size} color={color} />;
                    } else if (route.name === 'Chats') {
                        return <Ionicons name="chatbubbles" size={size} color={color} />;
                    } else if (route.name === 'People') {
                        return <Ionicons name="people" size={size} color={color} />;
                    } else if (route.name === 'UserProfile') {
                        return <Ionicons name="person-circle-outline" size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: { 
                    backgroundColor: '#A487E7',
                    height: height * 0.08, // Adjust height dynamically
                },
                tabBarLabelStyle: { fontSize: 12 }, 
                tabBarShowLabel: false
            })}
        >
            <Tab.Screen 
                name="Meme" 
                component={Meme} 
                options={{ headerShown: false }}
            />
            <Tab.Screen 
                name="Rooms" 
                component={Rooms} 
                options={{ headerShown: false }}
            />
            <Tab.Screen 
                name="Chats" 
                component={Chats} 
                options={{ headerShown: false }}
            />
            <Tab.Screen 
                name="People" 
                component={People} 
                options={{ headerShown: false }}
            />
            <Tab.Screen 
                name="UserProfile"
                component={Userprofile}
                options={{ 
                    headerShown: true,
                    headerLeft: () => (
                        <FontAwesome name="lock" size={24} color="black" />
                    ),
                    headerLeftContainerStyle: {
                        paddingLeft: width * 0.05, // Adjust padding dynamically
                    },
                    headerRight: () => (
                        <View style={styles.headerRightContainer}>
                            <TouchableOpacity><AntDesign name="pluscircleo" size={23} color="black" /></TouchableOpacity>
                            <TouchableOpacity onPress={handleMenu}><MaterialIcons name="menu" size={27} color="black" /></TouchableOpacity>
                        </View>
                    ),
                    headerRightContainerStyle: {
                        paddingRight: width * 0.03,
                    }
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    headerRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        columnGap:25,
        width: width * 0.35, 
    },
});
