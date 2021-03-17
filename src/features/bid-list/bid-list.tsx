import {FlatList, StyleSheet} from 'react-native'
import React from 'react'
import {loadType} from '../../api/rest/loads/types'


type propsType = {
    refreshing:boolean
    onRefresh:()=>void
    data:Array<loadType>
    Component:React.FC<{item:loadType}>
}

export const BidList:React.FC<propsType> = ({refreshing, onRefresh, data, Component}) => {
    return (
        <FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            inverted={false}
            contentContainerStyle={styles.flatList}
            data={data}
            renderItem={({item}) => <Component item={item}/>}
            keyExtractor={(item) => item.id.toString()}
        />
    )
}

const styles = StyleSheet.create({
    flatList: {
        paddingHorizontal: 13,
        paddingBottom: 70,
        paddingTop: 14,
    },
})
