import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {RightArrowSVG} from "../../atoms/icons";
import {styleConfig} from "../../../StyleConfig";
import {components} from "@eva-design/eva/mapping";

type seeDetailBidType = {
    onPress: () => void
    loadId: number
    price: number
    Icon?: React.FC
}

export const SeeDetailBid: React.FC<seeDetailBidType> = ({onPress, loadId,price, Icon}) => {
    return (
        <View>
            <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.header}>
                <Text style={styles.headerTitle}>Load #{loadId} - <Text style={{color:'#1672D4',fontFamily:'IBMPlex-500',fontSize:14}}>{price}$</Text></Text>
                {Icon ?
                    <View style={{paddingRight:28}}>
                        <Icon/>
                    </View>
                    : <RightArrowSVG/>

                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 42,
        borderBottomWidth: 1,
        borderColor: '#F4F4F4',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
    },
    headerTitle: {
        fontSize: 14,
        lineHeight: 18,
        fontFamily: 'IBMPlex-400',
        color: styleConfig.textColor.dark
    },
})
