import React, {ForwardedRef, forwardRef} from 'react';

import {MillisecondTimestamp, ModalScreenRef} from '../../types';
import ModalScreen from '../../components/ModalScreen.tsx';
import Container from './components/Container.tsx';
import Cover from './components/Cover.tsx';
import Content from './components/Content.tsx';
import PrimaryButton from '../../components/PrimaryButton.tsx';
import {StyleSheet} from 'react-native';

// @ts-ignore
import promo_banner from '../../assets/promo_banner.png';
import AvailableUntil from './components/AvailableUntil.tsx';
import {useAppSelector} from '../../hooks';
import {promoToday} from '../../store/Promo.ts';

export default forwardRef(({}, ref: ForwardedRef<ModalScreenRef>) => {
  const data = useAppSelector(promoToday);

  return (
    <ModalScreen title={"Promo's"} ref={ref}>
      {data && (
        <Container>
          <Cover image={{uri: data.cover}} />
          <AvailableUntil
            availableUntil={
              data.availableUntil as unknown as MillisecondTimestamp
            }
          />
          <Content text={data.content} />
          <PrimaryButton styles={styles.button} text={'Claim Promo Voucher'} />
        </Container>
      )}
    </ModalScreen>
  );
});

const styles = StyleSheet.create({
  button: {position: 'absolute', bottom: 0},
});
