import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
// @ts-ignore
import {Popover} from 'react-native-simple-popover'

const {width} = Dimensions.get('window')

type propsType = {
    placement: 'bottom' | 'top' | 'right' | 'left',
    isVisible: boolean,
    Content: React.FC
}

export const PopoverComponent: React.FC<propsType> = ({children, Content, isVisible, placement}) => {
    return (
        <Popover
            placement={placement}
            arrowColor={'#fff'}
            arrowWidth={20}
            arrowHeight={16}
            isVisible={isVisible}
            arrowStyle={{backgroundColor: 'red'}}
            component={PopoverContainer.bind(null, {Content})}
        >
            {children}
        </Popover>
    )
}

type popoverContainerPropsType = {
    Content: React.FC
}

const PopoverContainer: React.FC<popoverContainerPropsType> = ({Content}) => {
    return (
        <View style={[styles.container]}>
            <Content/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width - 90,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.17,
        shadowRadius: 7.49,
        elevation: 12,
        // zIndex:100
    },
    text: {
        fontSize: 13,
        lineHeight: 16,
        color: '#677E85',
        fontFamily: 'IBMPlex-500',
    },
})
