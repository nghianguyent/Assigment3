import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {Detail, Favorite, Home} from '../screens';
import {createDrawerNavigator} from '@react-navigation/drawer';
import IconCus from '../components/IconCus';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppColor} from '../constants/colors';

export enum Routes {
  Home = 'Home',
  Favorite = 'Favorite',
  Detail = 'Detail',
  TabHome = 'TabHome',
}

export type RootStackParamList = {
  [Routes.Home]: undefined;
  [Routes.Favorite]: undefined;
  [Routes.Detail]: {id: number};
  [Routes.TabHome]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

function BottomTabNavigators() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Tab.Screen
        name={Routes.Home}
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}) =>
            IconCus({color, focused, name: 'home-outline'}),
          tabBarActiveTintColor: AppColor.primary,
        }}
      />
      <Tab.Screen
        name={Routes.Favorite}
        component={Favorite}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}) =>
            IconCus({color, focused, name: 'heart'}),
          tabBarActiveTintColor: AppColor.primary,
        }}
      />
    </Tab.Navigator>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={Routes.TabHome}
        component={BottomTabNavigators}
        options={{
          title: 'Home',
          drawerIcon: ({color, focused}) =>
            IconCus({color: AppColor.primary, focused, name: 'home'}),
          drawerActiveTintColor: AppColor.primary,
          drawerInactiveTintColor: AppColor.neutral2,
          drawerActiveBackgroundColor: AppColor.bg,
        }}
      />
      <Drawer.Screen
        name={Routes.Favorite}
        component={Favorite}
        options={{
          title: 'My Favorites',
          drawerIcon: ({color, focused}) =>
            IconCus({
              color: focused ? AppColor.primary : AppColor.neutral2,
              focused,
              name: 'heart',
            }),
          drawerActiveBackgroundColor: AppColor.bg,
          drawerInactiveTintColor: AppColor.neutral2,
          drawerActiveTintColor: AppColor.primary,
        }}
      />
    </Drawer.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Routes.TabHome}
          component={BottomTabNavigators}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.Detail}
          component={Detail}
          initialParams={{id: 1}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
