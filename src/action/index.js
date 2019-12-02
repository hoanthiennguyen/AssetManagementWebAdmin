export const addAsset = asset => ({
    type: TYPES.ADD_ASSET,
    asset
  })
export const setListAsset = list =>{
  return {
    type: TYPES.SET_ASSET_LIST,
    list
  }
}
export const TYPES = {
  SET_ASSET_LIST:"SET_ASSET_LIST",
  ADD_ASSET: "ADD_ASSET"
}
