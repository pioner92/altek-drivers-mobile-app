import {createEffect} from "effector";
import {makeRequest} from "../make-request";
import {urls} from "../urls";

type propsData = {
    firstName?: string
    lastName?: string
    fb_token?: string
}

type datType = {
    first_name?: string
    last_name?: string
    fb_token?: string
}

export const updateProfileDateOnServer = createEffect(async ({firstName, lastName, fb_token}: propsData) => {

    const data: datType = {
    }

    if (firstName) {
        data["first_name"] = firstName
    }
    if (lastName) {
        data["last_name"] = lastName
    }
    if (fb_token) {
        data["fb_token"] = fb_token
    }

    return await makeRequest({
        url: urls.updateProfile(), token: true, method: 'PUT', body: data
    })
})


updateProfileDateOnServer.done.watch(({result}) => {
})
