import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {loadType} from '../../../../../../api/rest/loads/types'
import {ScreenWrapper} from '../../../../../../ui/atoms/screen-wrapper/screen-wrapper'
import {styleConfig} from '../../../../../../StyleConfig'
import {InfoCard} from '../../../../../../features/bids-info/info-card'
import {Notes} from '../../../../../../features/bids-info/ui/atoms'
import {PriceAreaComponent} from '../../../../../../features/bids-info/ui/molecules'
import {DetailCard} from '../../../../../../features/bids-info/detail-card'

type itemType = {
    item: loadType | null
    perMile?:string
    bidPrice?:string
}


export const BidDetail: React.FC<itemType> = ({item, children, perMile, bidPrice}) => {

    return (
        <>
            <ScreenWrapper isEnabledHeightController={true} style={styles.container}>

                <ScrollView contentContainerStyle={{
                    paddingTop: 27,
                    paddingBottom: 40,
                    paddingHorizontal: styleConfig.screenPadding,
                }}>

                    <InfoCard data={item}/>
                    <Notes notes={item?.note ?? ''}/>
                    <View style={styles.priceAreasWrapper}>
                        <PriceAreaComponent value={bidPrice ?? '0'} description='Your bid'/>
                        <View style={{width: 16}}/>
                        <PriceAreaComponent value={perMile ?? '0'} description='Per mile'/>
                    </View>
                    <DetailCard data={item}/>
                </ScrollView>
                {children}
            </ScreenWrapper>

        </>
    )
}

const styles = StyleSheet.create({
    container: {},
    priceAreasWrapper: {
        flexDirection: 'row',
        height: 100,
        marginTop: 26,
    },
})
