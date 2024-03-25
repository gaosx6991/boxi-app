import React, {PropsWithChildren, useCallback} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// @ts-ignore
import back from '../../../assets/back.png';
// @ts-ignore
import map from '../../../assets/map.png';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigatorProps} from 'react-native-screens/lib/typescript/native-stack/types';

type Props = PropsWithChildren;

export default (props: Props) => {
  const navigation = useNavigation<NativeStackNavigatorProps>();

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <ImageBackground
        style={styles.container}
        imageStyle={styles.backgroundImg}
        source={map}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backBtn}
          onPress={handleBackPress}>
          <Image style={styles.backImg} source={back} />
        </TouchableOpacity>
        {props.children}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#5B57BA',
  },
  container: {
    flex: 1,
  },
  backgroundImg: {
    flex: 1,
    resizeMode: 'cover',
  },
  backBtn: {
    marginTop: StatusBar.currentHeight ? 16 + StatusBar.currentHeight : 16,
    marginLeft: 20,
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImg: {
    width: 24,
    height: 20,
    resizeMode: 'cover',
    tintColor: '#5B57BA',
  },
});
