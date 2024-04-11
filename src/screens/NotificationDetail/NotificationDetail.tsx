import React, {ForwardedRef, forwardRef} from 'react';

import {ModalScreenRef} from '../../types';
import ModalScreen from '../../components/ModalScreen.tsx';
import Container from './components/Container.tsx';
// @ts-ignore
import update_cover from '../../assets/cover.png';
import Cover from './components/Cover.tsx';
import Content from './components/Content.tsx';
import PrimaryButton from '../../components/PrimaryButton.tsx';
import {StyleSheet} from 'react-native';

type Props = {
  title: string;
  type: 'Normal' | 'Update';
};

const data = {
  cover: update_cover,
  content: `Dear Kitani,

We’ve added a new Select All in Artboard command to the Edit menu so you can quickly grab all of the layers on any Artboard you’ve selected. We’ve also given the different Select All commands their sub-menu.`,
};

export default forwardRef((props: Props, ref: ForwardedRef<ModalScreenRef>) => {
  return (
    <ModalScreen title={props.title} ref={ref}>
      <Container>
        <Cover image={data.cover} />
        <Content text={data.content} />
        {props.type === 'Update' && (
          <PrimaryButton styles={styles.button} text={'Update Now'} />
        )}
      </Container>
    </ModalScreen>
  );
});

const styles = StyleSheet.create({
  button: {position: 'absolute', bottom: 0},
});
