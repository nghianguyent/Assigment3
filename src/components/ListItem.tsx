import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {OrchidModel} from '../model/orchid.model';
import Icon from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';
import {AppColor} from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Routes} from '../navigation/Navigation';
import {usePersistedStore} from '../utils/usePersistedStore';
import {favoriteContext} from '../utils/FavoriteContextWrapper';

interface ListItemProps {
  data: OrchidModel[];
  selectCat: (cat: any) => void;
  chosenCat: any;
}

const ListOrchids = ({data}: ListItemProps) => {
  const {favoriteList, toggleFavorite} = useContext(favoriteContext);
  const navigation = useNavigation();

  const favoriteButton = (id: number) => {
    toggleFavorite(id);
  };

  const onPressFunction = (id: number) => {
    navigation.navigate(Routes.Detail, {id: id});
  };

  const renderProductItem = (item: OrchidModel) => {
    return (
      <View style={styles.rootContainer} key={item.id}>
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => onPressFunction(item.id)}>
          <View style={styles.left}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{uri: item.image}}
              defaultSource={{uri: 'https://i.imgur.com/6I2R0wL.png'}}
            />
          </View>
          <View style={styles.right}>
            <Text style={styles.textName}>{item.name}</Text>
            <Text style={styles.textOrigin}>{item.description}</Text>
            <Text style={styles.textOrigin}>
              Price: <Text style={styles.textPrice}>{item.price}đ</Text>
            </Text>
          </View>
        </TouchableOpacity>
        <Pressable
          style={{
            position: 'absolute',
            top: 10,
            right: '4%',
            backgroundColor: 'rgba(0,0,0,0.05)',
            padding: 5,
            borderRadius: 16,
            overflow: 'hidden',
          }}
          onPress={() => favoriteButton(item.id)}>
          {favoriteList.includes(item.id) ? (
            <Icon name="heart" size={20} color={AppColor.primary} />
          ) : (
            <Icon name="heart-outline" size={20} color={AppColor.neutral2} />
          )}
        </Pressable>
      </View>
    );
  };

  return data.length !== 0 ? (
    <FlatList
      data={data}
      renderItem={({item}) => renderProductItem(item)}
      scrollEnabled={false}
    />
  ) : (
    <View style={styles.emptyContainer}>
      <Image
        style={styles.emptyImage}
        source={{uri: 'https://i.imgur.com/6I2R0wL.png'}}
      />
      <Text style={styles.emptyText}>Preparing to update new Fruit</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    height: 180,
    marginBottom: 45,
    marginHorizontal: 30,
    borderRadius: 30,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    flexDirection: 'row',
    padding: 15,
  },
  left: {
    flex: 4,
    borderRadius: 30,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  right: {
    flex: 4,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  textName: {
    fontSize: 14,
    color: AppColor.primary,
    fontWeight: '600',
  },
  textOrigin: {
    marginTop: 5,
    marginBottom: 15,
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
  },
  textPrice: {
    fontSize: 12,
    color: AppColor.secondary,
    fontWeight: '600',
  },

  emptyContainer: {
    alignItems: 'center',
  },
  emptyImage: {
    width: '70%',
  },
  emptyText: {
    color: AppColor.blue,
    fontSize: 20,
    fontFamily: 'Chalkboard SE',
  },
});

export default ListOrchids;
