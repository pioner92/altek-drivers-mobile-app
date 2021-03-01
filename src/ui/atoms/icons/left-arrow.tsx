import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

export const LeftArrow = () => {
    return (
        <Svg width={8} height={12} viewBox="0 0 8 12" fill="none">
            <Path
                d="M.872 6.43l5.396 5.394c.237.236.62.236.858 0a.605.605 0 000-.856L2.158 6l4.967-4.966a.605.605 0 10-.858-.857L.871 5.573a.611.611 0 000 .856z"
                fill="#1F2934"
            />
        </Svg>
    )
}
