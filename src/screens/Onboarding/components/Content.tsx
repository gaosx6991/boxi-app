import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

// @ts-ignore
import rectangle from '../../../assets/rectangle.png';
import Indicator from '../../../components/Indicator.tsx';
import {NativeSyntheticEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import {NativeScrollEvent} from 'react-native/Libraries/Components/ScrollView/ScrollView';

type Props = {
  style: StyleProp<ViewStyle>;
};

const illustrationData = [
  {
    img: rectangle,
    desc: 'We believe that a connected world is a better world, and that belief guides everything we do.',
  },
  {
    img: rectangle,
    desc: 'We believe that a connected world is a better world, and that belief guides everything we do.',
  },
  {
    img: rectangle,
    desc: 'We believe that a connected world is a better world, and that belief guides everything we do.',
  },
];

const indicatorsData = [{id: 1}, {id: 2}, {id: 3}];

const WINDOW_WIDTH = Dimensions.get('window').width;

export default (props: Props) => {
  const [selectedId, setSelectedId] = useState(1);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {contentOffset} = event.nativeEvent;
      const page = Math.round(contentOffset.x / WINDOW_WIDTH);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setSelectedId(page + 1);
    },
    [],
  );

  return (
    <View style={[styles.root, props.style]}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}>
        {illustrationData.map((value, index, array) => {
          return (
            <View style={styles.illustration} key={index}>
              <Image source={value.img} style={styles.img} />
              <Text style={styles.desc}>{value.desc}</Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.indicators}>
        {indicatorsData.map(indicator => (
          <Indicator
            key={indicator.id}
            selected={indicator.id === selectedId}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    gap: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  illustration: {
    width: WINDOW_WIDTH,
    gap: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    width: 240,
    height: 240,
  },
  desc: {
    fontSize: 14,
    color: '#000',
    marginHorizontal: 38,
  },
  indicators: {
    width: 34,
    height: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
