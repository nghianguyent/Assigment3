import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ListItem from '../../components/ListItem';
import {usePersistedStore} from '../../utils/usePersistedStore';
import {OrchidModel} from '../../model/orchid.model';
import {orchidsMock} from '../../mock/orchids';
import {Home} from '..';
import Icon from 'react-native-vector-icons/Ionicons';

import {AppColor} from '../../constants/colors';
import ListFavorite from '../../components/ListFavorite';
import {favoriteContext} from '../../utils/FavoriteContextWrapper';

const Favorite = () => {
  const {isFavorite, toggleFavorite, clear, favoriteList} =
    useContext(favoriteContext);

  const dataFav = useMemo(() => {
    if (favoriteList != null) {
      return orchidsMock.filter(item => favoriteList.includes(item.id));
    }
    return [];
  }, [JSON.stringify(favoriteList)]);

  const removeAllStorage = () => {
    Alert.alert(
      'Are you sure?',
      'Bạn chắc chắc muốn xóa hết mục yêu thích của mình chứ ?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'destructive',
        },
        {
          text: 'Yes',
          onPress: () => {
            clear();
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <Text
        style={{
          color: AppColor.primary,
          marginVertical: 30,
          fontSize: 40,
          textAlign: 'center',
        }}>
        My Favorites
      </Text>
      {dataFav.length !== 0 ? (
        <>
          <TouchableOpacity
            style={{marginLeft: 30}}
            onPress={() => removeAllStorage()}>
            <Text
              style={{
                fontSize: 18,
                color: 'rgba(0, 0, 0, 0.5)',
                marginBottom: 10,
                borderColor: 'black',
              }}>
              Clear all
            </Text>
          </TouchableOpacity>
          <ListFavorite
            data={dataFav}
            removeDataFromStorage={(id: number) => toggleFavorite(id)}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="trash-bin-outline" size={100} color={AppColor.primary} />

          <Text style={styles.emptyText}>
            Find an orchid and add it to your favorites
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: AppColor.bg,
    display: 'flex',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  emptyText: {
    color: AppColor.primary,
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
});

export default Favorite;
