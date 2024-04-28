import * as React from 'react';
import {useContext} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  TabActionHelpers,
  TabNavigationState,
  TabRouter,
  TabRouterOptions,
  useNavigationBuilder,
} from '@react-navigation/native';
import OnProgress from './OnProgress.tsx';
import Complete from './Complete.tsx';
import {ContainerHeightContext} from './ContainerHeightContext.ts';

// Props accepted by the view
type TabNavigationConfig = {
  tabBarStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

// Supported screen options
type TabNavigationOptions = {
  title?: string;
};

// Map of event name and the type of data (in event.data)
//
// canPreventDefault: true adds the defaultPrevented property to the
// emitted events.
type TabNavigationEventMap = {
  tabPress: {
    data: {isAlreadyFocused: boolean};
    canPreventDefault: true;
  };
};

// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap
> &
  TabRouterOptions &
  TabNavigationConfig;

function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
}: Props) {
  const {state, navigation, descriptors, NavigationContent} =
    useNavigationBuilder<
      TabNavigationState<ParamListBase>,
      TabRouterOptions,
      TabActionHelpers<ParamListBase>,
      TabNavigationOptions,
      TabNavigationEventMap
    >(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
    });

  return (
    <NavigationContent>
      <View style={[{flexDirection: 'row'}, tabBarStyle]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const focusedRouteTxtStyle: StyleProp<TextStyle> = {
            fontWeight: 'bold',
            color: '#5B57BA',
          };

          const handlePress = () => {
            navigation.navigate(route.name, route.params);
          };

          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={route.key}
              style={styles.routeBtn}
              onPress={handlePress}>
              <Text
                style={[
                  styles.routeTxt,
                  isFocused ? focusedRouteTxtStyle : {},
                ]}>
                {descriptors[route.key].options.title ?? route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={[{width: '100%'}, contentStyle]}>
        {state.routes.map((route, i) => {
          return (
            <View
              key={route.key}
              style={[
                StyleSheet.absoluteFill,
                {display: i === state.index ? 'flex' : 'none'},
              ]}>
              {descriptors[route.key].render()}
            </View>
          );
        })}
      </View>
    </NavigationContent>
  );
}

const styles = StyleSheet.create({
  routeBtn: {
    flex: 1,
  },
  routeTxt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    color: '#464646',
  },
});

const createTopTabNavigator = createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap,
  typeof TabNavigator
>(TabNavigator);

const TopTab = createTopTabNavigator();

export default () => {
  const height = useContext(ContainerHeightContext);
  return (
    <TopTab.Navigator contentStyle={{height}}>
      <TopTab.Screen name="On Progress" component={OnProgress} />
      <TopTab.Screen name="Complete" component={Complete} />
    </TopTab.Navigator>
  );
};
