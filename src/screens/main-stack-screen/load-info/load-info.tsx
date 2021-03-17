import React, {useMemo} from 'react'
import {useNavigate} from '../../../lib/hooks'
import {useStore} from 'effector-react'
import {$currentLoad} from './models'
import {Button} from '../../../ui/atoms/buttons'
import {ScreenWrapper} from '../../../ui/atoms/screen-wrapper/screen-wrapper'
import {BtnWrapper} from '../../../ui/atoms/wrapper/btn-wrapper'
import {links} from '../../../navigation/links'
import {BidDetail} from '../bids/bid-detail/features/bid-detail/bid-detail'
import {calculationPricePerMile} from '../../../lib/calculation-price-per-mile'


export const LoadInfo: React.FC = () => {
    const currentLoadData = useStore($currentLoad)
    const navigate = useNavigate()

    const pricePerMile = useMemo(() => calculationPricePerMile(currentLoadData).toString(), [currentLoadData])


    const onClickToBack = () => {
        navigate(links.home)
    }
    return (
        <>
            <ScreenWrapper isEnabledHeightController={true}>
                <BidDetail perMile={pricePerMile} bidPrice={currentLoadData!.driver_price?.toString()} item={currentLoadData}>
                    <BtnWrapper>
                        <Button theme={'white'} onPress={onClickToBack}>Go back</Button>
                    </BtnWrapper>
                </BidDetail>
            </ScreenWrapper>
        </>
    )
}

