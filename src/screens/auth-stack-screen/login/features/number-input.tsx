import React from 'react'
import {StyleSheet, View} from 'react-native'
import {WhiteCard} from '../../../../ui/atoms/card/white-card'
import {Input} from '../../../../ui/atoms/input'
import {ErrorSVG} from '../../../../ui/atoms/icons/error-swg'
import {useStore} from 'effector-react'
import {$isNumberValidateFailed} from '../models/models'
import {$inputValuePhoneNumber, setInputValuePhoneNumber} from './models/models'

export const NumberInput: React.FC = () => {
    const isNumberValidateFailed = useStore($isNumberValidateFailed)
    const inputValue = useStore($inputValuePhoneNumber)

    return (
        <WhiteCard>
            <View style={styles.container}>
                <Input onChange={setInputValuePhoneNumber} placeholder='+1 999 999 9999' value={inputValue}/>
                {isNumberValidateFailed &&
                <View style={{transform: [{translateX: -33}]}}>
                    <ErrorSVG/>
                </View>
                }
            </View>
        </WhiteCard>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
