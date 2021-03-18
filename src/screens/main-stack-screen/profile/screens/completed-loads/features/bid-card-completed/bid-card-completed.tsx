import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {loadType} from '../../../../../../../api/rest/loads/types'
import {StepsWithTitle} from '../../../../../../../ui/organisms/steps-with-title/steps-with-title'
import {styleConfig} from '../../../../../../../StyleConfig'
import {RightArrowSVG} from '../../../../../../../ui/atoms/icons'
import {links} from '../../../../../../../navigation/links'
import {useNavigate} from '../../../../../../../lib/hooks'
import {loadHistoryCardTheme} from '../../lib/load-history-card-theme'

type propsType = {
    item: loadType
}
export const BidCardCompleted: React.FC<propsType> = ({item}) => {
    const navigate = useNavigate()

    const onPress = () => {
        navigate(links.bidDetail, {item})
    }

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, styleConfig.shadowMenu]}>
            <Header status='completed'/>
            <View style={styles.content}>
                <StepsWithTitle titleTop={item.pickUpAt} titleBottom={item.deliverTo}/>
                <View style={styles.rateWrapper}>
                    <Text style={styles.rateTitle}>Your rate:</Text>
                    <Text style={styles.rateValue}> {item.driver_price}$</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

type headerType = {
    status: 'completed' | 'pending'
}

const Header: React.FC<headerType> = ({status}) => {
    const {backgroundColor, color} = loadHistoryCardTheme(status)
    return (
        <View style={[styles.header, {backgroundColor}]}>
            <Text style={[styles.headerTitle, {color}]}>Completed</Text>
            <RightArrowSVG {...{color}}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderRadius: 12,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        height: 38,
        borderBottomWidth: 1,
        borderColor: '#F4F4F4',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderTopRightRadius: 12,
        borderTopStartRadius: 12,
    },
    headerTitle: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: 'IBMPlex-600',
    },
    content: {
        width: '100%',
        padding: 12,
        justifyContent: 'space-between',
    },
    rateWrapper: {
        flexDirection: 'row',
        padding: 5,
    },
    rateTitle: {
        fontSize: 14,
        lineHeight: 18,
        color: '#798293',
        fontFamily: 'IBMPlex-400',
    },
    rateValue: {
        fontSize: 14,
        lineHeight: 18,
        fontFamily: 'IBMPlex-600',
        color: '#1F2934',
    },
})
