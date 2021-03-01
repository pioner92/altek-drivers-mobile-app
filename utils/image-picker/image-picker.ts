import * as ImagePicker from 'expo-image-picker'

export const imagePicker = async () => {
    return await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    })
}
