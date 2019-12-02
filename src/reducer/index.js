import {TYPES} from '../action/index'
export default (state, action) => {
    console.log(action)
    switch(action.type){
        case TYPES.SET_ASSET_LIST:
                return {
                    ...state,
                    assetList: action.list
                }
        default:
            return state;
    }    
}