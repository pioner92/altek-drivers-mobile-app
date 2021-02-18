//@ts-ignore
import { encrypt, decrypt } from 'react-native-simple-encryption';

export const ENCRYPT_KEY = '111QQQqqqTTT99_99_12@12@gggg'

export const encryptData =(text:string) => {
    return encrypt(ENCRYPT_KEY, text)
}

export const decryptData =(text:string) => {
    return decrypt(ENCRYPT_KEY,text)
}
