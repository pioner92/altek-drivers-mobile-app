import * as React from 'react'
import Svg, {Path} from 'react-native-svg'
import {ViewStyle} from 'react-native'

type propsType = {
    style?: ViewStyle
}

export const ArrowTop: React.FC<propsType> = ({style}) => {
    return (
        <Svg width={6} height={5} style={style} viewBox="0 0 6 5" fill="none">
            <Path d="M3 0l2.598 4.5H.402L3 0z" fill="#1672D4"/>
        </Svg>
    )
}
