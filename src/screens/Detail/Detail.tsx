import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useLayoutEffect, useMemo, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {favoriteContext} from '../../utils/FavoriteContextWrapper';
import {orchidsMock} from '../../mock/orchids';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Routes} from '../../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppColor} from '../../constants/colors';

export type DetailParamList = NativeStackScreenProps<
  RootStackParamList,
  Routes,
  Routes.Detail
>;

export default function Detail({navigation, route}: Readonly<DetailParamList>) {
  const [scaleValue, setScaleValue] = useState(new Animated.Value(1));
  const {favoriteList, isFavorite, toggleFavorite} =
    useContext(favoriteContext);

  const orchidId = route.params?.id;
  const chosenOrchid = useMemo(() => {
    return orchidsMock.find(item => item.id === orchidId);
  }, [favoriteList]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: chosenOrchid?.name,
      headerShown: false,
    });
  }, [navigation]);

  const animatedButton = () => {
    Animated.timing(scaleValue, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
    toggleFavorite(chosenOrchid?.id ?? 0);
  };

  const goBackFunction = () => {
    navigation.pop();
  };

  return (
    <ScrollView style={{flex: 1, height: '100%'}}>
      <View style={styles.rootContainer}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{uri: chosenOrchid?.image}}
            defaultSource={{uri: 'https://via.placeholder.com/150'}}
          />
          <Pressable style={styles.backIcon}>
            <Icon
              name="chevron-back-outline"
              size={36}
              color={AppColor.neutral2}
              onPress={() => goBackFunction()}
            />
          </Pressable>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{chosenOrchid?.name}</Text>
            <TouchableWithoutFeedback onPress={animatedButton}>
              <Animated.View
                style={[styles.headerIcon, {transform: [{scale: scaleValue}]}]}>
                {isFavorite(chosenOrchid?.id ?? 0) ? (
                  <Icon name="heart" size={23} color={AppColor.primary} />
                ) : (
                  <Icon name="heart-outline" size={23} color={'black'} />
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.section1}>
            <Text style={styles.title}>
              Price:
              <Text style={styles.priceText}> {chosenOrchid?.price}đ</Text>
            </Text>
          </View>
          <View style={styles.section2}>
            <Text style={[styles.title, {color: AppColor.onPrimary}]}>
              Description
            </Text>
            <Text style={styles.contentText}>{chosenOrchid?.description}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: AppColor.bg,
    height: Dimensions.get('screen').height,
  },
  priceText: {
    color: AppColor.primary,
  },
  headerContainer: {
    width: '100%',
    height: 350,
  },
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 30,
    color: 'white',
    borderRadius: 30,
    padding: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  footerContainer: {
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    width: '80%',
    marginLeft: 10,
    fontSize: 38,
    color: AppColor.primary,
    fontWeight: '600',
  },
  headerIcon: {
    overflow: 'hidden',
    padding: 13,
    borderRadius: 30,
    backgroundColor: AppColor.neutral2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section1: {padding: 10, marginBottom: 10},
  title: {
    color: AppColor.blue,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  contentText: {
    fontSize: 15,
    color: AppColor.onPrimary,
  },
  section2: {
    backgroundColor: AppColor.primary,
    padding: 20,
    borderRadius: 25,
    marginBottom: 15,
  },
  section3: {
    padding: 20,
  },
  list: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 18,
    alignItems: 'center',
    backgroundColor: AppColor.blue,
    opacity: 0.9,
    borderRadius: 12,
  },
});
