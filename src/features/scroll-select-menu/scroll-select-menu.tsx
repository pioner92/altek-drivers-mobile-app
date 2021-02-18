import React, {useEffect, useMemo, useState} from 'react';
import {Animated, Platform, StyleSheet, View} from "react-native";
import {DarkBg} from "../../ui/atoms/dark-bg";
import {styleConfig} from "../../StyleConfig";
import {Header} from "./ui/molecules/header";
import {itemGenerate} from "./lib/item-generate";
import {
    $animatedValueScrollSelectMenu,
    $inputValueScrollSelectMenu, $isMountedScrollSelectMenu, $scrollSelectMenuSelectedValue,
    hideScrollSelectMenu, resetInputValueScrollMenu, setInputValueScrollSelectMenu,
    setScrollSelectedMenuSelectedValue
} from "./models/models";

import {Picker} from '@react-native-picker/picker';
import {useStore} from "effector-react";
import {useInterpolate} from "../../../utils/animation-hooks/Hooks";
import {loadType} from "../../api/rest/loads/get-loads";

type propsType = {
    onPressRightButton:(value:number)=>void
    item:loadType
}

const numberIsNan = (value:number) =>{
    return value !== NaN
}

const textPriceValidate = (text:string)=>{
    const number = Number(text)

    if(numberIsNan(number) && number < 1) {
        return 1
    }
    else if (numberIsNan(number) && number >= 1) {
        return number
    }
    else {
        return  1
    }
}

export const ScrollSelectMenu: React.FC<propsType> = ({onPressRightButton,item}) => {

    const selectedValue = useStore($scrollSelectMenuSelectedValue)
    const inputValue = useStore($inputValueScrollSelectMenu)
    const animValue = useStore($animatedValueScrollSelectMenu)
    const isMounted = useStore($isMountedScrollSelectMenu)

    const defaultItems = useMemo(()=>itemGenerate(0.25,5),[])

    const [itemsArray,setItemsArray] = useState<Array<{id:number,value:string}>>([])


    const calculationPerMile = (miles:number, price:number) => {
        return Number((price / miles).toFixed(2))
    }

    const onChangeInput = (text:string) => {
        if(text){
            let price = textPriceValidate(text)
            setInputValueScrollSelectMenu(price.toString())
        }
        else {
            setInputValueScrollSelectMenu("")
            setItemsArray(defaultItems)
        }
    }
    const onPressLeftButton = () => {
        hideScrollSelectMenu()
    }
    const onPressRightButtonHandler = () => {
            onPressRightButton(+inputValue)
            hideScrollSelectMenu()
            resetInputValueScrollMenu()
    }

    const onChangeScrollMenu = (index:any) => {
        setScrollSelectedMenuSelectedValue(itemsArray[index])
        setInputValueScrollSelectMenu((item.miles * Number(itemsArray[index].value)).toFixed(1))
    }

    const interpolateY = useInterpolate(animValue,[0,1],[500,0])
    const interpolateOpacity = useInterpolate(animValue,[0,1],[0,1])

    const animStyle = {
        transform: [
            {translateY:interpolateY}
        ],
        opacity:interpolateOpacity
    }

    useEffect(()=>{
        setItemsArray(itemGenerate(0.25,5))
        setScrollSelectedMenuSelectedValue(defaultItems[defaultItems.length/2])
    },[])


    if (!isMounted){return null}

    return (
        <Animated.View style={[styles.container,animStyle]}>
            <DarkBg>
                <View style={[styles.content, styleConfig.shadowModal]}>
                    <Header
                        onChange={onChangeInput}
                        inputValue={inputValue}
                        leftButtonLabel='Cancel'
                        rightButtonLabel='Place'
                        onPressLeftButton={onPressLeftButton}
                        onPressRightButton={onPressRightButtonHandler}
                    />

                    <Picker
                        mode={Platform.OS === "ios" ? 'dialog' : "dropdown"}
                        itemStyle={{fontSize:16,lineHeight:21,fontFamily:'IBMPlex-500'}}
                        selectedValue={selectedValue.value}
                        style={{height: Platform.OS === "ios" ? 219 : 50, width: "100%",backgroundColor:"#ffffff"}}
                        onValueChange={((itemValue, itemIndex) => onChangeScrollMenu(itemIndex))}
                    >
                        {itemsArray?.map((el)=> <Picker.Item  color={styleConfig.textColor.dark}  key={el.id} label={el.value} value={el.value} />)}
                    </Picker>
                </View>
            </DarkBg>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: "absolute",
        justifyContent: "flex-end",
    },
    content: {
        width: '100%',
        marginTop: 'auto',
        bottom: 0
    },
    scrollContent: {
        width: '100%',
    },
    scrollValueTitle: {
        textAlign: "center"
    },
})