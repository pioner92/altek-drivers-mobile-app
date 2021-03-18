import {FlatList, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {loadType} from '../../api/rest/loads/types'


type propsType = {
    refreshing: boolean
    onRefresh?: () => void
    data: Array<loadType>
    onEndReachedThreshold?: number
    onEndReached?: () => void
    ListHeaderComponent?: React.FC<void>
    Component: React.FC<{ item: loadType }>
}

export const BidList: React.FC<propsType> = ({refreshing, ListHeaderComponent, onRefresh, data, Component, onEndReached, onEndReachedThreshold = 0}) => {
    const onEndReachedHandler = () => {
        onEndReached && onEndReached()
    }

    return (
        <FlatList
            ListHeaderComponent={ListHeaderComponent}
            onRefresh={onRefresh}
            removeClippedSubviews={true}
            refreshing={refreshing}
            inverted={false}
            onEndReachedThreshold={onEndReachedThreshold}
            contentContainerStyle={styles.flatList}
            data={data}
            renderItem={({item}) => <Component item={item}/>}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={onEndReachedHandler}
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
