import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AppColor} from '../../constants/colors';
import ListOrchids from '../../components/ListItem';
import {orchidsMock} from '../../mock/orchids';
import ListCategories from '../../components/ListCategories';
import {categoriesMock} from '../../mock/categories';

const Home = ({}) => {
  const [chosenCat, setChosenCat] = useState(0);

  const data = useMemo(() => {
    if (chosenCat === 0) {
      return orchidsMock;
    }
    return orchidsMock.filter(item => item.categoryId === chosenCat);
  }, [chosenCat]);

  function selectCat(id: number) {
    setChosenCat(id);
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.headSection}>
        <Text style={styles.text2}>Orchid Collection</Text>
      </View>
      <View style={styles.cat}>
        <Text style={[styles.textTitle, {marginLeft: 15}]}>Categories: </Text>
        <ListCategories
          data={categoriesMock}
          selectCat={selectCat}
          chosenCat={chosenCat}
        />
      </View>
      <View style={styles.product}>
        <Text style={styles.textTitle}>
          {chosenCat == 0 ? 'Popular' : 'Products'}
        </Text>
        {chosenCat === undefined ? (
          <></>
        ) : (
          <TouchableOpacity onPress={() => setChosenCat(0)}>
            <Text style={styles.textViewAll}>View All</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <ListOrchids data={data} chosenCat={chosenCat} selectCat={selectCat} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: AppColor.bg,
  },
  headSection: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  text1: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.4)',
  },
  text2: {
    fontSize: 46,
    fontWeight: '500',
    color: AppColor.primary,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: AppColor.button,
    marginBottom: 15,
    marginLeft: 30,
  },
  cat: {
    marginTop: 25,
    marginHorizontal: 15,
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 35,
  },
  textViewAll: {
    marginRight: 30,
    marginBottom: 15,
    color: 'rgba(0,0,0,0.5)',
  },
});

export default Home;
