export const BASE_URL = "http://asset-management-system-api.herokuapp.com/api/v1/firms/1";
function request(options) {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem('token')) {
        headers.append('Authorization', localStorage.getItem('token'))
    }
    // headers.append('Authorization', "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6IlJPTEVfRklSTV9BRE1JTixST0xFX0ZJUk1fRU1QTE9ZRUUiLCJzdWIiOiJraGFuaDQiLCJpc3MiOiJBc3NldCBNYW5hZ2VtZW50IFN5c3RlbSBBUEkiLCJpYXQiOjE1NzYwNTExOTQsImV4cCI6MTU3NjY1NTk5NH0.ZhFqQSf2QofQjDDdUjm2WSJLstXPC3VAKkg-9ER4BAMrGJJ86cAw4dqP_ni0U_YBNA6mSNqIps8-wF8CmsoRZQ")
    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json.payload;
            })
        );
};
export function getAllAsset() {
    return request({
        url: BASE_URL + "/assets",
        method: 'GET',
    });
}
export function getAllAssetTypes(){
    return request({
        url: BASE_URL + "/asset-types",
        method: 'GET'
    })
}
export function updateAsset(data){
    return request({
        url: BASE_URL + "/assets/"+data.id,
        method: 'PUT',
        body: JSON.stringify(data)
    })
}
export function deleteAsset(id){
    return request({
        url: BASE_URL + "/assets/"+id,
        method: 'DELETE'
    })
}
export function addAsset(asset){
    return request({
        url: BASE_URL + "/assets",
        method: 'POST',
        body: JSON.stringify(asset)
    })
}
export function getAllLocations(){
    return request({
        url: BASE_URL + "/locations",
        method: 'GET'
    })
}
export function getEmployees(){
    return request({
        url: BASE_URL + "/employees",
        method: 'GET'
    })
}
export function getDepartments(){
    return request({
        url: BASE_URL + "/departments",
        method: 'GET'
    })
}
export function updateDepartment(department){
    return request({
        url: BASE_URL + "/departments/" + department.id,
        method: 'PUT',
        body: JSON.stringify(department)
    })
}
export function addEmployees(employees){
    return request({
        url: BASE_URL + "/employees",
        method: 'POST',
        body: JSON.stringify(employees)
    })
}
export function addDepartment(department){
    return request({
        url: BASE_URL + "/departments",
        method: 'POST',
        body: JSON.stringify(department)
    })
}
export function updateEmployees(employees){
    return request({
        url: BASE_URL + "/employees",
        method: 'PUT',
        body: JSON.stringify(employees)
    })
}
export function login(data){
    return request({
        url: "http://asset-management-system-api.herokuapp.com/api/v1/authenticate",
        method: 'POST',
        body: JSON.stringify(data)
    })
}
export function deleteDepartment(id){
    return request({
        url: BASE_URL + "/departments/"+id,
        method: 'DELETE'
    })
}
export function deleteAssetType(id){
    return request({
        url: BASE_URL + "/asset-types/"+id,
        method: 'DELETE'
    })
}
export function updateAssetType(assetType){
    let params = "";
    if(assetType.receiverId) 
        params = "?receiverId="+ assetType.receiverId;
    return request({
        url: BASE_URL + "/asset-types/" + assetType.id + params,
        method: 'PUT',
        body: JSON.stringify(assetType)
    })
}
export function addAssetType(assetType){
    return request({
        url: BASE_URL + "/asset-types",
        method: 'POST',
        body: JSON.stringify(assetType)
    })
}