import * as actiontype from '../actions/type'
import { combineReducers } from 'redux'

const initialstate = {
    id: null,
    loading:true
}

const activeuser_reducer = (state=initialstate,action)=>{
    switch(action.type){
        case "ACTIVE_USER":
            return{
                id: action.payload,
                loading: false
            }
        default:
            return state
    }
}
const rootReducer = combineReducers({
    activeuserid: activeuser_reducer
})


export default rootReducer