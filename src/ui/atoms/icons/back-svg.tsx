import React from 'react';
import {TouchableOpacity} from "react-native";
import Svg, {ClipPath, Defs, G, Path} from "react-native-svg";


type svgBackType = {
    callback:()=>void
}

export const BackSVG:React.FC<svgBackType> = ({callback}) => {
    return (
        <TouchableOpacity onPress={callback} >
            <Svg width={10} height={10} viewBox="0 0 10 10" fill="none" >
                <G clipPath="url(#clip0)">
                    <Path
                        d="M2.393 4.642L6.89.147a.504.504 0 11.715.713l-4.14 4.139 4.14 4.139a.504.504 0 11-.716.713L2.392 5.356a.51.51 0 01.001-.714z"
                        fill="#3E3E3E"
                    />
                </G>
                <Defs>
                    <ClipPath id="clip0">
                        <Path
                            fill="#fff"
                            transform="matrix(1 0 0 -1 0 10)"
                            d="M0 0H10V10H0z"
                        />
                    </ClipPath>
                </Defs>
            </Svg>
        </TouchableOpacity>
    );
};

