import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/';
export default axios.post(`cors/auth/me`)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.error(err); 
})