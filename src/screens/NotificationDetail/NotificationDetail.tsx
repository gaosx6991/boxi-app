import React, {ForwardedRef, forwardRef} from 'react';

import {ModalScreenRef, NotificationItemProps} from '../../types';
import ModalScreen from '../../components/ModalScreen.tsx';
import Container from './components/Container.tsx';
import Cover from './components/Cover.tsx';
import Content from './components/Content.tsx';
import PrimaryButton from '../../components/PrimaryButton.tsx';
import {StyleSheet} from 'react-native';

type Props = {
  item: NotificationItemProps;
};

export default forwardRef(
  ({item: props}: Props, ref: ForwardedRef<ModalScreenRef>) => {
    return (
      <ModalScreen title={props.title} ref={ref}>
        <Container>
          {props.cover && <Cover image={{uri: props.cover}} />}
          <Content text={props.content} />
          {props.type === 'Update' && (
            <PrimaryButton styles={styles.button} text={'Update Now'} />
          )}
        </Container>
      </ModalScreen>
    );
  },
);

const styles = StyleSheet.create({
  button: {position: 'absolute', bottom: 0},
});
