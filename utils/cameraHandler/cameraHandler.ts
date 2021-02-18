import * as MediaLibrary from "expo-media-library";
import {Camera} from "expo-camera";


export const cameraHandler = async (callback:()=>void) =>{
    await MediaLibrary.requestPermissionsAsync()
    const {status} = await Camera.requestPermissionsAsync();
    status === 'granted' && callback()
}