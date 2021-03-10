import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {ProfileTitle} from '../../ui/atoms/profile-title'
import {WhiteCard} from '../../../../../src/ui/atoms/card/white-card'
import {GrayLine} from '../../ui/atoms/gray-line'
import {Switch, switchPropsType} from '../../../../../src/ui/molecules/swith/switch'
import {styleConfig} from '../../../../../src/StyleConfig'
import {useNavigate} from '../../../../../src/lib/hooks'
import links from '../../../../../links.json'

export const Account: React.FC = () => {
    const navigate = useNavigate()

    const languageOptions = [
        {label: 'EN', value: 1},
        {label: 'RU', value: 2},
    ]

    const notificationOptions = [
        {label: 'ON', value: 1},
        {label: 'OFF', value: 2},
    ]

    const onPressMyCard = () => {
        navigate(links.myCards)
    }

    const onChangeLanguage = (value: number) => {
    }
    const onChangeBidNotification = (value: number) => {
    }

    return (
        <View style={styles.container}>
            <ProfileTitle>Account</ProfileTitle>
            <WhiteCard style={{padding: 16}}>
                <TouchableOpacity onPress={onPressMyCard}>
                    <Text style={styles.title}>My Card</Text>
                </TouchableOpacity>
                <Line/>
                <SwitchRow
                    onChange={onChangeLanguage}
                    options={languageOptions}
                    title='Language'
                />
                <Line/>
                <SwitchRow
                    onChange={onChangeBidNotification}
                    options={notificationOptions}
                    title='Bid notifications'
                />
                <Line/>
            </WhiteCard>
        </View>
    )
}


const Line = () => {
    return (
        <GrayLine style={{marginTop: 11}}/>
    )
}

type titleType = {
    title: string
}
type switchRowPropsType = switchPropsType & titleType

const SwitchRow: React.FC<switchRowPropsType> = ({title, onChange, options}) => {
    return (
        <View style={styles.row}>
            <Text style={styles.title}>{title}</Text>
            <Switch options={options} onChange={onChange}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 11,
    },
    title: {
        fontSize: 16,
        lineHeight: 21,
        color: styleConfig.textColor.dark,
    },
})
