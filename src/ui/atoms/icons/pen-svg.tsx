import React from 'react';
import { StyleSheet} from "react-native";
import Svg, {Path} from "react-native-svg";

export const PenSVG: React.FC = () => {
    return (
        <Svg width={11} height={11} viewBox="0 0 11 11" fill="none">
            <Path
                d="M10.658 1.338L9.66.342a1.17 1.17 0 00-1.652 0L.593 7.758a.328.328 0 00-.09.17l-.498 2.691a.322.322 0 00.376.376l2.691-.499a.328.328 0 00.17-.089l7.416-7.417a1.168 1.168 0 000-1.652zM.724 10.275l.302-1.628 1.327 1.327-1.629.301zm2.29-.552L1.276 7.986 7.62 1.643l1.737 1.738-6.342 6.342zm7.188-7.188l-.39.39-1.737-1.737.39-.39a.524.524 0 01.74 0l.997.996a.523.523 0 010 .74z"
                fill="#1F2934"
            />
        </Svg>
    );
};

const styles = StyleSheet.create({
    container: {}
})
