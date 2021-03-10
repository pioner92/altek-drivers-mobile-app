import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useStore} from 'effector-react'
import {$inputValuePieces, $inputValueWeight, setInputValuePieces, setInputValueWeight} from './models'
import {styleConfig} from '../../../../../StyleConfig'
import {Header, Row} from './ui/moleculs'
import {Line} from './ui/atoms'
import {$currentLoad} from '../../../load-info/models'


type propsType = {
    piecesDescription: string
    weightDescription: string
}

export const LoadWithCurrent: React.FC<propsType> = ({piecesDescription = '0x0x0', weightDescription = 'lbs'}) => {
    const piecesValue = useStore($inputValuePieces)
    const weightValue = useStore($inputValueWeight)
    const currentPieces = useStore($currentLoad)?.pieces
    const currentWeight = useStore($currentLoad)?.weight

    const onChangePieces = (text: string) => {
        setInputValuePieces(text)
    }
    const onChangeWeight = (text: string) => {
        setInputValueWeight(text)
    }


    return (
        <View style={styles.container}>
            <View style={[styles.content, styleConfig.shadowMenu]}>
                <Header/>
                <Row inputValue={piecesValue} onChange={onChangePieces} description={piecesDescription} label='Pieces'
                    currentValue={currentPieces}/>
                <Line/>
                <Row inputValue={weightValue} onChange={onChangeWeight} description={weightDescription}
                    label='Total Weight' currentValue={currentWeight}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    content: {
        height: 148,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingVertical: 16,
        width: '100%',
        paddingHorizontal: 16,
        borderRadius: 12,
    },
})
