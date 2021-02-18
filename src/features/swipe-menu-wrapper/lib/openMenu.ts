import {useSpring} from "../../../../utils/animation-hooks/Hooks";
import {Animated} from "react-native";

export const openMenu = (value:Animated.Value,callback?:()=>void) => {
    useSpring(value,1,10,7).start(callback)
}
