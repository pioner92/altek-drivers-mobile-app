import {useEffect} from "react";
import {sendGeoToServer} from "../src/api/rest/send-geo-to-server";
import {Platform} from "react-native";


const INTERVAL = 60000 * 5


export const useSendGeo = () => {
    useEffect(() => {

            (async function f() {
                if (Platform.OS === "ios") {
                sendGeoToServer()
                const timer = setInterval(() => {
                    sendGeoToServer()
                }, INTERVAL)
                return () => clearInterval(timer)
                }
            })()
    }, [])
}
