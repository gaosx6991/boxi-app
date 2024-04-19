import React, {ForwardedRef, forwardRef, useCallback, useRef} from 'react';
// @ts-ignore
import {ModernQRScanner} from 'react-native-modern-qrscanner';

import {ModalScreenRef} from '../../types';
import ModalScreen from '../../components/ModalScreen.tsx';
import Container from './components/Container.tsx';
import PrimaryButton from '../../components/PrimaryButton.tsx';
import {StyleSheet, View} from 'react-native';
import ManualInputTrack from '../ManualInputTrack/ManualInputTrack.tsx';

export default forwardRef(({}, ref: ForwardedRef<ModalScreenRef>) => {
  const manualInputTrackRef = useRef<ModalScreenRef>(null);
  const handlePress = useCallback(() => {
    manualInputTrackRef.current?.show();
  }, [manualInputTrackRef]);

  return (
    <ModalScreen title={'Scan Barcode ID'} ref={ref}>
      <Container>
        <View style={styles.scannerContainer}>
          <ModernQRScanner
            onRead={(e: any) => console.log('QR code detected:', e)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton text={'Input Ticket’s ID'} onPress={handlePress} />
        </View>
      </Container>

      <ManualInputTrack ref={manualInputTrackRef} />
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
