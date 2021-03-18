import {useEffect, useRef} from 'react'
import {Platform} from 'react-native'
import config from '../../../../../../config.json'
// @ts-ignore
import SmsListener from 'react-native-android-sms-listener'


export const useSmsListener = ({callback}:{callback:(code:string)=>void}) => {
    const listener = useRef<{ remove:()=>void }>(null)

    useEffect(()=>{
        if (Platform.OS === 'android') {
            // @ts-ignore
            listener.current = SmsListener.addListener((message:{ originatingAddress: string, body: string, timestamp: number}) => {
                const {body, originatingAddress} = message

                if (config.smsPhoneNumbers.includes(originatingAddress)) {
                    const code = body.match(/([0-9]+)/)?.[0]
                    if (code && code.length === 4) {
                        callback(code)
                    }
                }
            })
        }
        return () => {
            listener.current?.remove
        }
    }, [])
}
