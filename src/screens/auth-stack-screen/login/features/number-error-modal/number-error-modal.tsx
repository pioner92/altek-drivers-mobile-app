import React from 'react'
import {Animated, StyleSheet, Text, View} from 'react-native'
import {useStore} from 'effector-react'
import {$animValueNumberErrorModal, $isMountedNumberErrorModal} from './models/models'
import {useInterpolate} from '../../../../../../utils/animation-hooks/Hooks'

export const NumberErrorModal: React.FC = () => {
    const animValue = useStore($animValueNumberErrorModal)
    const isMounted = useStore($isMountedNumberErrorModal)

    const interpolateY = useInterpolate(animValue, [0, 1], [-200, 0])

    const animStyle = {
        transform: [
            {translateY: interpolateY},
        ],
    }
    if (isMounted) {
        return (
            <Animated.View style={[styles.container, animStyle]}>
                <View style={styles.wrapper}>
                    <Text style={styles.text}>Error: your number doesn't exist in the database.
                        Please try again or sign up.</Text>
                </View>

            </Animated.View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        top: 20,
        paddingHorizontal: 18,
    },
    wrapper: {
        height: 48,
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowColor: '#f7b8b8',
        padding: 8,
        flexWrap: 'nowrap',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 2.22,
        elevation: 15,
    },
    text: {
        color: '#CD3A55',
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'IBMPlex-500',
    },
})
