import Card from '/card.js'

// Creates a deck of cards
export default class Deck {
    constructor() {
        this.deck = []
        const ranks = []
        for(let i = 2; i < 11; i++) {
            ranks.push(i.toString())
        }
        ranks.push("JOKER")
        ranks.push("QUEEN")
        ranks.push("KING")
        ranks.push("ACE")
        const suits = ["diamonds", "hearts", "clubs", "spades"]

        for(const suit of suits) {
            for(const rank of ranks) {
                this.deck.push(new Card(rank, suit))
            }
        }
    }

    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
        return this.deck
    }

    getDeck() {
        return this.deck
    }

    dealCard() {
        return this.deck.shift()
    }
}