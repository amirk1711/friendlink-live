export function getFormBody(params) {
    let formBody = [];
    for(let property in params){
        let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]); //Amir Khan => Amir%20Khan

        formBody.push(encodedKey + '=' + encodedValue);

        return formBody.join('&');
    }
}   