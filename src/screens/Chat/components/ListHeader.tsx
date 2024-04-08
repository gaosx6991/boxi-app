import React from 'react';
import {StyleSheet, View} from 'react-native';
import ModalScreenHeader from '../../../components/ModalScreenHeader.tsx';
import Info from './Info.tsx';
// @ts-ignore
import photo_3 from '../../../assets/mock/photo_3.png';
import {MillisecondTimestamp} from '../../../types';

type Props = {
  onClosePress: () => void;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <ModalScreenHeader
        onClosePress={props.onClosePress}
        title={'Felix Khan'}
      />

      <Info
        role={'User'}
        username={'Felix Khan'}
        avatar={photo_3}
        online={Date.now() as unknown as MillisecondTimestamp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
});
