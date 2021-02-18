import {Alert} from "react-native";

type propsType = {
    title:string
    message:string
    callback?:()=>void
}

export const alertFn = ({title,message,callback}:propsType) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: "Ok",
                onPress: () => callback && callback()
            }
        ],
        { cancelable: false }
    );
}
