import {TYPES} from '../action/index'
export default (state, action) => {
    console.log(action)
    switch(action.type){
        case TYPES.SET_ASSET_LIST:
                return {
                    ...state,
                    assetList: action.list
                }
        case TYPES.SET_ASSET_TYPES:
                return {
                    ...state,
                    assetTypes: action.list
                }
        case TYPES.UPDATE_ASSET:
                let newAssetList = state.assetList.map(asset =>{
                    if(asset.id === action.asset.id) return action.asset;
                    else return asset;
                })
                return {
                    ...state,
                    assetList:newAssetList
                }
        default:
            return state;
    }    
}