import * as actiontype from './type'

export const activeuser = (id) =>{
    return{
        type: actiontype.ACTIVE_USER,
        payload:{
            activeuserid: id
        }
    }
}