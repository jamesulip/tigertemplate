/* eslint-disable no-unused-vars */

import axios from 'axios'


export const myLoginRoutine = user => new Promise ((resolve, reject) => {
    axios({url: 'cors/auth/login', data: user, method: 'POST' })
      .then(resp => {
      
        localStorage.setItem('user-token', resp.data.access_token) // store the token in localstorage
        localStorage.setItem('user', JSON.stringify( resp.data.user)) // store the token in localstorage
        resolve(resp)
      })
    .catch(err => {
      localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
      localStorage.removeItem('user') // if the request fails, remove any possible user token if possible
      reject(err)
    })
  })

export function checkLogin(){
   
    return axios.get(`cors/auth/me`,)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err); 
    })
}
export function getLocalUser() {
  const userStr = localStorage.getItem("user");

  if(!userStr) {
      return null;
  }

  return JSON.parse(userStr);
}