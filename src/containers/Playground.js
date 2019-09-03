import React, { memo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useMappedState } from 'redux-react-hook';
import { useMappedActions } from '../utils/useMappedActions';
import { useOnUpdate } from '../utils/useOnUpdate';
import { useOnMount } from '../utils/useOnMount';
import { actions } from '../actions';
import { GRADIENT_COLORS } from '../config/colors';
import LinearGradient from 'react-native-linear-gradient';
import GameCards from '../components/GameCard.js';

const mapState = state => ({
    gameState: state.game.gameStatus,
    followThe: state.game.followThe,
    score: state.game.score,
    cardStack: state.game.cardStack,
    timeLeft: state.game.timeLeft
});

const mapActions = {
    navigateToMenu: () => ({ type: actions.navigateToMenu }),
    startGame: () => ({ type: actions.startGame }),
    swipe: correct => ({ type: actions.swipe, correct }),
};

export const Playground = memo(() => {

    const { score, timeLeft, gameState, cardStack, followThe } = useMappedState(mapState);
    const { navigateToMenu, startGame, swipe } = useMappedActions(mapActions);

    useOnMount(() => {
        startGame();
    })

    useOnUpdate(prevGameState => {

    }, gameState)


    useOnUpdate(prevState => {

    }, gameState)

    return (
        <LinearGradient colors={GRADIENT_COLORS}>
            <View style={styles.container}>
                <View style={styles.statsArea}>
                    <Text>{`GAME STATE: ${gameState}`}</Text>
                    <Text>{`FOLLOW THE ${followThe}`}</Text>
                    <Text>{score}</Text>
                    <Text>{timeLeft}</Text>
                </View>
                {gameState === 'PLAYING' && (
                    <View style={styles.gameArea}>
                        <GameCards
                            swipe={swipe}
                            cardStack={cardStack}
                        />
                    </View>
                )}
                {gameState === 'SHOWING_RESULT' && (
                    <View style={styles.gameArea}>
                    </View>
                )}
            </View>
        </LinearGradient>
    )
});

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    statsArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameArea: {
        flex: 2,
    }
});
