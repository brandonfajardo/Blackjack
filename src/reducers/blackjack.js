import {
    START_GAME_AND_SET_BALANCE,
    BET_AMOUNT,
    DISTRIBUTE_CARD,
    DEALING_CARDS,
    UPDATE_GAME_RESULT
} from '../actions'

const initialState = {
    start: false,
    balance: null,
    betAmount: 0,
    dealersHand: [],
    playersHand: [],
    dealerVal: 0,
    dealerFirstCardVal: null,
    playerVal: 0,
    cardsDealt: false,
    gameResult: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case UPDATE_GAME_RESULT: 
            return {
                ...state,
                gameResult: action.payload
            }
        case DEALING_CARDS:
            return {
                ...state,
                cardsDealt: true
            }
        case START_GAME_AND_SET_BALANCE:
            return {
                ...state,
                start: true, 
                balance: action.payload
            }
        case BET_AMOUNT:
            return {
                ...state,
                betAmount: state.betAmount + action.payload,
                balance: state.balance - action.payload
            }
        case DISTRIBUTE_CARD:
            let faceOrAce
            if (action.payload.value == "ACE"){
                faceOrAce = 11
            } else if (action.payload.value == "KING" || action.payload.value == "QUEEN" || action.payload.value == "JACK"){
                faceOrAce = 10
            }

            if (action.receiver == 'player'){
                return {
                    ...state,
                    playersHand: state.playersHand.concat(action.payload),
                    playerVal: state.playerVal + (faceOrAce || parseInt(action.payload.value))
                }
            } else if (action.receiver == 'dealer'){
                if (state.dealerVal == 0){ 
                    return {
                        ...state,
                        dealersHand: state.dealersHand.concat(action.payload),
                        dealerFirstCardVal: faceOrAce || parseInt(action.payload.value),
                        dealerVal: state.dealerVal + (faceOrAce || parseInt(action.payload.value))
                    }
                } else {
                    return {
                        ...state,
                        dealersHand: state.dealersHand.concat(action.payload),
                        dealerVal: state.dealerVal + (faceOrAce || parseInt(action.payload.value))
                    } 
                }
            }

        default:
            return state
    }
}