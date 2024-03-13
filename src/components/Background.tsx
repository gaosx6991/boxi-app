import React, {PropsWithChildren} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FloatingNotification from './FloatingNotification.tsx';

type Props = PropsWithChildren;

export default (props: Props) => (
  <LinearGradient
    start={{x: 1, y: 0}}
    end={{x: 0, y: 1}}
    colors={['#837ED9', '#393690']}
    style={styles.root}>
    <View style={styles.circle}></View>
    {props.children}

    <FloatingNotification
      styles={styles.floatingNotification}
      content={'Your package ready to pick up soon.'}
      timestamp={'5:20 PM'}
    />
  </LinearGradient>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  circle: {
    width: 262,
    height: 262,
    borderRadius: 262 / 2,
    position: 'absolute',
    backgroundColor: '#5B57BA',
    top: -70,
    left: 262 / 2 + 70,
  },
  floatingNotification: {
    position: 'absolute',
    bottom: 0,
  },
});
