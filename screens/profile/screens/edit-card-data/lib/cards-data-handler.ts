import {getDb, setDb} from "../../../../../utils/db";
import {CARDS} from "../../../../../utils/db/constants";
import {decryptData, encryptData} from "../../../../../utils/encryption";

export type cardDataItemType = {
    id: number
    cardNumber: string
    cardHolderName: string
    cardDate: string
    cardCvs: string
}
export type cardsDataType = Array<cardDataItemType>

type cardType = Omit<cardDataItemType, 'id'>


export class Encrypting {

    encrypt(data: cardsDataType) {
        return this.execute(data, encryptData)
    }

    decrypt(data: cardsDataType) {
        return this.execute(data, decryptData)
    }

    execute(data: cardsDataType, command: Function) {
        return data.map(({id, cardNumber, cardHolderName, cardDate, cardCvs}) => {
            return ({
                id,
                cardNumber: command(cardNumber),
                cardHolderName: command(cardHolderName),
                cardDate: command(cardDate),
                cardCvs: command(cardCvs),

            } as cardDataItemType)
        })
    }
}

class DBHandler {
    async get() {
        return await getDb(CARDS)
    }

    set(value: cardsDataType) {
        setDb(CARDS, JSON.stringify(value))
    }
}


export class CardsDataHService {
    DB!: DBHandler
    encrypting!: Encrypting
    instance: CardsDataHService | null = null

    constructor() {
        if (this.instance !== null) {
            return this.instance
        }
        this.DB = new DBHandler()
        this.instance = this
        this.encrypting = new Encrypting()
        return this.instance
    }

    async addCard({cardNumber, cardHolderName, cardDate, cardCvs, id}: cardType & { id?: number }) {

        const oldCards = await this.getCards()
        if (oldCards?.length) {
            if (id !== undefined) {
                const filteredData = oldCards.filter((el) => el.id !== id)
                this.setDBData([...filteredData, {cardNumber, cardHolderName, cardDate, cardCvs, id}])
            } else {
                this.setDBData([...oldCards, {cardNumber, cardHolderName, cardDate, cardCvs, id: oldCards.length}])
            }
        } else {
            const cardList = [{cardNumber, cardHolderName, cardDate, cardCvs, id: 0}]
            this.setDBData(cardList)
        }
    }


    async deleteCard(id: number) {
        const cards = await this.getCards()
        if (cards) {
            this.setDBData(cards?.filter((el) => el.id !== id))
        }
    }

    async getCards(): Promise<cardsDataType | undefined> {
        const cards = await this.DB.get()

        if (cards) {
            const data = JSON.parse(cards) as cardsDataType
            return this.encrypting.decrypt(data)
        }
    }

    private setDBData(data: cardsDataType) {
        this.DB.set(this.encrypting.encrypt(data))
    }
}



