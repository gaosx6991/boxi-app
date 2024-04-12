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

const data = {
  cover: promo_banner,
  availableUntil: 1712890989471,
  content: `Perhaps it’s safe to say that most people want to be happy. They want to enjoy being here in this big, crazy, confusing world. But too many people struggle with being truly happy. They can’t seem to find happiness in life. To them, it is something that doesn’t just come naturally. Fortunately, there are plenty of strategies people can use to create happiness, or at least strive for it.`,
};

export default forwardRef(({}, ref: ForwardedRef<ModalScreenRef>) => {
  return (
    <ModalScreen title={"Promo's"} ref={ref}>
      <Container>
        <Cover image={data.cover} />
        <AvailableUntil
          availableUntil={
            data.availableUntil as unknown as MillisecondTimestamp
          }
        />
        <Content text={data.content} />
        <PrimaryButton styles={styles.button} text={'Claim Promo Voucher'} />
      </Container>
    </ModalScreen>
  );
});

const styles = StyleSheet.create({
  button: {position: 'absolute', bottom: 0},
});
