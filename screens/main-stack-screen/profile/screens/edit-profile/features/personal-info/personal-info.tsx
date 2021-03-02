import React, {useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {ButtonEdit} from '../../../../../uploading-veriffication/features/load-attributes/ui/atoms'
import {WhiteCard} from '../../../../../../../src/ui/atoms/card/white-card'
import {Input} from '../../../../../../../src/ui/atoms/input'
import {styleConfig} from '../../../../../../../src/StyleConfig'
import {useStore} from 'effector-react'
import {
    $inputValueUserName,
    $inputValueUserPhone,
    setInputValueUserName,
    setInputValueUserPhone,
} from './models/models'

export const PersonalInfo: React.FC = () => {
    const inputValueName = useStore($inputValueUserName)
    const inputValuePhone = useStore($inputValueUserPhone)

    const setName = (name: string) => {
        setInputValueUserName(name)
    }

    const setPhone = (phone: string) => {
        setInputValueUserPhone(phone)
    }

    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>Personal info</Text>
                <ButtonEdit callback={() => {
                }}/>
            </View>
            <WhiteCard>
                <Input type='default' onChange={setName} value={inputValueName} placeholder={'Name'}/>
                <Input type='phone-pad' onChange={setPhone} value={inputValuePhone} placeholder={'Phone'}/>
            </WhiteCard>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 195,
        marginBottom: 31,
    },
    titleRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        lineHeight: 23,
        color: styleConfig.textColor.dark,
        fontFamily: 'IBMPlex-500',
    },
})
