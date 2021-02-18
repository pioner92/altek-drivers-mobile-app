import React, {useEffect} from 'react';
import {StyleSheet, View, ViewStyle} from "react-native";
import {TitleGrey} from "../load-verified/ui/atoms";
import {SwipeMenuWrapper} from "../swipe-menu-wrapper";
import {useStore} from "effector-react";
import {$animValueTakePicture, hideTakePictureMenu} from "./models";
import {$swipeMenuWrapperValueDY} from "../swipe-menu-wrapper/models/models";
import {Button} from "../../ui/atoms/buttons";
import {buttonThemes} from "../../ui/atoms/buttons/button";


type propsType = {
    callbackFirstButton: () => void
    callbackSecondButton?:()=>void
    title?: string
    style?: ViewStyle
    labelFirstButton?: string
    labelSecondButton?: string
    themeFirstButton?: buttonThemes
    themeSecondButton?: buttonThemes
}

export const TakePictureMenu: React.FC<propsType> = (
    {
        callbackFirstButton,
        callbackSecondButton,
        title,
        style,
        labelFirstButton='Take picture',
        labelSecondButton='Cancel',
        themeFirstButton='blue',
        themeSecondButton='blue'
    }
) => {

    const value = useStore($animValueTakePicture)
    const dy = useStore($swipeMenuWrapperValueDY)

    const onPressFirstButton = () => {
        callbackFirstButton()
        hideTakePictureMenu()
    }

    const onPressSecondButton = () => {
        callbackSecondButton && callbackSecondButton()
        hideTakePictureMenu()
    }

    useEffect(() => {
        if (dy > 50) {
            hideTakePictureMenu()
        }
    }, [dy])

    return (
        <SwipeMenuWrapper value={value}>
            <View style={[styles.wrapper, style]}>
                {!!title &&
                <TitleGrey style={{alignSelf: 'center'}}>{title}</TitleGrey>
                }
                <Button theme={themeFirstButton} onPress={onPressFirstButton}>{labelFirstButton}</Button>
                <Button theme={themeSecondButton} onPress={onPressSecondButton}>{labelSecondButton}</Button>
            </View>
        </SwipeMenuWrapper>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 147,
        paddingHorizontal: 16,
        justifyContent: "space-between"
    }
})
