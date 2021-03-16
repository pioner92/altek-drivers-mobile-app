import {PermissionsAndroid, Platform} from 'react-native'

export const requestReadSmsPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS, {
                title: 'Read sms permission',
                message: 'sms permission',
                buttonPositive: 'Ok',
                buttonNegative: 'No',
            })
        } catch (err) {}
    }
}
