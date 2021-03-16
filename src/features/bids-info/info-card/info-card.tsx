import React, {useEffect, useRef, useState} from 'react'
import {Card, Title, Wrapper} from '../ui/atoms'
import {Line1px} from '../../../ui/atoms'
import {InfoRow} from '../ui/molecules/info-row'
import {Animated, Easing, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {useInterpolate, useValue} from '../../../lib/animation-hooks/Hooks'
import {calculationDistance} from '../../../api/socket-client/lib/calculation-distance'
import {ArrowTop} from '../../../ui/atoms/icons/arrow-top'
import {loadType} from '../../../api/rest/loads/types'

type propsType = {
    data: loadType
}

export const InfoCard: React.FC<propsType> = ({data}) => {
    const refTopWrapper = useRef<View>(null)
    const refBottomWrapper = useRef<View>(null)

    const animValue = useValue(0)

    const [isOpened, setIsOpened] = useState(false)
    const [topWrapper, setTopWrapper] = useState(200)
    const [bottomWrapper, setBottomWrapper] = useState(400)

    const coordinates = data?.start_location?.split(',')

    const emptyMiles = () => {
        if (coordinates?.length > 1) {
            return Math.ceil(calculationDistance(+coordinates[0], +coordinates[1]))
        } else return 0
    }

    const startAnimation = (toValue: number) => {
        Animated.timing(animValue, {
            useNativeDriver: false,
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            duration: 500,
            toValue: toValue,
        }).start()
    }

    const showMore = () => {
        startAnimation(1)
    }
    const showLess = () => {
        startAnimation(0)
    }

    const interpolateHeight = useInterpolate(animValue, [0, 1], [topWrapper + 80, bottomWrapper + topWrapper + 80])

    const animStyle = {
        height: interpolateHeight,
    }

    const boolResultFormatted = (state: boolean) => {
        if (state) {
            return 'Yes'
        }
        return 'No'
    }

    const refTopHandler = (ox: number, oy: number, width: number, height: number) => {
        if (height) {
            setTopWrapper(height)
        }
    }

    const refBottomHandler = (ox: number, oy: number, width: number, height: number) => {
        if (height) {
            setBottomWrapper(height)
        }
    }


    useEffect(() => {
        if (Platform.OS === 'ios') {
            if (refTopWrapper.current) {
                refTopWrapper.current.measure(refTopHandler)
            }
            if (refBottomWrapper.current) {
                refBottomWrapper.current.measure(refBottomHandler)
            }
        }
    }, [])


    useEffect(() => {
        if (isOpened) {
            showMore()
        } else {
            showLess()
        }
    }, [isOpened])

    return (
        <Animated.View style={[animStyle, {marginBottom: 40}]}>
            <Card style={{borderRadius: 8}}>
                <ScrollView scrollEnabled={false}>
                    <Wrapper style={{paddingBottom: 16, flexDirection: 'row', alignItems: 'center'}}>
                        <Title>Info</Title>
                        <ArrowTop style={{marginLeft: 6}}/>
                    </Wrapper>
                    <Line1px/>
                    <Wrapper>
                        <View ref={refTopWrapper}
                            onLayout={(val) => {
                                if (Platform.OS === 'android') {
                                    setTopWrapper(val.nativeEvent.layout.height)
                                }
                            }}>
                            <InfoRow title='Total load miles' value={`${data?.miles?.toString()} mi`}/>
                            <InfoRow title='Empty miles' value={`${emptyMiles()} mi`}/>
                            <InfoRow title='Total cargo'
                                value={`${data?.pieces?.toString()} pc, ${data?.weight?.toString()} lb`}/>
                            <InfoRow title='Dims (LxWxH)' value={data?.dims}/>
                            <InfoRow title='Truck size' value={data?.car?.toString()}/>
                            <InfoRow title='Fast load' value={boolResultFormatted(data?.isUrgent)}/>
                        </View>
                        <View
                            ref={refBottomWrapper}
                            onLayout={(val) => {
                                if (Platform.OS === 'android') {
                                    setBottomWrapper(val.nativeEvent.layout.height)
                                }
                            }}>
                            <InfoRow title='Hazardous' value={boolResultFormatted(data?.isDanger)}/>
                            <InfoRow title='Stackable' value={boolResultFormatted(data?.isCanPutOnTop)}/>
                            <InfoRow title='Dock level' value={boolResultFormatted(data?.dock_level)}/>
                        </View>
                    </Wrapper>
                </ScrollView>
                <TouchableOpacity style={{paddingLeft: 22, marginTop: 15}} onPress={() => setIsOpened(!isOpened)}>
                    <Text style={{fontSize: 14, lineHeight: 18, fontFamily: 'IBMPlex-500', color: '#1672D4'}}>
                        {!isOpened ? 'Show more' : 'Show less'}
                    </Text>
                </TouchableOpacity>
            </Card>

        </Animated.View>

    )
}

