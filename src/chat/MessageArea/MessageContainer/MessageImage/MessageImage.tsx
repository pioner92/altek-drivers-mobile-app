import React from 'react';
import {
    Image,
    StyleSheet,
    View,
} from "react-native";


type propsType = {
    source: string
}

export const MessageImage: React.FC<propsType> = ({source}) => {

    return (
        <View style={styles.container}>
            <Image
                accessible={true}
                source={{uri: source}}
                style={{
                    width: 102,
                    height: 136,
                    borderRadius: 4
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 5
    }
})
