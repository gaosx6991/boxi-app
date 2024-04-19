import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {ModalScreenRef} from '../../types';
import ModalScreen from '../../components/ModalScreen.tsx';
import Container from './components/Container.tsx';
import {StyleSheet} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton.tsx';
import Cover from './components/Cover.tsx';
import {validatePackageId} from '../../utils/validate.ts';
import Input from '../../components/Input.tsx';

export default forwardRef(({}, ref: ForwardedRef<ModalScreenRef>) => {
  const [packageId, setPackageId] = useState<string>('');

  const [packageIdValid, setPackageIdValid] = useState<boolean>(true);

  const [packageIdValidErrMsg, setPackageIdValidErrMsg] = useState<string>('');

  const handlePackageIdValueChange = useCallback((value: string) => {
    setPackageId(value);

    const errMsg = validatePackageId(value);
    if (errMsg) {
      setPackageIdValid(false);
      setPackageIdValidErrMsg(errMsg);
    } else {
      setPackageIdValid(true);
    }
  }, []);

  const disabled = useMemo(() => !packageIdValid, [packageIdValid]);

  useEffect(() => {
    handlePackageIdValueChange(packageId);
  }, []);

  const handlePress = useCallback(() => {}, []);

  return (
    <ModalScreen title={'Track Package'} ref={ref}>
      <Container>
        <Cover />
        <Input
          type={'Package ID'}
          title={'Input Package ID'}
          value={packageId}
          onValueChange={handlePackageIdValueChange}
          valid={packageIdValid}
          errMsg={packageIdValidErrMsg}
          placeholder={'Example BX-567829AD'}
        />
        <PrimaryButton
          text={'Track Package'}
          styles={styles.button}
          onPress={handlePress}
          disabled={disabled}
        />
      </Container>
    </ModalScreen>
  );
});

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 0,
  },
});
