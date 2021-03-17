import {loadType} from '../api/rest/loads/types'

export const calculationPricePerMile = (load: loadType | null) => {
    if (load) {
        const value = load?.driver_price / load?.miles
        const valueString = value.toString().split('.')

        if (valueString.length > 1) {
            const count = valueString[1].length
            return value.toFixed(count === 1 ? 1 : 2)
        }
        return value
    }
    return 0
}
