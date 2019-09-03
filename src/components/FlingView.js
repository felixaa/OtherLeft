import React, { memo, useCallback } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import {
    FlingGestureHandler,
    Directions,
    State
} from 'react-native-gesture-handler';
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

export const FlingView = memo(({ children, onFlingFinished }) => {

    let touchX = new Animated.Value(0);
    let translateX = Animated.add(touchX, new Animated.Value(0));

    const onFling = ({ nativeEvent }, offset) => {
        if (nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(touchX, {
                toValue: touchX._value + offset,
                useNativeDriver: true,
            }).start(onFlingFinished);
        }
    }

    return (
      <FlingGestureHandler
          direction={Directions.LEFT}
          onHandlerStateChange={e => onFling(e, -windowWidth)}>
          <Animated.View style={[
              styles.wrapper,
              {transform: [{ translateX }]}
          ]}>
              {children}
          </Animated.View>
      </FlingGestureHandler>
    )
})

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        width: '100%',
    }
})

export default FlingView
