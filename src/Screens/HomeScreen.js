import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Headers} from '../components/Header';
import {COLORS} from '../../src/utils';
import {HomeItem} from '../components/Home';
import {data} from '../utils/api/data';
import {useDispatch, useSelector} from 'react-redux';
import {getNews} from '../Redux/Slice/NewsSlice';

import {SharedElement} from 'react-navigation-shared-element';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  // const news = useSelector(state => state.news);
  const news = useSelector(state => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getNews({lang: 'en', media: 'True', topic: 'tech', country: 'UK'}),
      setIsLoading(false),
    );
  }, []);

  const HandleRefreshControl = useCallback(() => {
    dispatch(
      getNews({lang: 'en', media: 'True', topic: 'tech', country: 'UK'}),
      setIsLoading(false),
    );
  }, []);

  if (isLoading)
    return (
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          flex: 1,
          top: 40,
          justifyContent: 'center',
        }}>
        <ActivityIndicator
          size="large"
          testId="loading"
          accessibilityLabel="App is loading books"
          color={COLORS.yellow}
          testID="loading"
        />
      </View>
    );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={{marginHorizontal: 20}}>
        <FlatList
          data={news?.articles}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => <HomeItem item={item} index={index} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={Headers}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={HandleRefreshControl}
            />
          }
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
  list: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: 8,
  },
});

export default HomeScreen;
