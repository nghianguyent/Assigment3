import {NavigationContainer, TabRouter} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Detail, Favorite, Home} from '../screens';
import IconCus from '../components/IconCus';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppColor} from '../constants/colors';

export enum Routes {
  Home = 'Home',
  Favorite = 'Favorite',
  Detail = 'Detail',
  TabHome = 'TabHome',
  TabFavorite = 'TabFavorite',
  StackHome = 'StackHome',
}

export type RootStackParamList = {
  [Routes.Home]: undefined;
  [Routes.Favorite]: undefined;
  [Routes.Detail]: {id: number};
  [Routes.TabHome]: undefined;
  [Routes.TabFavorite]: undefined;
  [Routes.StackHome]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.Detail}
        component={Detail}
        initialParams={{id: 1}}
      />
    </Stack.Navigator>
  );
}

function FavoriteStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Favorite}
        component={Favorite}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.Detail}
        component={Detail}
        initialParams={{id: 1}}
      />
    </Stack.Navigator>
  );
}
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
        name={Routes.TabHome}
        component={HomeStackScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, focused}) =>
            IconCus({color, focused, name: 'home-outline'}),
          tabBarActiveTintColor: AppColor.primary,
        }}
      />
      <Tab.Screen
        name={Routes.TabFavorite}
        component={FavoriteStackScreen}
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

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Routes.StackHome}
          component={BottomTabNavigators}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name={Routes.Detail}
          component={Detail}
          initialParams={{id: 1}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
