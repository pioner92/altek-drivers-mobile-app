import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {DetailCard, InfoCard} from '../../src/features/bids-info'
import {Notes} from '../../src/features/bids-info/ui/atoms'
import {PriceAreaComponent} from '../../src/features/bids-info/ui/molecules/price-area-component'
import {useNavigate} from '../../src/lib/hooks'
import {useStore} from 'effector-react'
import {$currentLoad} from './models'
import links from '../../links.json'
import {Button} from '../../src/ui/atoms/buttons'
import {ScreenWrapper} from '../../src/ui/atoms/screen-wrapper/screen-wrapper'
import {styleConfig} from '../../src/StyleConfig'
import {BtnWrapper} from '../../src/ui/atoms/wrapper/btn-wrapper'


export const LoadInfo: React.FC<any> = ({route}) => {
    const currentLoadData = useStore($currentLoad)
    const navigate = useNavigate()


    const calculationPerMile = () => {
        if (currentLoadData) {
            const value = currentLoadData?.driver_price / currentLoadData?.miles
            const valueString = value.toString().split('.')

            if (valueString.length > 1) {
                const count = valueString[1].length
                return value.toFixed(count === 1 ? 1 : 2)
            }
            return value
        }
        return 0
    }

    const onClickToBack = () => {
        navigate(links.home)
    }
    return (
        <>
            <ScreenWrapper isEnabledHeightController={true}>
                <ScrollView contentContainerStyle={{paddingBottom: 100, paddingTop: 27}} style={styles.container}>
                    <InfoCard data={currentLoadData!}/>
                    <Notes notes={currentLoadData!.note}/>
                    <View style={styles.priceAreasWrapper}>
                        <PriceAreaComponent value={currentLoadData!.driver_price?.toString()} description='Your bid'/>
                        <View style={{width: 16}}/>
                        <PriceAreaComponent value={calculationPerMile().toString()} description='Per mile'/>
                    </View>
                    <DetailCard data={currentLoadData!}/>
                </ScrollView>
                <BtnWrapper>
                    <Button onPress={onClickToBack}>Go back</Button>
                </BtnWrapper>
            </ScreenWrapper>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 50,
    },
    priceAreasWrapper: {
        flexDirection: 'row',
        height: 100,
        marginTop: 26,
    },
    btnWrapper: {
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 16,
        bottom: 0,
        paddingVertical: 16,
        backgroundColor: styleConfig.screenBackground,
    },

})
