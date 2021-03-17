import {createEffect} from 'effector'
import {makeRequest} from '../make-request'
import {urls} from '../urls'

type propsData = {
    firstName?: string
    lastName?: string
    avatar?:string
    fb_token?: string
}

type dataType = {
    first_name?: string
    last_name?: string
    fb_token?: string
    avatar?:string
}

export const updateProfileDateOnServer = createEffect(async ({firstName: first_name, lastName: last_name, fb_token, avatar}: propsData) => {
    const data: dataType = {}

    first_name && (data.first_name = first_name)
    last_name && (data.last_name = last_name)
    fb_token && (data.fb_token = fb_token)
    avatar && (data.avatar = avatar)

    return await makeRequest({
        url: urls.updateProfile(), token: true, method: 'PUT', body: data,
    })
})


updateProfileDateOnServer.done.watch(({result}) => {
})
