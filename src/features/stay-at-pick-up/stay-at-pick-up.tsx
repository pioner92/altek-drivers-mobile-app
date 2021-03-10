import React from 'react'
import {Animated, StyleSheet, Text} from 'react-native'
import {DarkBg} from '../../ui/atoms/dark-bg'
import {useInterpolate} from '../../../utils/animation-hooks/Hooks'
import {useStore} from 'effector-react'
import {$isMounted} from './models'
import {$stayAtPickUpAnimValue} from './models/models'
import {$selfStatus, statuses} from '../../../hooks'
import {CardTopModal} from '../../ui/molecules/card-top-modal/card-top-modal'


export const StayAtPickUp: React.FC = () => {
    const value = useStore($stayAtPickUpAnimValue)
    const selfStatus = useStore($selfStatus)
    const isMounted = useStore($isMounted)

    const modalInterpolateY = useInterpolate(value, [0, 1], [-500, 0])
    const opacityInterpolate = useInterpolate(value, [0, 1], [0, 1])

    const animModalStyle = {
        transform: [
            {translateY: modalInterpolateY},
        ],
    }

    const opacity = {
        opacity: opacityInterpolate,
    }

    const titleValidate = () => {
        return selfStatus === statuses.completed ? 'Stay at Delivery' : 'Stay at Pick-Up'
    }

    if (isMounted) {
        return (
            <Animated.View style={[styles.container, opacity]}>
                <DarkBg>
                    <CardTopModal style={animModalStyle} title={titleValidate()} labelWrapperColor='red'>
                        <Text>Please wait for approval to leave.
                            The dispatcher is checking load information</Text>
                    </CardTopModal>
                </DarkBg>
            </Animated.View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 3,
    },
    topModalWrapper: {
        paddingHorizontal: 16,
        // marginTop: 21,
    },
})
