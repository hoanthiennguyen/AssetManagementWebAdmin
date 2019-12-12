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
export const deleteAsset = id => ({
  type: TYPES.DELETE_ASSET,
  id
})
export const setLocations = locations => ({
  type: TYPES.SET_LOCATIONS,
  locations
})
export const setEmployees = employees => ({
  type: TYPES.SET_EMPLOYEES,
  employees
})
export const setDepartments = departments => ({
  type: TYPES.SET_DEPARTMENTS,
  departments
})
export const updateDepartment = department => ({
  type: TYPES.UPDATE_DEPARTMENT,
  department
})
export const addEmployees = employees => ({
  type: TYPES.ADD_EMPLOYEES,
  employees
})
export const addDepartment = department => ({
  type: TYPES.ADD_DEPARTMENT,
  department
})
export const updateEmployees = employees => ({
  type: TYPES.UPDATE_EMPLOYEES,
  employees
})
export const TYPES = {
  SET_ASSET_LIST:"SET_ASSET_LIST",
  ADD_ASSET: "ADD_ASSET",
  SET_ASSET_TYPES:"SET_ASSET_TYPES",
  UPDATE_ASSET:"UPDATE_ASSET",
  DELETE_ASSET: "DELETE_ASSET",
  SET_LOCATIONS:"SET_LOCATIONS",
  SET_EMPLOYEES:"SET_EMPLOYEES",
  SET_DEPARTMENTS:"SET_DEPARTMENTS",
  UPDATE_DEPARTMENT:"UPDATE_DEPARTMENT",
  ADD_EMPLOYEES:"ADD_EMPLOYEES",
  ADD_DEPARTMENT:"ADD_DEPARTMENT",
  UPDATE_EMPLOYEES:"UPDATE_EMPLOYEES",
}
