import React, {useEffect, useLayoutEffect} from 'react';
import {ScrollView, StyleSheet} from "react-native";
import {getDb} from "../../utils/db/get-db";
import {setUserPhoto} from "./models";
import {ScreenWrapper} from "../../src/ui/atoms/screen-wrapper/screen-wrapper";
import {navButtonIndex, setSelectedIndexNavButton} from "../../src/features/navigation/models/models";
import {StackScreenProps} from "@react-navigation/stack";
import {styleConfig} from "../../src/StyleConfig";
import {PhotoProfileBlock} from "./screens/edit-profile/features/photo-profile-block";
import {MostRecentLoad} from "./features/most-recent-load/most-recent-load";
import {Rewards} from "./features/rewards/rewards";
import {Benefits} from "./features/benefits/benefits";
import {Account} from './features/account/account'
//@ts-ignore
import {PopoverContainer} from 'react-native-simple-popover';
import {initUserData} from "./models/models";
import {PHOTOPROFILE} from "../../utils/db/constants";

export const Profile: React.FC<StackScreenProps<any>> = ({navigation}) => {

    useEffect(() => {
        initUserData()
        getDb(PHOTOPROFILE)
            .then((data) => data && setUserPhoto(data))
        setSelectedIndexNavButton(navButtonIndex.profile)

    }, [])


    return (
        <ScreenWrapper enableNavigateButtons={true} style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}>
                <PopoverContainer>
                    <PhotoProfileBlock enableButtonEdit={true}/>
                    {/*<MostRecentLoad/>*/}
                    {/*<Rewards/>*/}
                    {/*<Benefits/>*/}
                    {/*<Account/>*/}
                </PopoverContainer>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        // alignItems: 'center',
        // paddingTop: 26,
        // paddingHorizontal: 16
    },
    scrollContainer:{
        paddingHorizontal: styleConfig.screenPadding,
        paddingBottom: 80,
        paddingTop:26
    }

})

