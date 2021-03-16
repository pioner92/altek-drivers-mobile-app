import React, {useEffect} from 'react'
import {Animated, StyleSheet, Text, View} from 'react-native'
import {Circle, Svg} from 'react-native-svg'
import {useInterpolate, useTiming, useValue} from '../../lib/animation-hooks/Hooks'
import {styleConfig} from '../../StyleConfig'
import {useStore} from 'effector-react'
import {$animValuePreloader, $isMountedPreloader} from './models/models'


export const Preloader: React.FC = () => {
    const isMounted = useStore($isMountedPreloader)
    const animValueY = useStore($animValuePreloader)
    const animValueRotate = useValue(0)

    const interpolateY = useInterpolate(animValueY, [0, 1], [500, 0])
    const interpolateRotate = useInterpolate(animValueRotate, [0, 1], ['0deg', '360deg'])
    const interpolateOpacity = useInterpolate(animValueY, [0, 1], [0, 1])

    const AnimatedCircle = Animated.createAnimatedComponent(Circle)


    const animStyle = {
        transform: [
            {'rotate': interpolateRotate},
        ],
    }

    const animStyleY = {
        transform: [
            {translateY: interpolateY},
        ],
        opacity: interpolateOpacity,
    }

    useEffect(() => {
        const animated = Animated.sequence([useTiming(animValueRotate, 1, 2000), useTiming(animValueRotate, 0, 2000)])
        if (isMounted) {
            Animated.loop(animated).start()
        } else {
            animated.stop()
            Animated.loop(animated).stop()
        }
    }, [isMounted])


    if (isMounted) {
        return (
            <Animated.View style={[styles.container, animStyleY]}>
                <View style={[styles.whiteBlock, styleConfig.shadowModal]}>

                    <Text style={styles.title}>Please wait...</Text>
                    <Animated.View style={[animStyle, {width: 100, height: 100}]}>
                        <Svg>
                            <AnimatedCircle
                                opacity={1}
                                strokeWidth={2} r={40} cy={'50%'} cx={'50%'}
                                stroke={'#E4E2E3'}
                            />
                            <AnimatedCircle
                                strokeDashoffset={'bold'}
                                strokeWidth={2} r={40} cy={'50%'} cx={'50%'}
                                strokeDasharray={['100%', '100%']} stroke={'#1672D4'}
                            />

                        </Svg>
                    </Animated.View>
                </View>
            </Animated.View>
        )
    } else return null
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        position: 'absolute',
        zIndex: 1000,
    },
    whiteBlock: {
        marginTop: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#fff',
        height: 178,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    title: {
        fontSize: 14,
        fontFamily: 'IBMPlex-500',
        lineHeight: 18,
        color: '#798293',
    },
})
