import React from 'react'
import Svg, {Path} from 'react-native-svg'

export const SvgComponent = () => {
    return (
        <Svg width={6} height={5} viewBox="0 0 6 5" fill="none">
            <Path d="M3 5L.402.5h5.196L3 5z" fill="#9FABC5"/>
        </Svg>
    )
}
