import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../navigation/Navigation';
import {OrchidModel} from '../model/orchid.model';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppColor} from '../constants/colors';
import Carousel from 'react-native-reanimated-carousel';
import {CarouselRenderItemInfo} from 'react-native-reanimated-carousel/lib/typescript/types';
import {parallaxLayout} from './parralax';

interface ListFavoriteProps {
  data: any;
  removeDataFromStorage: (id: number) => void;
}

const ListFavorite = ({data, removeDataFromStorage}: ListFavoriteProps) => {
  const navigation = useNavigation();
  const width = Dimensions.get('screen').width;

  const onPressFunction = (id: number) => {
    navigation.navigate(Routes.Detail, {id: id});
  };

  const renderSingleItem = (item: OrchidModel) => {
    return (
      <View style={styles.rootContainer} key={item.id}>
        <Pressable
          style={styles.innerContainer}
          onPress={onPressFunction.bind(this, item.id)}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{uri: item.image}}
            defaultSource={{uri: 'https://via.placeholder.com/150'}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
          <Pressable
            style={styles.icon}
            onPress={() => removeDataFromStorage(item.id)}>
            <Icon name="heart" size={32} color={AppColor.primary} />
          </Pressable>
        </Pressable>
      </View>
    );
  };

  return (
    // <FlatList
    //   data={data}
    //   renderItem={({item}) => renderSingleItem(item)}
    //   scrollEnabled={false}
    // />
    <View style={{height: '100%', flex: 1}}>
      <Carousel
        vertical
        width={width}
        height={450}
        data={data}
        renderItem={({item}: CarouselRenderItemInfo<OrchidModel>) =>
          renderSingleItem(item)
        }
        loop={true}
        autoPlay={true}
        autoPlayInterval={5000}
        customAnimation={parallaxLayout({
          size: 450,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.75,
    shadowRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: 350,
    backgroundColor: 'white',
    height: 350,
    marginBottom: 25,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    top: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 100,
    padding: 4,
    right: 10,
  },
});

export default ListFavorite;
