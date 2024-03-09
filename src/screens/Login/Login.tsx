import React from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import Header from './components/Header.tsx';
import Title from './components/Title.tsx';
import Form from './components/Form.tsx';
import Footer from './components/Footer.tsx';

export default () => {
  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <Header />
      <Title styles={styles.title} />
      <Form styles={styles.form} />
      <Footer styles={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  title: {
    marginTop: 40,
    marginBottom: 24,
  },
  form: {
    marginBottom: 32,
  },
  footer: {
    marginBottom: StatusBar.currentHeight ? StatusBar.currentHeight + 24 : 24,
  },
});
