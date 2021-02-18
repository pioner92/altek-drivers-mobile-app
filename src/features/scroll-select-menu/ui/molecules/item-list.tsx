import React from 'react';
import {View, StyleSheet, FlatList, ViewStyle, TextStyle} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {SelectLine} from "../atoms/select-line";

type itemType = {
    id:number,
    value:string
}
type renderItemType = {
    style:ViewStyle | TextStyle
    id:number
    value:string
}


type propsType = {
    height:number
    RenderItem:React.FC<renderItemType>
    items:Array<itemType>
    onChange:(data:itemType)=>void
}

export const ItemList: React.FC<propsType> = ({height,RenderItem,items,onChange}) => {

    let itemHeight = 40;
    let listHeight = 219;

    if (height) {
        listHeight = height;
        itemHeight = listHeight / 5;
    }

    const onChangeHandler = ({index,item}:any) => {
        onChange(item)
    }

    const styles = StyleSheet.create({
        container: {
            height,
            backgroundColor:'#fff',
            width:'100%',
        },
        pickerGradient: {
            position: 'absolute',
            height: 2 * itemHeight,
            width: '100%'
        },
        topGradient: {
            top: 0,
        },
        bottomGradient: {
            bottom: 0
        },
        listItem : {
            height: itemHeight,
            alignItems: 'center',
            justifyContent: 'center',

        },
        itemFont:{
            fontSize: itemHeight / 2
        }
    })



    return (
        <View style={[styles.container]}>
            <FlatList
                contentInset={{top:50,bottom:height/2}}
                snapToAlignment={"center"}
                decelerationRate='fast'
                onScroll={(event => {
                    let index = Math.round( event.nativeEvent.contentOffset.y / itemHeight+2 );
                    onChangeHandler( { index, item: items[ index ] } );
                })}
                snapToOffsets={Array.from(Array(items.length)).map((e, i) => i * itemHeight)}
                onMomentumScrollEnd={ ( event ) => {
                    let index = Math.round( event.nativeEvent.contentOffset.y / itemHeight+2 );
                    onChangeHandler( { index, item: items[ index ] } );
                } }
                data={items}
                getItemLayout={ ( _, index ) => ( { length: itemHeight, offset: index * itemHeight, index } ) }
                renderItem={({item,index}) => <RenderItem  style={styles.listItem} id={item.id} value={item.value}/>}
                keyExtractor={(item, index) => item.id.toString()}
            />
            <LinearGradient
                colors={ [
                    'rgba( 255, 255, 255, 1 )',
                    'rgba( 255, 255, 255, 0.9 )',
                    'rgba( 255, 255, 255, 0.7 )',
                    'rgba( 255, 255, 255, 0.5 )'
                ] }
                style={ [ styles.pickerGradient, styles.topGradient ] }
                pointerEvents="none"
            />
            <SelectLine itemHeight={itemHeight} listHeight={listHeight}/>
            <LinearGradient
                colors={ [
                    'rgba( 255, 255, 255, 0.5 )',
                    'rgba( 255, 255, 255, 0.7 )',
                    'rgba( 255, 255, 255, 0.9 )',
                    'rgba( 255, 255, 255, 1 )',
                ] }
                style={ [ styles.pickerGradient, styles.bottomGradient ] }
                pointerEvents="none"
            />
        </View>
    );
};

