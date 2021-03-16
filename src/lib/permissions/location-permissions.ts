import * as Permissions from 'expo-permissions'

export const getLocationPermissions = async () => {
    const {status} = await Permissions.getAsync(Permissions.LOCATION)
    if (status) {
        const {status} = await Permissions.askAsync(Permissions.LOCATION)
        if (status === 'granted') {

        }
    }
}
