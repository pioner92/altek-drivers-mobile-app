import React, {useMemo} from 'react'
import {StackScreenProps} from '@react-navigation/stack'
import {loadType} from '../../../../../api/rest/loads/types'
import {BidDetail} from '../features/bid-detail/bid-detail'
import {calculationPricePerMile} from '../../../../../lib/calculation-price-per-mile'

type itemType = {
    item: loadType
}

export const BidDetailScreen:React.FC<StackScreenProps<itemType>> = ({route}) => {
    const data = route.params as itemType

    const pricePerMile = useMemo(() => calculationPricePerMile(data.item).toString(), [data])

    return (
        <BidDetail bidPrice={data?.item.driver_price?.toString()} perMile={pricePerMile} item={data.item}/>
    )
}
