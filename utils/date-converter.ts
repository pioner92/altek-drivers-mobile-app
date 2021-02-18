export const dateConverter = (date:string) => {
    const re = /-(\d+)-(\d+)/
    return date.replace(re,'-$2-$1')
}