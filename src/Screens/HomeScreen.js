import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import React from 'react';
import {Headers} from '../components/Header';
import {COLORS} from '../../src/utils';
import {HomeItem} from '../components/Home';
import {data} from '../utils/api/Api';

import {SharedElement} from 'react-navigation-shared-element';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={{marginHorizontal: 20}}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <HomeItem item={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={Headers}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default HomeScreen;
