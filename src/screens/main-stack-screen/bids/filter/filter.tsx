import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {useStore} from 'effector-react'
import {
    $deliveryPoint,
    $minimumDimsHeight,
    $minimumDimsLength,
    $minimumDimsWidth,
    $minimumPayloads,
    $pickUpPoint,
} from '../../../../../Store/FilterStore'
import {setDb} from '../../../../lib/db'
import {MaxMilesOut} from './features/max-miles-out/max-miles-out'
import {ScreenWrapper} from '../../../../ui/atoms/screen-wrapper/screen-wrapper'
import {Button} from '../../../../ui/atoms/buttons'
import {setIsFilteredBids} from './models'
import {BtnWrapper} from '../../../../ui/atoms/wrapper/btn-wrapper'
import {
    DELIVERYPOINT,
    MAXMILES,
    MINIMUMDIMSHEIGHT,
    MINIMUMDIMSLENGTH,
    MINIMUMDIMSWIDTH,
    MINIMUMPAYLOADS,
    PICKUPPOINT,
} from '../../../../lib/db/constants'
import {$sliderValueMaxMilesRight} from './features/max-miles-out/models'
import {clearFilter} from './lib/clear-filter'
import {useInitFilter} from './lib/use-init-filter'
import {StackScreenProps} from '@react-navigation/stack'
import {getLoads} from '../../../../api/rest/loads/get-loads'


export const Filter: React.FC<StackScreenProps<any>> = ({navigation}) => {
    const maxMiles = useStore($sliderValueMaxMilesRight)
    const pickUpPoint = useStore($pickUpPoint)
    const deliveryPoint = useStore($deliveryPoint)
    const minimumDimsLength = useStore($minimumDimsLength)
    const minimumDimsWidth = useStore($minimumDimsWidth)
    const minimumDimsHeight = useStore($minimumDimsHeight)
    const minimumPayloads = useStore($minimumPayloads)

    const onSaveFilter = () => {
        maxMiles && setDb(MAXMILES, maxMiles.toString())
        pickUpPoint && setDb(PICKUPPOINT, pickUpPoint)
        deliveryPoint && setDb(DELIVERYPOINT, deliveryPoint)
        minimumDimsLength && setDb(MINIMUMDIMSLENGTH, minimumDimsLength)
        minimumDimsWidth && setDb(MINIMUMDIMSWIDTH, minimumDimsWidth)
        minimumDimsHeight && setDb(MINIMUMDIMSHEIGHT, minimumDimsHeight)
        minimumPayloads && setDb(MINIMUMPAYLOADS, minimumPayloads)
        setIsFilteredBids(true)
        navigation.goBack()
        getLoads({})
    }

    const onClearFilter = () => {
        clearFilter()
        navigation.goBack()
        getLoads({})
    }

    useInitFilter()

    return (
        <ScreenWrapper isEnabledHeightController={true}>
            <ScrollView
                nestedScrollEnabled={true}
                style={styles.container}>
                <View style={styles.wrapper}>
                    <MaxMilesOut/>
                    {/* <PickUpPoint/>*/}
                    {/* <DeliveryPoint/>*/}
                    {/* <PickUpDate/>*/}
                    {/* <DeliveryDate/>*/}
                    {/* <MinimumDims/>*/}
                    {/* <MinimumPayloads/>*/}
                </View>
            </ScrollView>
            <BtnWrapper style={{height: 149, justifyContent: 'space-between'}}>
                <Button onPress={onSaveFilter}>Apply</Button>
                <Button theme='white' onPress={onClearFilter}>Clear</Button>
            </BtnWrapper>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
    },
    wrapper: {
        paddingBottom: 20,
        paddingHorizontal: 16,
    },
})
