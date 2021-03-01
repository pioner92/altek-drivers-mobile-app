import React, {useState} from 'react'
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {ProfileTitle} from '../../ui/atoms/profile-title'
import {WhiteCard} from '../../../../src/ui/atoms/card/white-card'
import {GrayLine} from '../../ui/atoms/gray-line'
import * as Progress from 'react-native-progress'
import {InfoSVG} from '../../../../src/ui/atoms/icons'
// @ts-ignore
import {PopoverComponent} from '../../../../src/features/popover/popover'

const {width} = Dimensions.get('window')

export const Rewards: React.FC = () => {
    const [isVisiblePopover, setIsVisiblePopover] = useState(false)

    const onPressInfo = () => {
        setIsVisiblePopover((prevState) => !prevState)
    }

    return (
        <View style={styles.container}>
            <ProfileTitle>Rewards</ProfileTitle>
            <WhiteCard style={{padding: 16}}>
                <Text style={styles.currentPoints}>300
                    <Text style={styles.allPoints}>/1000 points</Text>
                </Text>
                <Text style={styles.lackPoints}>700
                    <Text style={{color: '#000', fontSize: 12, lineHeight: 16, fontFamily: 'IBMPlex-400'}}> points
                        till
                        the next rank</Text>
                </Text>
                <Progress.Bar
                    progress={0.8}
                    width={width - 64}
                    color={'#3284D2'}
                    unfilledColor='#ECF5FF'
                    borderWidth={0}
                    borderRadius={3}
                />
                <GrayLine style={{marginTop: 12}}/>
                <View style={styles.pointsInfo}>
                    <Text style={styles.pointsInfoTitle}>How to get points</Text>
                    <View>
                        <PopoverComponent
                            Content={TextPopover}
                            isVisible={isVisiblePopover}
                            placement='bottom'
                        >
                            <TouchableOpacity onPress={onPressInfo}>
                                <InfoSVG/>
                            </TouchableOpacity>
                        </PopoverComponent>
                    </View>
                </View>
            </WhiteCard>
        </View>

    )
}


const TextPopover = () => {
    return (
        <View>
            <Text style={styles.popoverText}>
                Earn points for each completed load. You’ll get 10% to 20% from each transaction.

            </Text>
            <Text style={[styles.popoverText, {marginTop: 16}]}>
                Cash out after reaching the next rank or spend it on a discount from our partners!
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 34,
    },
    currentPoints: {
        fontSize: 18,
        lineHeight: 23,
        fontFamily: 'IBMPlex-600',
        color: '#000',
    },
    allPoints: {
        fontFamily: 'IBMPlex-400',
        fontSize: 16,
        lineHeight: 21,
    },
    lackPoints: {
        marginTop: 5,
        color: '#1672D4',
        fontSize: 16,
        fontFamily: 'IBMPlex-500',
        lineHeight: 21,
        marginBottom: 10,
    },
    pointsInfo: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingTop: 12,
        alignItems: 'center',
    },
    pointsInfoTitle: {
        color: '#798293',
        fontSize: 16,
        lineHeight: 21,
    },
    popoverText: {
        fontSize: 13,
        lineHeight: 16,
        color: '#677E85',
        fontFamily: 'IBMPlex-500',
    },

})
