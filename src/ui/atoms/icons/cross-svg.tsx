import React from 'react';
import {View, StyleSheet} from "react-native";
import Svg, {Path} from "react-native-svg";

export const CrossSVG: React.FC = () => {
    return (
        <Svg width={9} height={9} viewBox="0 0 9 9" fill="none">
            <Path
                d="M4.997 4.501l3.9-3.9A.352.352 0 108.4.104l-3.9 3.9L.6.104a.352.352 0 10-.497.497l3.9 3.9-3.9 3.9a.352.352 0 10.497.497l3.9-3.9 3.9 3.9a.35.35 0 00.497 0 .352.352 0 000-.497l-3.9-3.9z"
                fill="#1F2934"
            />
        </Svg>
    );
};

const styles = StyleSheet.create({
    container: {}
})
