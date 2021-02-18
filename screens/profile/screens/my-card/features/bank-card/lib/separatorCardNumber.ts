export const separatorCardNumber = (str:string,size:number) => {
    return str.split('').map((el, index, arr) => {
        if(index%size === 0){
            return arr.slice(index,index+size)
        }
        else return []
    }).filter((el)=>el.length === size)
}
