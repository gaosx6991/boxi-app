import React, {PropsWithChildren, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {LayoutChangeEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import {ContainerHeightContext} from './ContainerHeightContext.ts';

type Props = PropsWithChildren;

export default (props: Props) => {
  const [height, setHeight] = useState<number>(0);

  const handleLayoutChange = useCallback((event: LayoutChangeEvent) => {
    setHeight(event.nativeEvent.layout.height);
  }, []);

  return (
    <View onLayout={handleLayoutChange} style={styles.root}>
      <ContainerHeightContext.Provider value={height}>
        {props.children}
      </ContainerHeightContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    flexDirection: 'column',
    gap: 32,
  },
});
