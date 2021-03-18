import {ScreenWrapper} from '../../../../ui/atoms/screen-wrapper/screen-wrapper'
import React, {useLayoutEffect} from 'react'
import {StackScreenProps} from '@react-navigation/stack'
import {HeaderRightChatContent} from '../chat-content/features/header-right-chat-content/header-right-chat-content'
import {Linking, StyleSheet, View} from 'react-native'
import {BtnWrapper} from '../../../../ui/atoms/wrapper/btn-wrapper'
import {Button} from '../../../../ui/atoms/buttons'
import {CompanyNumberCard} from './ui/atoms/company-number-card'
import {DispatcherNumberCard} from './ui/molecules/dispatcher-number-card'
import {chatUsersType} from '../../../../api/rest/chat/get-chats'


export const CallScreen: React.FC<StackScreenProps<any>> = ({navigation, route}) => {

    const users = route.params?.users as chatUsersType
    const companyPhone = route.params?.companyPhone

    const onPressMakeCall = () => {
        if (companyPhone) {
            Linking.openURL(`tel:${companyPhone}`)
        }
    }

    const onPressGoBack = () => {
        navigation.goBack()
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (<HeaderRightChatContent onPressPhone={onPressGoBack}/>),
        })
    }, [])

    return (
        <ScreenWrapper isEnabledHeightController={true}>
            <View style={styles.container}>
                <CompanyNumberCard number={companyPhone}/>
                {users.map((el) => {
                    return (
                        <DispatcherNumberCard
                            avatar={el.avatar}
                            key={el.id}
                            extension={el.phone_number}
                            departament={el.department}
                            name={`${el.first_name} ${el.last_name}`}
                        />
                    )
                })}
            </View>
            <BtnWrapper style={styles.buttonWrapper}>
                <Button onPress={onPressMakeCall}>Make a call</Button>
                <Button theme='white' onPress={onPressGoBack}>Go back</Button>
            </BtnWrapper>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    card: {
        height: 53,
        paddingHorizontal: 12,
        marginTop: 20,
    },
    buttonWrapper: {
        height: 133,
        marginTop: 'auto',
        justifyContent: 'space-between',
    },
})
