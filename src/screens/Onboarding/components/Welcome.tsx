import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';

export default () => {
  const handleRegisterPress = useCallback(() => {}, []);

  const renderDropShadow = useCallback(() => {
    return (
      <DropShadow
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 5,
        }}>
        <View
          style={{
            width: '100%',
            height: 16,
            marginBottom: -11,
            borderRadius: 16,
            backgroundColor: '#FAFAFA',
          }}></View>
      </DropShadow>
    );
  }, []);

  const [bottom, setBottom] = useState(-300);

  const rootStyle = useMemo(() => {
    return {
      bottom,
    };
  }, [bottom]);

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setBottom(0);
    }, 200);
  }, []);

  return (
    <View style={[styles.root, rootStyle]}>
      {renderDropShadow()}

      <View style={styles.container}>
        <Text style={styles.titleTxt}>Welcome to Boxi 👋 </Text>

        <TouchableOpacity style={styles.emailLoginBtn} activeOpacity={0.7}>
          <Text style={styles.emailLoginTxt}>Continue with Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.phoneNumberLoginBtn}
          activeOpacity={0.7}>
          <Text style={styles.phoneNumberLoginTxt}>
            Continue with Phone Number
          </Text>
        </TouchableOpacity>

        <Text style={styles.registerTxt}>
          Don’t have an account?{' '}
          <Text style={styles.registerBtn} onPress={handleRegisterPress}>
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'column',
  },
  container: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    height: 288,
    borderRadius: 16,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  titleTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 26,
    marginLeft: 20,
  },
  emailLoginBtn: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    backgroundColor: '#5B57BA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emailLoginTxt: {
    fontSize: 16,
    color: '#FFF',
  },
  phoneNumberLoginBtn: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  phoneNumberLoginTxt: {
    fontSize: 16,
    color: '#1B1B1B',
  },
  registerTxt: {
    fontSize: 14,
    color: '#00000060',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  registerBtn: {
    fontWeight: 'bold',
    color: '#5B57BA',
  },
});
