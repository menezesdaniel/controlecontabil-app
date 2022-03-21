import axios from "axios";

// indica a url raiz do servidor
const httpClient = axios.create({
    baseURL: 'https://controlecontabil-api.herokuapp.com/'

})

class ApiService{

    // construtor da classe
    constructor(apiurl){
        this.apiurl = apiurl;
    }

    // metodo POST
    post(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl, objeto);
    }

    // metodo PUT
    put(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, objeto);
    }

    // metodo DELETE
    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl);
    }

    // metodo GET
    get(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl);
    }


}

export default ApiService