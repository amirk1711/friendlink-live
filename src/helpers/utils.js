export function getFormBody(params) {
    let formBody = [];
    for(let property in params){
        let encodedKey = encodedURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodedURIComponent(params[property]); //Amir Khan => Amir%20Khan

        formBody(encodedKey + '=' + encodedValue);

        return formBody.join('&');
    }
}