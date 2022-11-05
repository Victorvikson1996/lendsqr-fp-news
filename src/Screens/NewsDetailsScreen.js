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
} from 'react-native';

import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS} from '../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Headers} from '../components/Header';
import {useNavigation} from '@react-navigation/native';
const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.5;
import {BackIcon} from '../assets/icon';

const BackButton = ({}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        buttonRef.current.fadeOut(100).then(() => {
          navigation.goBack();
        });
      }}>
      <Image
        source={{uri: ''}}
        size={28}
        color={COLORS.black}
        style={{
          position: 'absolute',
          top: 100,
          right: 20,
          zIndex: 2,
          height: 20,
          width: 40,
        }}
      />
    </TouchableOpacity>
  );
};

const NewsDetailsScreen = ({navigation, route}) => {
  const {item} = route.params;
  const buttonRef = React.useRef();

  return (
    <View style={{flex: 1, backgroundColor: '#ffff'}}>
      <StatusBar />
      <View id={`item.${item.id}.image_url`}>
        <Image
          source={{uri: item.image_url}}
          style={{
            width: '100%',
            height: ITEM_HEIGHT,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
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
          style={{
            position: 'absolute',
            top: 50,
            right: 20,
            zIndex: 2,
            // height: 20,
            // width: 40,
          }}>
          <BackIcon />
        </Pressable>
      </Animatable.View>
      <View
        style={{flexDirection: 'row', marginTop: 10, paddingHorizontal: 20}}>
        <View style={{flexDirection: 'column', paddingLeft: 6}}>
          <View id={`item.${item.id}.title`}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 24,
                fontWeight: 'bold',
                lineHeight: 28,
              }}>
              {item.title}
            </Text>
          </View>
          <View id={`item.${item.id}.description`}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 16,
                fontWeight: 'bold',
                lineHeight: 18,
              }}>
              {item.description}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        indicatorStyle="white"
        style={{
          paddingHorizontal: 20,
          backgroundColor: COLORS.white,
        }}
        contentContainerStyle={{paddingVertical: 20}}>
        <Text
          style={{
            fontSize: 18,
            color: COLORS.black,
            lineHeight: 24,
            marginBottom: 4,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: COLORS.black,
            lineHeight: 24,
            marginBottom: 4,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </View>
  );
};

// NewsDetailsScreen.sharedElements = route => {
//   const {item} = route.params;
//   return [
//     {
//       id: `item.${item.id}.image_url`,
//       animation: 'move',
//       resize: 'clip',
//     },
//     {
//       id: `item.${item.id}.title`,
//       animation: 'fade',
//       resize: 'clip',
//     },
//     {
//       id: `item.${item.id}.description`,
//       animation: 'fade',
//       resize: 'clip',
//     },
//     {
//       id: `item.${item.id}.iconName`,
//       animation: 'move',
//       resize: 'clip',
//     },
//   ];
// };

export default NewsDetailsScreen;
