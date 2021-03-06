import React, {useMemo} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {WhiteCard} from '../../../../../ui/atoms/card/white-card'
import {ProfileTitle} from '../../ui/atoms/profile-title'
import {GrayLine} from '../../ui/atoms/gray-line'
import {styleConfig} from '../../../../../StyleConfig'
import {RightArrowSVG} from '../../../../../ui/atoms/icons'
import {useNavigate} from '../../../../../lib/hooks'
import {links} from '../../../../../navigation/links'
import {useStore} from 'effector-react'
import {$loadHistory} from '../../screens/completed-loads/models/models'

export const MostRecentLoad: React.FC = () => {
    const navigate = useNavigate()

    const loadHistory = useStore($loadHistory)
    const rateTotal = loadHistory[0].load.driver_price

    const loadList = useMemo(() => {
        return loadHistory.map((el) => el.load)
    }, [loadHistory])

    const onPressSeeAllLoads = () => {
        navigate(links.completedLoads, {loads: loadList})
    }

    return (
        <View style={styles.container}>
            <ProfileTitle>Most recent load</ProfileTitle>
            <WhiteCard style={{padding: 16}}>
                <View style={styles.row}>
                    <Text style={[styles.text, styles.title]}>Your rate</Text>
                    <Text style={[styles.text, styles.moneyValue]}>{rateTotal} $</Text>
                </View>
                <View style={[styles.row, {marginTop: 7}]}>
                    <Text style={[styles.text, styles.title]}>Payment status</Text>
                    <View style={styles.statusWrapper}>
                        <Text style={[styles.text, styles.statusTitle]}>Pending</Text>
                    </View>
                </View>
                <GrayLine style={{marginTop: 13}}/>
                <TouchableOpacity onPress={onPressSeeAllLoads} style={styles.seeAllCompletedLoadsButton}>
                    <Text style={styles.seeAllCompletedLoadsTitle}>See all completed loads</Text>
                    <RightArrowSVG/>
                </TouchableOpacity>
            </WhiteCard>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 40,
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 14,
        lineHeight: 18,
        fontFamily: 'IBMPlex-500',
    },
    title: {
        color: '#798293',
    },
    moneyValue: {
        color: styleConfig.textColor.dark,
    },
    statusWrapper: {
        backgroundColor: '#ECF5FF',
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 6,
    },
    statusTitle: {
        color: '#3284D2',
    },
    seeAllCompletedLoadsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 11,
    },
    seeAllCompletedLoadsTitle: {
        color: styleConfig.textColor.dark,
        fontSize: 16,
        lineHeight: 21,
    },
})
