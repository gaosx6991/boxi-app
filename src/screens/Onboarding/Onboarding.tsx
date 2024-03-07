import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './components/Header.tsx';
import Content from './components/Content.tsx';
import Welcome from './components/Welcome.tsx';

export default () => {
  return (
    <View style={styles.root}>
      <Header style={styles.header} />
      <Content style={styles.content} />
      <Welcome />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  header: {
    marginTop: 80,
  },
  content: {
    marginTop: 40,
  },
});
