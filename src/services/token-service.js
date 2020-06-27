import config from '../config';

const TokenService ={
    saveAuthToken(token){
        window.localStorage.setItem(config.TOKEN_KEY, token)
    },
    getAuthToken() {
        return window.localStorage.getItem(config.TOKEN_KEY)
    },
    clearAuthToken(){
        window.localStorage.removeItem(config.TOKEN_KEY)
    },
    makeBasicAuthToken(userName, password){
        return window.btoa(`${userName}:${password}`)
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken()
    },
}
export default TokenService;