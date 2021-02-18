import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useInterpolate, useSpring, useValue} from "../../../utils/animation-hooks/Hooks";
import {BlueArrowDownSVG} from "../../ui/atoms/icons/blue-arrow-down-svg";
import {ScrollArea} from "./ui/moleculs";
import {valueType} from "./ui/moleculs/scroll-area";
import {setMinimumDimsHeightValue} from "../../../screens/filter/features/minimum-dims/models";

type propsType = {
    label: string
    values:Array<valueType>
    selectedValue:number | null
    onChangeText:(text:string)=>void
    onSelect:(e:valueType)=>void
}

export const BlueSelect: React.FC<propsType> = ({label,values,onSelect,selectedValue,onChangeText}) => {

    const [isOpened, setIsOpened] = useState(false)

    const animValue = useValue(0)

    const interpolateHeight = useInterpolate(animValue, [0, 1], [30, 146])
    const interpolateOpacity = useInterpolate(animValue,[0,1],[0,1])

    const animStyle = {
        height: interpolateHeight
    }

    const onOpen = () => {
        setIsOpened(prevState => !prevState)
    }

    const onSelectHandler = (e:valueType) => {
        onSelect(e)
        close()
    }

    const open = () => {
        useSpring(animValue, 1, 10, 7, false).start()
    }
    const close = () => {
        useSpring(animValue, 0, 10, 7, false).start()
    }

    useEffect(() => {
        if (isOpened) {
            open()
        } else {
            close()
        }
    }, [isOpened])

    return (
        <Animated.View onAccessibilityTap={close} style={[styles.container, animStyle]}>
            <View style={styles.wrapper}>
                {isOpened
                    ? <>
                        <TextInput
                            onChangeText={onChangeText}
                            value={`${selectedValue || 0}`}
                            placeholder={label}
                            placeholderTextColor='#E5E5E5'
                            style={styles.input}
                            keyboardType={"numeric"}
                        />
                    </>
                    : <Text onPress={onOpen}  style={styles.label}>{label}</Text>
                }
                <TouchableOpacity style={{alignItems:"center"}} onPress={onOpen}>
                    <BlueArrowDownSVG/>
                </TouchableOpacity>
            </View>
            <Animated.View style={{flex:1,opacity:interpolateOpacity}}>
                <View style={{borderWidth: 1, width: '100%', borderColor: '#ECECEC',padding:0,margin:0}}/>
               <ScrollArea onSelect={onSelectHandler} values={values}/>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 72,
        borderColor: '#5B98DA',
        borderWidth: 1,
        borderRadius: 12,
        justifyContent:"center",
        paddingTop:5
    },
    wrapper: {
        paddingLeft: 12,
        // paddingTop: 6,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-evenly",
    },
    label: {
        fontSize: 14,
        lineHeight: 18,
        fontFamily: 'IBMPlex-400',
        color: '#1672D4'
    },
    input: {
        padding:0,
        textAlignVertical:"center",
        textAlign:"center",
        justifyContent:"center",
        // height:20,
        fontSize:14,
        lineHeight:18
    }
})
