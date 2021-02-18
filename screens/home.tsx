import React, {useEffect} from 'react';
import {$isAvailable} from "../src/features/set-available/models";
import {Main} from "./main";
import {NotAvailable} from "./not-available";
import {useStore} from "effector-react";
import {navButtonIndex, setSelectedIndexNavButton} from "../src/features/navigation/models/models";
import {NotificationsHandler} from "../utils/notification/push-notification";
import {useNavigate} from "../src/lib/hooks";
import links from '../links.json'
import {chatContentPropsType} from "./chat/chat-content/chat-content";
import {FirebaseService} from "../utils/firebase-serivce/firebase-service";


export const Home:React.FC = () => {
    const isAvailable = useStore($isAvailable)
    const navigate = useNavigate()

    const openChat = ({id}:chatContentPropsType) => {
        navigate(links.chatContent, {id})
    }

     useEffect(()=>{
         NotificationsHandler(openChat)
         FirebaseService.onOpenHandler(openChat)
         setSelectedIndexNavButton(navButtonIndex.home)
     },[])

   if(isAvailable){
       return (<Main/>)
   }
   else {
       return (<NotAvailable/>)
   }
};

