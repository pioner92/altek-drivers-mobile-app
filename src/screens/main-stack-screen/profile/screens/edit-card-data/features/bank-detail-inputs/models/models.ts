import {createEvent, createStore} from 'effector'
import {CardsDataHService, cardsDataType} from '../../../lib/cards-data-handler'

type saveCardDataType = {
    id?: number
}

const cardService = new CardsDataHService()

export const setInputValueCardNumber = createEvent<string>()
export const setInputValueCardHoldName = createEvent<string>()
export const setInputValueCardDate = createEvent<string>()
export const setInputValueCardCVS = createEvent<string>()
export const resetCardInputs = createEvent()
export const saveCardData = createEvent<saveCardDataType>()
export const deleteCardData = createEvent<number>()
export const setCardsData = createEvent<cardsDataType>()
export const initCardData = createEvent()


export const getNumberLength = (number: string) => {
    return number.split(' ').join('').length
}

export const $cardsData = createStore<cardsDataType>([])
    .on(setCardsData, (state, payload) => payload)

export const $inputValueCardNumber = createStore('')
    .on(setInputValueCardNumber, (state, payload) => {
        if (getNumberLength(payload) <= 16) {
            return payload
        }
    })

export const $inputValueCardHolderName = createStore('')
    .on(setInputValueCardHoldName, (state, payload) => payload)

export const $inputValueCardDate = createStore('')
    .on(setInputValueCardDate, (state, payload) => {
        if (payload.length <= 7) {
            return payload
        }
    })

export const $inputValueCardCVC = createStore('')
    .on(setInputValueCardCVS, (state, payload) => {
        if (payload.length <= 3) {
            return payload
        }
    })

resetCardInputs.watch(() => {
    setInputValueCardNumber('')
    setInputValueCardHoldName('')
    setInputValueCardDate('')
    setInputValueCardCVS('')
})

saveCardData.watch(async ({id}) => {
    const cardNumber = $inputValueCardNumber.getState()
    const cardHolderName = $inputValueCardHolderName.getState()
    const cardDate = $inputValueCardDate.getState()
    const cardCvs = $inputValueCardCVC.getState()

    await cardService.addCard({cardNumber, cardHolderName, cardDate, cardCvs, id})
    initCardData()
})

deleteCardData.watch(async (payload) => {
    await cardService.deleteCard(payload)
    initCardData()
})

initCardData.watch(async () => {
    const cardsData = await cardService.getCards()
    cardsData && setCardsData(cardsData)
})
