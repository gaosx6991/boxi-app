import React, {
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal} from 'react-native';
import {ModalScreenRef} from '../types';
import ModalScreenHeader from './ModalScreenHeader.tsx';
import Toast from 'react-native-toast-message';

type Props = PropsWithChildren & {
  title: string;
};

export default forwardRef((props: Props, ref: ForwardedRef<ModalScreenRef>) => {
  const [visible, setVisible] = useState<boolean>(false);

  const show = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const hide = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  useImperativeHandle(ref, () => {
    return {show, hide};
  });

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={visible}
      onRequestClose={hide}>
      <ModalScreenHeader onClosePress={hide} title={props.title} />
      {props.children}
      <Toast />
    </Modal>
  );
});
