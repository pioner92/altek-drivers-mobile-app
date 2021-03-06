import {Audio} from 'expo-av'

export const playSoundNotification = async () => {
    try {
        const {sound: soundObject, status} =
            await Audio.Sound.createAsync(require('../../../assets/audio/notif.mp3'), {shouldPlay: true})
    } catch (error) {
        console.log('Error: ' + error)
    }
}
