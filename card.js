// Defines what the card object is
export default class Card {
    constructor(rank, suit) {
        this.rank = rank
        this.suit = suit
    }

    getCard() {
        return `${this.rank} of ${this.suit}`
    }
}

