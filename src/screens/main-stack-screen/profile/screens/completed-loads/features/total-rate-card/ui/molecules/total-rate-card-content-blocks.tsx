import {StyleSheet, View} from 'react-native'
import {propsTotalRateCardBlockType, TotalRateCardBlock} from '../atoms/total-rate-card-block'
import React from 'react'


type TotalRateCardContentBlocksType = {
    leftBlockContent: propsTotalRateCardBlockType
    rightBlockContent: propsTotalRateCardBlockType
}

export const TotalRateCardContentBlocks: React.FC<TotalRateCardContentBlocksType> = ({leftBlockContent, rightBlockContent}) => {
    return (
        <View style={styles.container}>
            {/*<TotalRateCardBlock title={leftBlockContent.title} value={leftBlockContent.value}/>*/}
            {/*<View style={styles.verticalLine}/>*/}
            <TotalRateCardBlock title={rightBlockContent.title} value={rightBlockContent.value}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
    },
    verticalLine: {
        backgroundColor: '#E5EDF5',
        height: '100%',
        width: 1,
    },
})
