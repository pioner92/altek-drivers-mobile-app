import * as React from 'react'
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg'

export function FilterSVG() {
    return (
        <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
            <G clipPath="url(#clip0)">
                <Path
                    d="M16.28 0H1.72a.84.84 0 00-.689 1.322l5.556 7.562c.13.188.198.408.198.636v7.59a.889.889 0 001.42.712l2.466-1.86a1.35 1.35 0 00.544-1.08V9.52c0-.228.068-.448.198-.636l5.556-7.562A.84.84 0 0016.279 0zm-5.72 8.265c-.24.326-.4.78-.4 1.255v5.362c0 .092-.044.18-.118.234l-2.202 1.66V9.52c0-.447-.136-.878-.392-1.244-.006-.01.172.234-3.626-4.936h10.356l-3.619 4.925zm4.393-5.98H3.047l-.904-1.23h13.714l-.904 1.23z"
                    fill="#000"
                />
            </G>
            <Defs>
                <ClipPath id="clip0">
                    <Path fill="#fff" d="M0 0H18V18H0z"/>
                </ClipPath>
            </Defs>
        </Svg>
    )
}
