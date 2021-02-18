import React, {useEffect} from 'react';
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    FlatList,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import {useStore} from "effector-react";
import {useNavigation} from '@react-navigation/native'
import {
    isLoadedBidsStore,
    loadsListStore,
    setIsLoadedBidsEvent
} from "../../../Store/Store";
import {useInterpolate} from "../../../utils/animation-hooks/Hooks";
import {BidCard} from "../bid-card";
import {ButtonFilter} from "./ui/atoms";
import {$animValueBidList} from "./models";
import {$isMountedBIdList} from "./models/models";
import {getLoads} from "../../api/rest/loads/get-loads";


const {height} = Dimensions.get('window')


export const BidList: React.FC = () => {
    const value = useStore($animValueBidList)
    const {navigate} = useNavigation();
    const loads = useStore(loadsListStore)
    const isLoadedBids = useStore(isLoadedBidsStore)
    const isMounted = useStore($isMountedBIdList)

    const translateYInterpolate = useInterpolate(value, [0, 1], [height, 0])
    const opacityInterpolate = useInterpolate(value, [0,0.5, 1], [0,0, 1])

    const animateStyle = {
        opacity: opacityInterpolate,
        transform: [
            {translateY: translateYInterpolate},
        ]
    }

    const openFilterBidsMenu = () => navigate('Filter')


    useEffect(() => {
        setIsLoadedBidsEvent(true)
        getLoads()
            .then(()=>setIsLoadedBidsEvent(false))
    }, [])

    if(isMounted){
        return (
            <SafeAreaView style={[styles.container]}>
                {isLoadedBids &&
                <ActivityIndicator
                    style={{position:'absolute',top:height/2,alignSelf:'center',zIndex:100,transform:[{scale:1.5}]}}
                    size="large" color="#1067C5"/>

                }
                <Animated.View style={[styles.filterIcon, {opacity: opacityInterpolate}]}>
                    <ButtonFilter callback={openFilterBidsMenu}/>
                </Animated.View>
                <Animated.View style={[animateStyle]}>
                    <FlatList
                        inverted={true}
                        style={{height: height, backgroundColor: 'rgba(0,0,0,0.2)'}}
                        contentContainerStyle={styles.flatList}
                        data={loads}
                        renderItem={({item}) => <BidCard item={item}/>}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </Animated.View>
            </SafeAreaView>
        );
    }
    else {
        return null;
    }
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 20,
        width: '100%',
    },
    filterIcon: {
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        height: 50,
        paddingHorizontal: 23,
        marginTop: 0,
        position: 'absolute',
        top: 20,
        zIndex: 25,
    },
    flatList: {
        paddingHorizontal: 13,
        paddingBottom: 80,
        paddingTop: 140,
    }
})
