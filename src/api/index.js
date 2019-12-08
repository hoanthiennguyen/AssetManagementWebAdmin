export const BASE_URL = "http://asset-management-system-api.herokuapp.com/api/v1/firms/1";
function request(options) {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem('accessToken')) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
    }

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