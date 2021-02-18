import {useEffect} from "react";

export const useTimer = (callback:()=>void) => {
    useEffect(()=>{
        let timer = setInterval(()=>{
            callback()
        },1000)
        return () => clearInterval(timer)
    },[])
}