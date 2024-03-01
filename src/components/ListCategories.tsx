import React from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {CategoryModel} from '../model/category.model';
import {AppColor} from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  data: CategoryModel[];
  selectCat: (id: number) => void;
  chosenCat: number;
}

const ListCategories = ({data, selectCat, chosenCat}: Props) => {
  const renderCatItem = (item: CategoryModel) => {
    return (
      <View
        style={[
          styles.rootContainer,
          item.id === chosenCat ? {shadowColor: AppColor.primary} : null,
        ]}>
        <Pressable
          style={[
            styles.innerContainer,
            item.id === chosenCat ? {backgroundColor: AppColor.button} : null,
            // item.id === 1 ? {width: 100, backgroundColor: null} : null,
          ]}
          onPress={() => selectCat(item.id)}>
          {item.id === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                style={[
                  {
                    padding: 15,
                    borderWidth: 2,
                    borderColor: chosenCat === 0 ? 'white' : AppColor.neutral2,
                    borderRadius: 100,
                    overflow: 'hidden',
                    backgroundColor:
                      chosenCat === 0 ? AppColor.primary : 'white',
                    color: chosenCat === 0 ? 'white' : AppColor.neutral2,
                  },
                ]}
                name="home"
                size={40}
              />
            </View>
          ) : (
            <>
              <Image
                style={styles.image}
                source={{uri: item.image}}
                resizeMode="cover"
              />
              <View style={styles.content}>
                <Text
                  style={[
                    styles.textContent,
                    item.id === chosenCat
                      ? {color: AppColor.onPrimary}
                      : {color: AppColor.primary},
                  ]}>
                  {item.name}
                </Text>
                <Icon
                  name={
                    item.id === chosenCat
                      ? 'radio-button-on'
                      : 'radio-button-off'
                  }
                  size={25}
                  color={item.id === chosenCat ? 'white' : 'black'}
                />
              </View>
            </>
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({item}) => renderCatItem(item)}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 4,
    padding: 15,
  },
  listContainer: {display: 'flex', justifyContent: 'center'},
  innerContainer: {
    width: 150,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 30,
  },

  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContent: {
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ListCategories;
