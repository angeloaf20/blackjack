import Deck from '/deck.js'

const playerHandElem = document.getElementById('player-hand')
const dealerHandElem = document.getElementById('dealer-hand')
const winText = document.getElementById('win-text')
let hiddenCard
const hit = document.getElementById('hit')
const stand = document.getElementById('stand')

const playerHand = []
const dealerHand = []
let playerSum = 0
let dealerSum = 0
let deck = new Deck()
deck.shuffle()

//initial deals cards to player deck. updates sum based on rank
function dealCardsToPlayer() {
    playerHand.push(deck.dealCard())
    playerHand.push(deck.dealCard())
    for(let i = 0; i < playerHand.length; i++) {
        let { rank, suit } = playerHand[i]
        if(rank === 'JOKER' || rank === 'QUEEN' || rank === 'KING') rank = 10
        if (rank === 'ACE') {
            if (playerSum + 11 <= 21) {
                rank = 11
            } else {
                rank = 1
            }
        }
        playerSum += parseInt(rank)
    }
}

// does not reveal second card, and does not show sum (would reveal second card), but does deal both cards
function initialDealerHand() {
    dealerHand.push(deck.dealCard())
    dealerHand.push(deck.dealCard())

    let { rank, suit } = dealerHand[0]
    let img = document.createElement('img')
    dealerHandElem.appendChild(img)
    img.id = 'card'
    img.src = `cards/${suit.toLowerCase()}-${rank}.png`
    hiddenCard = document.createElement('img')
    dealerHandElem.appendChild(hiddenCard)
    hiddenCard.id = 'hidden'
    hiddenCard.src = 'cards/card-back.png'

    if(rank === 'JOKER' || rank === 'QUEEN' || rank === 'KING') rank = 10
    if (rank === 'ACE') {
        if (dealerSum + 11 <= 21) {
            rank = 11
        } else {
            rank = 1
        }
    }
    dealerSum += parseInt(rank)
}


// displays the cards of the player's deck in the player hand element
function displayPlayerHand() {
    for(let i = 0; i < playerHand.length; i++) {
        let { rank, suit } = playerHand[i]
        let img = document.createElement('img')
        playerHandElem.appendChild(img)
        img.id = 'card'
        img.src = `cards/${suit.toLowerCase()}-${rank}.png`
    }
    
    document.getElementById('player-sum').innerHTML = playerSum
}

function displaySecondCard() {
    hiddenCard.remove()
    let { rank, suit } = dealerHand[1]
    let secondCard = document.createElement('img')
    dealerHandElem.appendChild(secondCard)
    secondCard.id = 'card'
    secondCard.src = `cards/${suit.toLowerCase()}-${rank}.png`
    if(rank === 'JOKER' || rank === 'QUEEN' || rank === 'KING') rank = 10
    if (rank === 'ACE') {
        if (dealerSum + 11 <= 21) {
            rank = 11
        } else {
            rank = 1
        }
    }
    dealerSum += parseInt(rank)
    document.getElementById('dealer-sum').innerHTML = dealerSum
}

function dealCardsToDealer() {
    if(dealerSum >= 18 || dealerSum === 21) {
        return
    } else {
        while(dealerSum <= 21) {
            dealerHand.push(deck.dealCard())
            let { rank } = dealerHand[dealerHand.length-1]
            if(dealerSum === 21) break
            if(dealerSum > 21) break
            if(21 - dealerSum < 21 - playerSum) break
            if(rank === 'JOKER' || rank === 'QUEEN' || rank === 'KING') rank = 10
            if (rank === 'ACE') {
                if (dealerSum + 11 <= 21) {
                    rank = 11
                } else {
                    rank = 1
                }
            }
            dealerSum += parseInt(rank)
        }
        console.log(dealerHand)
    }
    
    
}

function displayDealerHand() {
    for(let i = 2; i < dealerHand.length; i++) {
        let { rank, suit } = dealerHand[i]
        let img = document.createElement('img')
        dealerHandElem.appendChild(img)
        img.id = 'card'
        img.src = `cards/${suit.toLowerCase()}-${rank}.png`
    }
    document.getElementById('dealer-sum').innerHTML = dealerSum
}

// when the 'hit' button is pressed, pushes another card to the player's deck 
function onHit() {
    playerHand.push(deck.dealCard())
    let { rank, suit } = playerHand[playerHand.length-1]
    let img = document.createElement('img')
    playerHandElem.appendChild(img)
    img.id = 'card'
    img.src = `cards/${suit.toLowerCase()}-${rank}.png`
    if(rank === 'JOKER' || rank === 'QUEEN' || rank === 'KING') rank = 10
        if (rank === 'ACE') {
            if (playerSum + 11 <= 21) {
                rank = 11
            } else {
                rank = 1
            }
        }
    playerSum += parseInt(rank)
    document.getElementById('player-sum').innerHTML = playerSum
}

// for better readability and to module code better
function DealPlayerHand() {
    dealCardsToPlayer()
    displayPlayerHand()
}

function DealDealerHand() {
    displaySecondCard()
    dealCardsToDealer()
    displayDealerHand()
}


DealPlayerHand()
initialDealerHand()
hit.addEventListener('click', onHit)
stand.addEventListener('click', DealDealerHand)