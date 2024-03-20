import React, {useCallback, useState} from 'react';
import Background from '../../components/Background.tsx';
import Header from '../../components/Header.tsx';
import Board from './components/Board.tsx';
import ProgressIndicator from './components/ProgressIndicator.tsx';
import Form from './components/Form.tsx';
import {LayoutAnimation, StyleSheet} from 'react-native';
import {PAGE} from './common.ts';

export default () => {
  const [page, setPage] = useState<PAGE>(PAGE.SHIPMENT_FORM);

  const handleFlip = useCallback(() => {
    LayoutAnimation.easeInEaseOut();
    switch (page) {
      case PAGE.SHIPMENT_FORM:
        setPage(PAGE.RECIPIENT_FORM);
        return;
      case PAGE.RECIPIENT_FORM:
        setPage(PAGE.REVIEW_ORDER);
        return;
      default:
        return;
    }
  }, [page]);

  return (
    <Background>
      <Header canGoBack={true} title={'Create Order'} />

      <Board>
        <ProgressIndicator page={page} />
        <Form styles={styles.form} page={page} onFlip={handleFlip} />
      </Board>
    </Background>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 24,
  },
});
