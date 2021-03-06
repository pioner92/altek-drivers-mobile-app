import React from 'react'
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {WhiteCard} from '../../../../../../ui/atoms/card/white-card'
import {LogOutSVG} from '../../../../../../ui/atoms/icons/log-out-svg'
import {styleConfig} from '../../../../../../StyleConfig'
import {showLogOutAnimMenu} from './log-out-anim-menu/models/models'


export const LogOut: React.FC = () => {
    const onPressLogOut = async () => {
        showLogOutAnimMenu()
    }

    return (
        <View style={styles.container}>
            <WhiteCard style={{paddingBottom: 0}}>
                <TouchableOpacity onPress={onPressLogOut}>
                    <View style={styles.logoutWrapper}>
                        <Text style={styles.title}>Log Out</Text>
                        <LogOutSVG/>
                    </View>
                </TouchableOpacity>
            </WhiteCard>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 0 : 31,
    },
    logoutWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 12,
        paddingLeft: 16,
        paddingRight: 13,
    },
    title: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: 'IBMPlex-400',
        color: styleConfig.textColor.dark,
    },
})
