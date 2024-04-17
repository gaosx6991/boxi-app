import React, {ForwardedRef, forwardRef} from 'react';
// @ts-ignore
import {ModernQRScanner} from 'react-native-modern-qrscanner';

import {ModalScreenRef} from '../../types';
import ModalScreen from '../../components/ModalScreen.tsx';
import Container from './components/Container.tsx';
import PrimaryButton from '../../components/PrimaryButton.tsx';
import {StyleSheet, View} from 'react-native';

export default forwardRef(({}, ref: ForwardedRef<ModalScreenRef>) => {
  return (
    <ModalScreen title={'Scan Barcode ID'} ref={ref}>
      <Container>
        <View style={styles.scannerContainer}>
          <ModernQRScanner
            onRead={(e: any) => console.log('QR code detected:', e)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton text={'Input Ticket’s ID'} />
        </View>
      </Container>
    </ModalScreen>
  );
});

const styles = StyleSheet.create({
  scannerContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: 'red',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
