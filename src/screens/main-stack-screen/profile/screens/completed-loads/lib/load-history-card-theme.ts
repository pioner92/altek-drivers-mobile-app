type loadHistoryStatus = 'completed' | 'pending'

export const loadHistoryCardTheme = (status: loadHistoryStatus) => {
    const isCompleted = status === 'completed'
    const backgroundColor = !isCompleted ? '#ECF5FF' : '#EBFFE1'
    const color = !isCompleted ? '#3284D2' : '#198237'

    return ({
        color,
        backgroundColor,
    })
}
