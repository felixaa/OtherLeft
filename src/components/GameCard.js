import React, { useState, useEffect, useRef, memo, PureComponent } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useOnMount } from '../utils/useOnMount.js';
import { useOnUpdate } from '../utils/useOnUpdate.js';
import Animated from "react-native-reanimated";
import Card from './Card';
const {
    add,
    multiply,
    neq,
    spring,
    cond,
    eq,
    event,
    lessThan,
    greaterThan,
    greaterOrEq,
    or,
    lessOrEq,
    and,
    call,
    set,
    clockRunning,
    startClock,
    stopClock,
    Clock,
    Value,
    concat,
    interpolate,
    Extrapolate,
} = Animated;

function runSpring(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

const { width, height } = Dimensions.get("window");
const toRadians = angle => angle * (Math.PI / 180);
const rotatedWidth = width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));

export default class GameCards extends PureComponent {
    constructor(props) {
        super(props)
        this.translationX = new Value(0)
        this.translationY = new Value(0)
        this.gestureState = new Value(State.UNDETERMINED);
        this.velocityX = new Value(0);
        this.offsetY = new Value(0);
        this.offsetX = new Value(0);
        this.onGestureEvent = event(
            [
                {
                    nativeEvent: {
                        translationX: this.translationX,
                        translationY: this.translationY,
                        velocityX: this.velocityX,
                        state: this.gestureState,
                    },
                },
            ],
            { useNativeDriver: true },
        );

        this.init();
    }

    init = () => {
        const clockX = new Clock();
        const clockY = new Clock();
        const {
          translationX, translationY, velocityX, gestureState, offsetY, offsetX,
        } = this;
        gestureState.setValue(State.UNDETERMINED);
        translationX.setValue(0);
        translationY.setValue(0);
        velocityX.setValue(0);
        offsetY.setValue(0);
        offsetX.setValue(0);

        const finalTranslateX = add(translationX, multiply(0.2, velocityX));
        const translationThreshold = width / 4;
        const snapPoint = cond(
          lessThan(finalTranslateX, -translationThreshold),
          -rotatedWidth,
          cond(greaterThan(finalTranslateX, translationThreshold), rotatedWidth, 0),
        );

        this.translateY = cond(
          eq(gestureState, State.END),
          [
            set(translationY, runSpring(clockY, translationY, 0)),
            set(offsetY, translationY),
            translationY,
          ],
          cond(eq(gestureState, State.BEGAN), [stopClock(clockY), translationY], translationY),
        );

        this.translateX = cond(
          eq(gestureState, State.END),
          [
            set(translationX, runSpring(clockX, translationX, snapPoint)),
            set(offsetX, translationX),
            cond(or(greaterOrEq(translationX, translationThreshold), lessOrEq(translationX, -translationThreshold)), [
                call([translationX], this.swipe),
            ]),
            translationX,
          ],
          cond(eq(gestureState, State.BEGAN), [stopClock(clockX), translationX], translationX),

        );
    }

    swipe = ([ translationX ]) => {
        const [ lastCard, ...restCardStack ] = this.props.cardStack;
        let correct = false;
        if (lastCard === 'RIGHT' && translationX >= 0) correct = true;
        if (lastCard === 'LEFT' && translationX <= 0) correct = true;
        this.props.swipe(correct)
        this.init();
    }

    render() {
        const { onGestureEvent, translateX, translateY } = this;
        const { cardStack = [] } = this.props;
        const [lastCard, ...restCardStack] = cardStack;


        const rotateZ = concat(
          interpolate(translateX, {
            inputRange: [-width / 2, width / 2],
            outputRange: [-15, 15],
            extrapolate: Extrapolate.CLAMP,
          }),
          "deg",
        );

        const successOpacity = interpolate(translateX, {
            inputRange: [0, width / 4],
            outputRange: [0, 1],
        });

        const failOpacity = interpolate(translateX, {
            inputRange: [-width / 4, 0],
            outputRange: [1, 0],
        });

        const style = {
            ...StyleSheet.absoluteFillObject,
            zIndex: 900,
            transform: [
                { translateX },
                { translateY },
                { rotateZ },
            ],
        };


        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.cards}>
                { restCardStack.reverse().map((card, index) => <Card key={index} direction={card}/>) }
                <PanGestureHandler
                    onHandlerStateChange={onGestureEvent}
                    {...{ onGestureEvent }}>
                    <Animated.View style={{ ...style }}>
                        <Card
                            direction={lastCard}
                            successOpacity={successOpacity}
                            failOpacity={failOpacity}
                        />
                    </Animated.View>
                </PanGestureHandler>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    cards: {
        flex: 1,
        marginHorizontal: 16,
        zIndex: 100,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 16,
    },
    circle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 2,
    },
});
