export const addAsset = asset => ({
    type: TYPES.ADD_ASSET,
    asset
  })
export const setAssetList = list =>{
  return {
    type: TYPES.SET_ASSET_LIST,
    list
  }
}
export const setAssetTypes = list => ({
  type: TYPES.SET_ASSET_TYPES,
  list
})
export const updateAsset = asset => ({
  type: TYPES.UPDATE_ASSET,
  asset
})
export const TYPES = {
  SET_ASSET_LIST:"SET_ASSET_LIST",
  ADD_ASSET: "ADD_ASSET",
  SET_ASSET_TYPES:"SET_ASSET_TYPES",
  UPDATE_ASSET:"UPDATE_ASSET",
}
