import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  Pressable,
  Linking,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS} from '../utils';

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.5;
import {BackIcon} from '../assets/icon';
import moment from 'moment';

const NewsDetailsScreen = ({navigation, route}) => {
  const {item} = route.params;
  const buttonRef = React.useRef();

  return (
    <View style={styles.container}>
      <StatusBar />
      <View id={`item.${item.id}.media`}>
        <Image
          source={{uri: `${item?.media}`}}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Animatable.View
        ref={buttonRef}
        animation="fadeIn"
        duration={600}
        delay={300}
        style={[StyleSheet.absoluteFillObject]}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}>
          <BackIcon />
        </Pressable>
      </Animatable.View>
      <View style={styles.contentCon}>
        <View style={styles.authorCon}>
          <View id={`item.${item.id}.author`}>
            <Text style={styles.author}>{item.author}</Text>
          </View>
          <View id={`item.${item.id}.published_date`}>
            <Text style={styles.date}>
              Date: {moment(item.published_date).utc().format('MMM Do, YYYY')}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        indicatorStyle="white"
        style={styles.contentCon}
        contentContainerStyle={{paddingVertical: 20}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.summary}>{item.summary}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  image: {
    width: '100%',
    height: ITEM_HEIGHT,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 2,
    // height: 20,
    // width: 40,
  },
  author: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  contentCon: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  authorCon: {
    flexDirection: 'column',
    paddingLeft: 6,
  },
  date: {
    color: COLORS.grey,
    fontSize: 14,
    fontWeight: 'bold',
    // lineHeight: 18,
  },
  contentCon: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 15,
    color: COLORS.grey,
    lineHeight: 15,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 18,
    color: COLORS.black,
    lineHeight: 24,
    marginBottom: 4,
  },
});

export default NewsDetailsScreen;
