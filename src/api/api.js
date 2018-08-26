import axios from 'axios'
import Qs from 'qs'

axios.defaults.withCredentials = true

let base = 'http://localhost:8082'

var config = {
    transformRequest: [data => Qs.stringify(data)],
}
export const login = params => axios.post(`${base}/login`, params, config).then(res => res.data)
export const queryStation = params => axios.post(`${base}/query`, params, config).then(res => res.data)
export const trainLogin = params => axios.post(`${base}/trainlogin`, params, config).then(res => res.data)
export const submitOrder = params => axios.post(`${base}/submitOrder`, params, config).then(res => res.data)