import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {ProfileTitle} from '../../ui/atoms/profile-title'
import {BlueCardBenefit} from '../../ui/atoms/blue-card-benefit'
import {styleConfig} from '../../../../src/StyleConfig'

export const Benefits: React.FC = () => {
    return (
        <View style={styles.container}>
            <ProfileTitle>Benefits</ProfileTitle>
            <View style={styles.benefitWrapper}>
                <View style={styles.benefitLeftBlock}>
                    <BlueCardBenefit/>
                    <View style={[styles.benefitWhiteBlock, styleConfig.shadowMenu]}>
                        <Text style={styles.title}>American Oil</Text>
                        <Text style={styles.subtitle}>Get 20% off on your next diesel refueling for 1000 points!</Text>
                        <TouchableOpacity style={styles.claimButton}>
                            <Text style={styles.claimButtonLabel}>Claim</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.benefitRightBlock}>
                    <BlueCardBenefit/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 34,
    },
    benefitRightBlock: {
        // alignSelf:"flex-end",
        transform: [{translateX: 16}],
    },
    benefitWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    benefitLeftBlock: {
        flexDirection: 'row',
        height: 96,
        flex: 1,
    },
    benefitWhiteBlock: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
    },
    title: {
        fontSize: 12,
        lineHeight: 16,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 10,
        lineHeight: 13,
    },
    claimButton: {
        backgroundColor: '#1672D4',
        height: 20,
        width: 57,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 12,

    },
    claimButtonLabel: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'IBMPlex-500',
    },
})
