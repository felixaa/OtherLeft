import React, { memo, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useMappedState } from 'redux-react-hook';
import { delay } from '../utils/delay';
import { actions } from '../actions';
import { GRADIENT_COLORS } from '../config/colors';
import { useMappedActions } from '../utils/useMappedActions';
import { useOnMount } from '../utils/useOnMount';
import FlingView from '../components/FlingView';
import LinearGradient from 'react-native-linear-gradient'; import * as Animatable from 'react-native-animatable'; import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

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

const mapState = state => ({
    highScore: state.stats.highScore
});

const mapActions = {
    navigateToPlayground: () => ({ type: actions.navigateToPlayground })
};

export const Menu = memo(() => {
    const { highScore } = useMappedState(mapState);
    const { navigateToPlayground } = useMappedActions(mapActions);
    const translationX = useRef(new Value(0));
    const gestureState = useRef(new Value(State.UNDETERMINED));
    const onGestureEvent = useRef(event(
        [
            {
                nativeEvent: {
                    translationX: translationX.current,
                    state: gestureState.current,
                },
            },
        ],
        { useNativeDriver: true },
    )).current;

    return (
        <LinearGradient colors={GRADIENT_COLORS}>
            <PanGestureHandler
                onHandlerStateChange={onGestureEvent}
                {...{ onGestureEvent }}>
                <Animated.View style={styles.container}>
                    <View style={styles.topWrapper}>
                        <Animatable.Text
                            animation={'fadeIn'}
                            style={styles.headerText}>
                            Other left!
                        </Animatable.Text>
                        <Text style={styles.highscoreTitle}>Highscore</Text>
                        <Text style={styles.highscoreText}>{highScore}</Text>
                    </View>
                    <View style={styles.botWrapper}>
                        <Animatable.Text
                            style={styles.swipeText}
                            animation={'pulse'}
                            iterationCount={'infinite'}
                            easing={'ease-out'}>
                            Swipe right to start
                        </Animatable.Text>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </LinearGradient>
    )
});

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 42,
        fontFamily: 'Interface-Bold',
        color: 'white'
    },
    topWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    swipeText: {
        fontFamily: 'Interface-Medium',
        color: 'white',
        fontSize: 20,
    },
    highscoreTitle: {
        fontFamily: 'Interface-Medium',
        fontSize: 18,
        color: 'white',
    },
    highscoreText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Interface-Regular',
    }
});
