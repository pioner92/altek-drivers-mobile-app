import moment from "moment";


const weekGenerate = (data:ReturnType<typeof moment>)=>{
    const arr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const newArr = []
    for (let el in arr.reverse()){
        newArr.push({name:arr[el],value:data.endOf('week').subtract(el,'day').format('DD')})
    }
    return newArr.reverse()
}

export const weeksGenerate = () => {
    const currentWeek = moment()
    const nextWeek = moment().add(1,'week')
    const currentWeekArr = weekGenerate(currentWeek)
    const nextWeekArr = weekGenerate(nextWeek)
    return ({currentWeekArr,nextWeekArr})
}

