import React, {useMemo, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {AppColor} from '../../constants/colors';
import ListOrchids from '../../components/ListItem';
import {orchidsMock} from '../../mock/orchids';
import ListCategories from '../../components/ListCategories';
import {categoriesMock} from '../../mock/categories';
import useDebounce from '../../utils/useDebounce';
import Icon from 'react-native-ionicons';

const Home = ({}) => {
  const [chosenCat, setChosenCat] = useState(0);
  const [search, setSearch] = useState('');
  const debounce = useDebounce(search, 600);

  const data = useMemo(() => {
    const mockData = orchidsMock.filter(item =>
      item.name.toLowerCase().includes(debounce.toLowerCase()),
    );
    if (chosenCat === 0) {
      return mockData;
    }
    return mockData.filter(
      item =>
        item.categoryId === chosenCat &&
        item.name.toLowerCase().includes(debounce.toLowerCase()),
    );
  }, [chosenCat, debounce]);

  function selectCat(id: number) {
    setChosenCat(id);
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.headSection}>
        <Text style={styles.text2}>Orchid Collection</Text>
      </View>
      <View>
        <Pressable
          onPress={() => {
            setSearch('');
          }}>
          <Text style={styles.clearText}>Clear search</Text>
        </Pressable>
        <TextInput
          style={{
            backgroundColor: 'white',
            marginHorizontal: 30,
            marginTop: 20,
            color: AppColor.secondary,
            borderRadius: 10,
            padding: 15,
          }}
          value={search}
          placeholder="Search by name..."
          placeholderTextColor={AppColor.neutral2}
          onChangeText={e => {
            setSearch(e);
          }}
        />
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
          {chosenCat === 0 ? 'Popular' : 'Products'}
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
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 30,
  },
  clearText: {
    color: AppColor.neutral2,
    fontSize: 16,
    marginLeft: 30,
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
