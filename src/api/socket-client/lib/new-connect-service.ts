export class NewConnectService{
    private static  isNewConnect = false
    private static timer:NodeJS.Timer|null = null

    static get(){
        return this.isNewConnect
    }

     static newConnect(){
        this.setIsNewConnect(true)

        this.timer = setTimeout(()=>{
            this.setIsNewConnect(false)
            clearTimeout(this.timer!)
        },2000)
    }

    private static setIsNewConnect(status:boolean){
        this.isNewConnect = status
    }
}
