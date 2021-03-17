import {FlatList, StyleSheet} from 'react-native'
import React from 'react'
import {loadType} from '../../api/rest/loads/types'


type propsType = {
    refreshing: boolean
    onRefresh?: () => void
    data: Array<loadType>
    onEndReached?: () => void
    Component: React.FC<{ item: loadType }>
}

export const BidList: React.FC<propsType> = ({refreshing, onRefresh, data, Component, onEndReached}) => {

    const onEndReachedHandler = () => {
        onEndReached && onEndReached()
    }

    return (
        <FlatList
            onRefresh={onRefresh}
            removeClippedSubviews={true}
            refreshing={refreshing}
            inverted={false}
            onEndReachedThreshold={0}
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