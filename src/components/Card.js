import * as React from 'react';
import {
  Image, StyleSheet, View, Text
} from 'react-native';
import Animated from 'react-native-reanimated'
import LEFT from '../assets/left.png'
import RIGHT from '../assets/right.png'

export const Card = ({ direction, successOpacity = 0, failOpacity = 0 }) => {
    return (
        <View style={StyleSheet.absoluteFill}>
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Animated.View style={{ opacity: successOpacity }}>
                        <Text style={direction === 'RIGHT' ? styles.successLabel :styles.failLabel}>
                            {direction === 'RIGHT' ? 'YASS' : 'OTHER LEFT'}
                        </Text>
                    </Animated.View>
                    <Animated.View style={{ opacity: failOpacity }}>
                        <Text style={direction === 'LEFT' ? styles.successLabel : styles.failLabel}>
                            {direction === 'LEFT' ? 'YASS' : 'OTHER RIGHT'}
                        </Text>
                    </Animated.View>
                </View>
                <Image style={{ height: 200, width: 200, resizeMode: 'contain' }} source={direction === 'LEFT' ? RIGHT : LEFT}/>
                <View style={styles.footer}>
                    <Text style={styles.name}>{`SWIPE ${direction}`}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
        borderRadius: 8,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footer: {
        flexDirection: 'row',
    },
    name: {
        fontSize: 32,
    },
    success: {
        borderRadius: 5,
        padding: 8,
        borderColor: '#6ee3b4',
    },
    successLabel: {
        fontSize: 24,
        color: '#6ee3b4',
        fontFamily: 'Interface-Bold'

    },
    fail: {
        borderRadius: 5,
        padding: 8,
        borderColor: '#ec5288',
    },
    failLabel: {
        fontSize: 24,
        color: '#ec5288',
        fontFamily: 'Interface-Bold',
    },
});

export default Card;
