export const START_GAME_AND_SET_BALANCE = 'START_GAME_AND_SET_BALANCE'
export const BET_AMOUNT = 'BET_AMOUNT'
export const DISTRIBUTE_CARD = 'DISTRIBUTE_CARD'
export const UPDATE_ERROR = 'UPDATE_ERROR'
export const DEALING_CARDS = 'DEALING_CARDS'
export const UPDATE_GAME_RESULT = 'UPDATE_GAME_RESULT'

export const startGameWithAmount = amount => ({ type: START_GAME_AND_SET_BALANCE, payload: amount })
export const betAmount = amount => ({ type: BET_AMOUNT, payload: amount })
export const updateError = message => ({ type: UPDATE_ERROR, payload: message })
export const dealingCards = () => ({ type: DEALING_CARDS })
export const updateGameResult = message => ({ type: UPDATE_GAME_RESULT, payload: message })

// Thunks 
import axios from 'axios'

export const distributeCard = (receiver) => {
    return (dispatch) => {
        axios.get('https://deckofcardsapi.com/api/deck/auoeew5rp8rw/draw/?count=1')
            .then((res) => {
                dispatch({ type: DISTRIBUTE_CARD, receiver, payload: res.data.cards[0] })
            })
    }
}