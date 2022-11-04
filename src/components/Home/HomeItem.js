import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

const HomeItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View key={item.id}>
          <Pressable
            activeOpacity={0.8}
            style={{marginBottom: 14}}
            onPress={() => navigation.navigate('NEWS', {item})}>
            <View id={`item.${item.id}.image_url`}>
              <Image
                style={styles.image}
                source={{uri: item.image_url}}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                left: 10,
              }}>
              <View style={styles.titleContainer}>
                <View style={styles.title}>
                  <View id={`item.${item.id}.title`}>
                    <Text style={styles.titleText}>{item.title}</Text>
                  </View>
                  <View id={`item.${item.id}.description`}>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  image: {
    borderRadius: 14,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    flexDirection: 'column',
    paddingLeft: 6,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
  },
});

export default HomeItem;
