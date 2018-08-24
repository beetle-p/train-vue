import axios from 'axios'
import Qs from 'qs'

let base = 'http://localhost:8080'

var config = {
  transformRequest: [data => Qs.stringify(data)],
}
export const login = params => axios.post(`${base}/login`, params, config).then(res => res.data)