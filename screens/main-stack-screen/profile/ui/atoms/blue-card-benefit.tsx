import React from 'react'
import {StyleSheet, View} from 'react-native'
import {BenefitSVG} from '../../../../../src/ui/atoms/icons/benefit-svg'
import {styleConfig} from '../../../../../src/StyleConfig'

export const BlueCardBenefit: React.FC = () => {
    return (
        <View style={[styles.container, styleConfig.shadowMenu]}>
            <BenefitSVG/>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: 68,
        height: 97,
        backgroundColor: '#1672D4',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
