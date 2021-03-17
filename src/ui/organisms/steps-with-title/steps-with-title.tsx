import React from 'react'
import {StyleSheet, View} from 'react-native'
import {StepComponent} from '../../../features/bid-card/ui/molecules'


type propsType = {
    titleTop: string
    subtitleTop?: string
    titleBottom: string
    subtitleBottom?: string
}

export const StepsWithTitle: React.FC<propsType> = ({titleTop, subtitleTop, titleBottom, subtitleBottom}) => {
    return (
        <View style={styles.circleAndTitleWrapper}>
            <View style={styles.circlesWrapper}>
                <StepComponent number='1' title={titleTop} subTitle={subtitleTop}/>
                <View style={styles.line}/>
                <StepComponent number='2' title={titleBottom} subTitle={subtitleBottom}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    circlesWrapper: {
        alignItems: 'center',
    },

    circleAndTitleWrapper: {
        height: 89,
        flexDirection: 'row',
        width: '60%',
    },

    line: {
        borderLeftWidth: 1,
        height: 36,
        alignSelf: 'flex-start',
        marginLeft: 10,
        borderColor: '#7B8CAE',
    },
})
