import { 
    UPDATE_ERROR, 
    DEALING_CARDS 
} from '../actions'

const initialState = {
    message: null
}

const error = (state = initialState, action) => {
    switch(action.type){
        case DEALING_CARDS:
            return {
                message: null
            }
        case UPDATE_ERROR: 
            return {
                message: action.payload
            }
        default:
            return state
    }
}

export default error