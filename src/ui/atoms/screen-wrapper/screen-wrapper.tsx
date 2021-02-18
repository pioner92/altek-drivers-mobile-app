import React from 'react';
import {
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
    ViewStyle
} from "react-native";
import {SafeAreaComponent} from "../safe-area";
import {styleConfig} from "../../../StyleConfig";
import {ButtonNavigateContainer} from "../../../features/navigation/navigation";
import {useHeaderHeight} from "@react-navigation/stack";
const height = Dimensions.get('window').height

type propsType = {
    safeAreaStyle?:ViewStyle
    style?:ViewStyle
    isEnabledHeightController?:boolean
    enableNavigateButtons?:boolean
}

export const ScreenWrapper: React.FC<propsType> = ({children,isEnabledHeightController=false,safeAreaStyle,style,enableNavigateButtons=false}) => {

    const headerHeight = useHeaderHeight()

    const closeKeyboard = () => {
        Keyboard.dismiss()
    }
    const heightStyle = {
        height:height - headerHeight - 16
    }

    return (
        <SafeAreaComponent style={safeAreaStyle}>
            <View onTouchMove={closeKeyboard} style={[styles.container,style,isEnabledHeightController && heightStyle]}>
            {/*<KeyboardAvoidingView enabled={false} style={{flex:1}}>*/}
                {children}
            {/*</KeyboardAvoidingView>*/}
            {enableNavigateButtons &&
            <ButtonNavigateContainer/>
            }
            </View>
        </SafeAreaComponent>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConfig.screenBackground,
        height: '100%'
    }
})
