import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

type Props = {
  title?: string;
  icon: ImageSourcePropType;
  header: string;
  subHeader?: string;
  detail: string;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      {props.title && (
        <Text style={styles.titleTxt} numberOfLines={1} ellipsizeMode={'tail'}>
          {props.title}
        </Text>
      )}
      <View style={styles.container}>
        <Image style={styles.icon} source={props.icon} />
        <View style={styles.content}>
          <Text
            style={styles.headerTxt}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {props.header}
            {props.subHeader && (
              <Text
                style={styles.subHeaderTxt}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {' '}
                | {props.subHeader}
              </Text>
            )}
          </Text>
          <Text
            style={styles.detailTxt}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {props.detail}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'column',
    gap: 8,
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    padding: 15,
    gap: 10,
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: 16,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  content: {
    flexDirection: 'column',
    gap: 2,
  },
  headerTxt: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  subHeaderTxt: {
    fontWeight: 'normal',
    color: '#00000065',
  },
  detailTxt: {
    fontSize: 14,
    color: '#00000035',
  },
});
