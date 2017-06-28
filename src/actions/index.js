import axios from 'axios'

export const START_GAME_AND_SET_BALANCE = 'START_GAME_AND_SET_BALANCE'
export const BET_AMOUNT = 'BET_AMOUNT'
export const DISTRIBUTE_CARD = 'DISTRIBUTE_CARD'

export const startGameWithAmount = amount => ({ type: START_GAME_AND_SET_BALANCE, payload: amount })
export const betAmount = amount => ({ type: BET_AMOUNT, payload: amount })

export const distributeCard = (receiver) => {
    return (dispatch) => {
        axios.get('https://deckofcardsapi.com/api/deck/auoeew5rp8rw/draw/?count=1')
            .then((res) => {
                dispatch({ type: DISTRIBUTE_CARD, receiver, payload: res.data.cards[0] })
            })
    }
}