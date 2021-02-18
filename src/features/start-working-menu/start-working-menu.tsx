import React, {useEffect} from 'react';
import {StyleSheet, View} from "react-native";
import {useStore} from "effector-react";
import {$animValueStartWorkingMenu} from "./models";
import {SwipeMenuWrapper} from "../swipe-menu-wrapper";
import {$swipeMenuWrapperValueDY} from "../swipe-menu-wrapper/models/models";
import {Button} from "../../ui/atoms/buttons";

type propsType = {
    startWorking: () => void
    openStartLaterWorkingMenu: () => void
    closeMenu: () => void
}

export const StartWorkingMenu: React.FC<propsType> = ({startWorking, openStartLaterWorkingMenu, closeMenu}) => {

    const value = useStore($animValueStartWorkingMenu)
    const dy = useStore($swipeMenuWrapperValueDY)

    const onClickStartWorkingNow = () => {
        startWorking()
    }
    const onClickStartWorkingLater = () => {
        openStartLaterWorkingMenu()
    }

    useEffect(() => {
        if (dy > 50) {
            closeMenu()
        }
    }, [dy])

    return (
        <SwipeMenuWrapper value={value}>
            <View style={styles.container}>
                <Button onPress={onClickStartWorkingNow}>Start working now</Button>
                {/*<Button theme='white' onPress={onClickStartWorkingLater}>Start working later</Button>*/}
            </View>
        </SwipeMenuWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 80, //117
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    }
})
