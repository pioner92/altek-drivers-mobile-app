import React from 'react'
import {StyleSheet, View} from 'react-native'
import {TitleGrey} from '../../../../features/load-verified'
import {useNavigate} from '../../../../lib/hooks'
import {LoadWithCurrent} from '../features'
import {Button} from '../../../../ui/atoms/buttons'
import {ScreenWrapper} from '../../../../ui/atoms/screen-wrapper/screen-wrapper'
import {WrapperPaddingBottom} from '../../../../ui/atoms/wrapper/wrapper-padding-bottom'
import {useStore} from 'effector-react'
import {$currentLoad} from '../../load-info/models'
import {styleConfig} from '../../../../StyleConfig'
import {links} from '../../../../navigation/links'

export const UploadingVerificationStep1: React.FC = () => {
    const navigate = useNavigate()
    const currentLoad = useStore($currentLoad)

    const onClickConfirm = () => {
        navigate(links.loadingVerified2)
    }

    const getPiecesInfo = () => {
        if (currentLoad) {
            const {width = 0, height = 0, length = 0} = currentLoad || {}
            if (width && height && length) {
                return `${length}x${width}x${height}`
            }
            return 'Not supplied'
        }
        return 'Not supplied'
    }

    return (
        <ScreenWrapper isEnabledHeightController={true} safeAreaStyle={{backgroundColor: styleConfig.screenBackground}}>
            <View style={styles.container}>
                <TitleGrey>Type in the verified load information </TitleGrey>
                <LoadWithCurrent piecesDescription={getPiecesInfo()} weightDescription={'lbs'}/>
                <WrapperPaddingBottom style={styles.btnWrapper}>
                    <Button onPress={onClickConfirm}>Continue</Button>
                </WrapperPaddingBottom>
            </View>
        </ScreenWrapper>
    )
}


const styles = StyleSheet.create({
    container: {
        // flex:1,
        height: '100%',
        paddingHorizontal: 16,
        paddingTop: 27,
    },
    btnWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
    },
    title: {
        color: '#7E7E7E',
        fontSize: 14,
        fontFamily: 'IBMPlex-500',
        lineHeight: 18,
        marginBottom: 10,
        paddingLeft: 16,
        marginTop: 27,
    },
})
