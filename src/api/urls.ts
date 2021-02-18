export const serverUrl = 'https://altekloads.com'


export const urls = {
    sms:()=>`${serverUrl}/backend/api/mob-auth/sms`,
    auth:()=>`${serverUrl}/backend/api/mob-auth/auth/`,
    login:()=>`${serverUrl}/backend/api/rest-auth/login/`,
    Loads:(geo:string,miles:string,allFilters?:string)=>`${serverUrl}/backend/api/loads/all/?geo=${geo}&miles_range=${miles}${allFilters}`,
    sendBid:()=>`${serverUrl}/backend/api/mobile/send-bid`,
    removeBid:()=>`${serverUrl}/backend/api/mobile/remove-bid/`,
    setLoad:(id:number)=>`${serverUrl}/backend/api/loads/${id}/`,
    setProfile:()=>`${serverUrl}/backend/api/mobile/profile/`,
    sendGeo:()=>`${serverUrl}/backend/api/mobile/update-location/`,
    documentUpload:()=>`${serverUrl}/backend/api/mobile/upload-docs/`,
    fileUpload:()=>`${serverUrl}/backend/api/upload/`,
    userData:()=>`${serverUrl}/backend/api/mobile/profile/`,
    loadData:(id:number)=>`${serverUrl}/backend/api/loads/${id}`,
    updateProfile:()=>`${serverUrl}/backend/api/users/current/update`,
    getChats:()=>`${serverUrl}/backend/api/users/current/chats/`,
    getGroupChats:()=>`${serverUrl}/backend/api/users/current/chat-groups/`,
    socketUrl:(companyHash:string,token:string)=>`wss://altekloads.com/ws/company/${companyHash}/?access_token=${token}`
}
