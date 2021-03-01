type propsType = {
    load_id: number
    status: number,
    substatus?: number
}

export const setStatusDataGenerate = ({load_id, substatus, status}: propsType) => {
    return {
        action: 'load_status_change',
        data: {
            load_id: load_id,
            status: status,
            substatus: substatus,
        },
    }
}
