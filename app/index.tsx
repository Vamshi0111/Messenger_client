import { useState } from "react";
import React from "react";
import { StatusBar, Image, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { NavigationContainer, useNavigation, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from '@expo/vector-icons';
import TabLayout from "./(tabs)/_layout";
import Interface from "@/components/Screens/Interface/interface";
import AccExisting from "@/components/Screens/AccExisting/Accexisting";
import PasswordRecovery from "@/components/Screens/PasswordRecovery/passwordrecovery";
import ConfirmEmail from "@/components/Screens/ConfirmEmail/confirmemail";
import Vip from "@/components/Screens/VIP/vip"
import Login from "@/components/Screens/Login/login";
import Profile from "@/components/Screens/Profile/profile";
import AboutUs from "@/components/Screens/Aboutus/aboutus";
import Privacy from "@/components/Screens/Privacypolicy/privacy";
import Blog from "@/components/Screens/Blog/blog";
import Legal from "@/components/Screens/Legalinfo/legalinfo";
import Register from "@/components/Screens/Register/register";
import About from "@/components/Screens/About/about";
import Createroom from "@/components/Screens/CreateRoom/createroom";
import EditRoomChat from "@/components/Screens/CreateRoom/EditroomChat";
import GroupInfoScreen from "@/components/Screens/CreateRoom/Groupinfoscreen";
import Feedback from "@/components/Screens/Feedback/feedback";
import Settings from "@/components/Screens/Settings/settings";
import ProfileScreens from "@/components/Screens/ProfileScreens/profilescreens";
import Postlogout from "@/components/Screens/PostLogout/postlogout";
import Help from "@/components/Screens/Help/help";
import Moreabout from "@/components/Screens/Moreabout/moreabout";
import PermissionsScreen from "@/components/Screens/Permissions/permissions";
import CommentsSettings from "@/components/Screens/Commentssettings/commentssettings";
import InviteFriendsScreen from "@/components/Screens/Invitefriends/invitefriends";
import CloseFriendsScreen from "@/components/Screens/Closefriends/closefriends";
import AccountPrivacy from "@/components/Screens/Accountsprivacy/accountsprivacy";
import BlockedAccountsScreen from "@/components/Screens/Blockedaccounts/blockedaccounts";
import Languages from "@/components/Screens/Languages/languages";
import AccountStatus from "@/components/Screens/Accountstatus/accountstatus";
import UsernameRecovery from "@/components/Screens/UsernameRecovery/usernamerecovery";


type RootStackParamList = {
  Lorem: undefined;
  Tablayout: undefined;
  Login: undefined;
  Register: undefined;
  AccExisting: undefined;
  PasswordRecovery: undefined;
  Confirmemail: undefined;
  Usernamerecovery: undefined;
  Vip: undefined;
  Profile: undefined;
  Postlogout: undefined
  OnlineChat: undefined;
  About: undefined;
  Privacy: undefined;
  Blog: undefined;
  ChatRooms: undefined;
  Legal: undefined;
  Aboutus: undefined;
  Createroom: undefined;
  EditRoomChat: undefined;
  GroupInfoScreen: undefined;
  Feedback: undefined;
  Settings: undefined;
  ProfileScreens: undefined;
  Help: undefined;
  Permissions: undefined;
  Commentssettings: undefined;
  Moreabout: undefined;
  Invitefriends: undefined;
  Closefriends: undefined;
  Accountsprivacy: undefined;
  BlockedAccountsScreen: undefined;
  Languages: undefined;
  Accountstatus: undefined;

};

const Stack = createStackNavigator<RootStackParamList>();

interface MenuProps {
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ onClose }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigate = (screenName: keyof RootStackParamList) => {
    onClose();
    navigation.navigate(screenName as never);
  };

  return (
    <View style={{ position: 'absolute', right: 30, top: 0, backgroundColor: 'black', padding: 10, borderRadius: 5, width: '60%', gap: 35 }}>
      <TouchableOpacity onPress={() => handleNavigate('Aboutus' as never)}>
        <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('Privacy')}>
        <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Privacy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('Blog')}>
        <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Blog</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('Legal')}>
        <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Legal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose}>
        <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>Close  x</Text>
      </TouchableOpacity>
    </View>
  );
};

const Index = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="pink" />
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Lorem" screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Lorem"
            component={Interface}
            options={{
              headerStyle: { backgroundColor: 'white' },
              headerTintColor: 'black',
              headerShown: true,
              headerLeft: () => (
                <Image source={require('../assets/images/Logo.png')} style={{ height: 40, width: 40 }} />
              ),
              headerRight: () => (
                <View style={{ marginRight: 20 }}>
                  <TouchableOpacity onPress={toggleMenu}>
                    <Entypo name="menu" size={28} color="black" />
                  </TouchableOpacity>
                  {showMenu && <Menu onClose={closeMenu} />}
                </View>
              )
            }}
          />

          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Aboutus" component={AboutUs} options={{ headerShown: true }} />
          <Stack.Screen name="Privacy" component={Privacy} options={{ headerShown: true }} />
          <Stack.Screen name="Blog" component={Blog} options={{ headerShown: true }} />
          <Stack.Screen name="Legal" component={Legal} options={{ headerShown: true }} />
          <Stack.Screen name="Tablayout" component={TabLayout} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="AccExisting" component={AccExisting} />
          <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
          <Stack.Screen name="Usernamerecovery" component={UsernameRecovery} />
          <Stack.Screen name="Confirmemail" component={ConfirmEmail} />
          <Stack.Screen name="Vip" component={Vip} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Postlogout" component={Postlogout} options={{ headerShown: true }} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: true, title: 'Settings and activity' }} />
          <Stack.Screen name="EditRoomChat" component={EditRoomChat} />
          <Stack.Screen name="GroupInfoScreen" component={GroupInfoScreen} />
          <Stack.Screen name="ProfileScreens" component={ProfileScreens} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Accountsprivacy" component={AccountPrivacy} options={{ headerShown: true }} />
          <Stack.Screen name="Commentssettings" component={CommentsSettings} />
          <Stack.Screen name="Invitefriends" component={InviteFriendsScreen} />
          <Stack.Screen name="Closefriends" component={CloseFriendsScreen} />
          <Stack.Screen name="Moreabout" component={Moreabout} />
          <Stack.Screen name="Permissions" component={PermissionsScreen} />
          <Stack.Screen name="BlockedAccountsScreen" component={BlockedAccountsScreen} />
          <Stack.Screen name="Languages" component={Languages} />
          <Stack.Screen name="Accountstatus" component={AccountStatus} />

          <Stack.Screen name="Createroom" component={Createroom} options={{
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: 'black',
            headerShown: true,
          }} />
        </Stack.Navigator>
        {showMenu && <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        </TouchableWithoutFeedback>}
      </NavigationContainer>
    </>
  );
};

export default Index;


