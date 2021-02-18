import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";

type TimePickerScrollViewType = {
    timeListValidate: () => string[]
    selectedValue: string
    setSelectedValue: Function
}

const {width} =  Dimensions.get('window')

const timeList = ['Now', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00']


export const TimePickerScrollView = ({timeListValidate, selectedValue, setSelectedValue}: TimePickerScrollViewType) => {
    return (
        <ScrollView horizontal={true}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    style={styles.container}
        >
            <View style={styles.wrapper}>
                {timeList.map((el, index) => {
                    return (

                        <TouchableOpacity
                            style={[styles.timeValueWrapper,
                                {
                                    backgroundColor: el === selectedValue ? '#DDEEFF' : '#F3F5F9',
                                    marginLeft: index === 0 ? 15 : 10
                                }]}
                            key={index}
                            onPress={() => setSelectedValue(el)}>
                            <Text style={el === selectedValue ? styles.timeValueActive : styles.timeValue}>
                                {el}
                            </Text>
                        </TouchableOpacity>

                    )
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    container: {
        height: 33,
        flex:1,
        minWidth: width,
        left: 0,
        right:0,
        bottom:0,
        width:370,
        position:'absolute',
        transform: [{
            translateX: -15
        }]
    },
    wrapper: {
        height: 33,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'center',
        marginRight:10,

    },
    timeValueWrapper: {
        backgroundColor: '#1067C5',
        width: 48,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeValue: {
        fontFamily: 'IBMPlex-400',
        color: '#1672D4',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 17,
    },
    timeValueActive: {
        fontFamily: 'IBMPlex-500',
        color: '#1672D4',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 17,
    },

})

