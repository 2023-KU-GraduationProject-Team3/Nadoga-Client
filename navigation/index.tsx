/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import { colors }from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/Modal';
import SearchLibraryScreen from '../screens/SearchLibrary';
import NotFoundScreen from '../screens/NotFound';
import TabTwoScreen from '../screens/SearchBook';
import TabThreeScreen from '../screens/MyPage'
import { RootStackParamList, MainTabParamsList, RootTabScreenProps, AuthStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/SignUp';


export function Auth({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}
export function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <MainTabNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const MainStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() { 
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="SignUp" component={SignupScreen} options={{ title: 'Oops!' }} />
    </AuthStack.Navigator>
  )
}

function MainTabNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <MainStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <MainStack.Group screenOptions={{ presentation: 'modal' }}>
        <MainStack.Screen name="Modal" component={ModalScreen} />
      </MainStack.Group>
    </MainStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<MainTabParamsList>();

function BottomTabNavigator() { 
  // const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="SearchLibrary"
      screenOptions={{
        tabBarActiveTintColor: colors.black,
      }}>
      <BottomTab.Screen
        name="SearchLibrary"
        component={SearchLibraryScreen}
        options={({ navigation }: RootTabScreenProps<'SearchLibrary'>) => ({
          title: '도서관 찾기',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={colors.gray1}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="SearchBook"
        component={TabTwoScreen}
        options={{
          title: '도서 검색',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MyPage"
        component={TabThreeScreen}
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
