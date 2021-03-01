import config from '../../../config.json'

const body = {
    'to': '/topics/179',
    'notification': {
        'tag': 'logout',
        'title': 'LogOut',
        'content_available': true,
        'priority': 'high',
        'high_priority': 'high',
        'show_in_foreground': true,
    },
    'adnroid': {
        'tag': 'logout',
        'priority': 'high',
    },
    'data': {
        'id': 4,
        'action': 'logout',
        'sound': 'default',
        'content_available': true,
        'priority': 'high',
    },
    'apns': {
        'headers': {
            'apns-push-type': 'background',
            'apns-priority': '10',
            'apns-collapse-id': 'location',
        },
        'payload': {
            'aps': {
                'apns-collapse-id': 'location',
                'contentAvailable': true,
            },
        },
    },
}

export const sendLogOutPush = () => {
    fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Authorization': `key=${config.firebase_token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
}
