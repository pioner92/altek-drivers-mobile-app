import {useSpring} from "../../../../utils/animation-hooks/Hooks";
import {Animated} from "react-native";

type propsType = {
    value:Animated.Value
}

export const openLoadMenu = ({value}:propsType) => {
    useSpring(value,1,10,7).start()
}
