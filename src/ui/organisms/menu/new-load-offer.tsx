import React from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {SeeDetailBid} from '../../molecules/see-detail-bid'
import {BidStepContent} from '../../../features/bid-card/ui/organisms'
import {Wrapper} from '../../atoms/wrapper'
import {useNavigate} from '../../../lib/hooks'
import {useStore} from 'effector-react'
import {$currentLoad} from '../../../screens/main-stack-screen/load-info/models'
import {Button} from '../../atoms/buttons'
import {styleConfig} from '../../../StyleConfig'
import {InfoSVG} from '../../atoms/icons'
import {links} from '../../../navigation/links'

type propsType = {
    animStyle: any
    closeMenu: () => void
}

export const NewLoadOfferMenu: React.FC<propsType> = ({animStyle, closeMenu}) => {
    const navigate = useNavigate()
    const currentLoad = useStore($currentLoad)

    const openBidsDetailMenu = () => {
        navigate(links.loadInfo)
    }

    const onClickAccept = () => {
        closeMenu()
    }

    return (
        <Animated.View style={[animStyle, styles.container, styleConfig.shadowModal]}>
            <SeeDetailBid price={currentLoad?.driver_price || 0} Icon={InfoSVG} loadId={currentLoad?.id || 0}
                onPress={openBidsDetailMenu}/>
            <View style={styles.content}>
                {currentLoad &&
                <BidStepContent
                    pickUp={currentLoad.pickUpAt || '*'}
                    pickUpZip={currentLoad.pickUpAt_zip || '*'}
                    deliveryTo={currentLoad.deliverTo || '*'}
                    deliveryToZip={currentLoad.deliverTo_zip || '*'}
                    pieces={currentLoad.pieces || 0}
                    weight={currentLoad.weight || 0}
                    totalMiles={currentLoad.miles || 0}
                    emptyMiles={currentLoad.miles_out || 0}
                />
                }
            </View>
            <Wrapper>
                <Button onPress={onClickAccept}>Accept</Button>
            </Wrapper>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 240,
        width: '100%',
        paddingBottom: 16,
        backgroundColor: '#ffffff',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        position: 'absolute',
        bottom: 0,
        zIndex: 101,
    },
    content: {
        paddingHorizontal: 28,
        marginBottom: 34,
        marginTop: 12,
    },
})
