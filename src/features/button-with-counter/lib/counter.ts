import moment from "moment";

export class Counter {
    count: number
    time: string = ''
    timer: NodeJS.Timer | null = null

    constructor(value: number) {
        this.count = value
    }


    startTimer(callback: any) {
        this.timer = setInterval(() => {
            this.count = this.count -1
            // this.time = moment.unix(this.count).format('mm:ss')
            // callback(this.time)
        }, 1000)
    }

    stopTimer() {

    }
}

