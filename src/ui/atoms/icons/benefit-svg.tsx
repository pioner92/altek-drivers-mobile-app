import * as React from 'react'
import Svg, {Path} from 'react-native-svg'

export const BenefitSVG = () => {
    return (
        <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
            <Path
                d="M17.373 9.36v8.892H2.653V9.36H1.28v9.578c0 .378.307.685.686.685h16.091a.686.686 0 00.686-.686V9.36h-1.371z"
                fill="#ECF5FF"
            />
            <Path
                d="M19.314 4.217H.686A.686.686 0 000 4.903v4.48c0 .378.307.685.686.685h18.628A.686.686 0 0020 9.383v-4.48a.686.686 0 00-.686-.686zm-.685 4.48H1.37V5.588H18.63v3.109z"
                fill="#ECF5FF"
            />
            <Path
                d="M10.674 4.729C10.627 4.551 9.496.377 6.194.377a2.609 2.609 0 00-2.606 2.606c0 1.436 1.159 2.605 2.583 2.605h3.84a.686.686 0 00.663-.859zm-4.503-.512c-.68 0-1.212-.542-1.212-1.234a1.25 1.25 0 011.235-1.235c1.504 0 2.405 1.483 2.839 2.469H6.17z"
                fill="#ECF5FF"
            />
            <Path
                d="M13.83.377c-3.303 0-4.435 4.174-4.481 4.352a.685.685 0 00.663.86h3.84c1.424 0 2.583-1.17 2.583-2.606A2.609 2.609 0 0013.829.377zm.022 3.84h-2.864c.43-.986 1.328-2.469 2.841-2.469.67 0 1.235.566 1.235 1.235 0 .692-.533 1.234-1.212 1.234z"
                fill="#ECF5FF"
            />
            <Path d="M10.698 4.903H9.326v14.035h1.372V4.903z" fill="#ECF5FF"/>
        </Svg>
    )
}
