import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import {ScreenWrapper} from "../../src/ui/atoms/screen-wrapper/screen-wrapper";
import {navButtonIndex, setSelectedIndexNavButton} from "../../src/features/navigation/models/models";
import {styleConfig} from "../../src/StyleConfig";
import {BidCard} from "../../src/features/bid-card";
import {useStore} from "effector-react";
import {loadsListStore} from "../../Store/Store";
import {getLoads} from "../../src/api/rest/loads/get-loads";
import {Preloader} from "../../src/features/preloader/preloader";
import {showPreloader} from "../../src/features/preloader/models/models";


export const Bids: React.FC = () => {
    const loads = useStore(loadsListStore)
    const [isRefreshing, setIsRefreshing] = useState(true)

    useEffect(() => {
        showPreloader()
        setSelectedIndexNavButton(navButtonIndex.bids)
        getLoads()
            .then(() => setIsRefreshing(false))

        const timer = setInterval(()=>{
            getLoads()
                .then(() => setIsRefreshing(false))
        },20000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <>
            <ScreenWrapper enableNavigateButtons={true} style={{backgroundColor: styleConfig.screenBackgroundGrey}}>
                <View style={styles.container}>
                    <FlatList
                        onRefresh={() => getLoads()}
                        refreshing={isRefreshing}
                        inverted={false}
                        contentContainerStyle={styles.flatList}
                        data={loads}
                        renderItem={({item}) => <BidCard item={item}/>}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </ScreenWrapper>
            <Preloader/>
        </>
    );
};

const styles = StyleSheet.create({
    container: {},
    flatList: {
        paddingHorizontal: 13,
        paddingBottom: 70,
        paddingTop: 14,
    }
})
