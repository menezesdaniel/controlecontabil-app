import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

// indica a url raiz do servidor
const httpClient = axios.create({
    baseURL: baseURL,    
    withCredentials: true,
})

class ApiService{

    // construtor da classe
    constructor(apiurl){
        this.apiurl = apiurl;
    }

    static registrateToken(token){
        if(token){
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
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