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
        case TYPES.DELETE_ASSET:
                let updated = state.assetList.filter((asset) => asset.id !== action.id)
                return {
                    ...state,
                    assetList:updated
                }
        case TYPES.ADD_ASSET:
                return {
                    ...state,
                    assetList:state.assetList.concat(action.asset)
                }
        case TYPES.SET_LOCATIONS:
                return {
                    ...state,
                    locations:action.locations
                }
        case TYPES.SET_EMPLOYEES:
                return {
                    ...state,
                    employees:action.employees
                }
        case TYPES.SET_DEPARTMENTS:
                return {
                    ...state,
                    departments:action.departments
                }
        case TYPES.UPDATE_DEPARTMENT:
                return {
                    ...state,
                    departments:state.departments.map(department =>{
                        if(department.id === action.department.id) return action.department;
                        else return department;
                    })
                }
        case TYPES.ADD_EMPLOYEES:
                return {
                    ...state,
                    employees: state.employees.concat(action.employees)
                }
        case TYPES.ADD_DEPARTMENT:
                return {
                    ...state,
                    departments: state.departments.concat(action.department)
                }
        default:
            return state;
    }    
}