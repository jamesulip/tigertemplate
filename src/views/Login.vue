<template>
<div class="login-page">
 <div class="login-box">
  <div class="login-logo">
    <a href="http://tigergraphics.com.ph"><b>Tiger</b>graphics</a>
  </div>
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Sign in to start your session</p>

      
        <div class="input-group mb-3">
          <input type="email" v-model="auth.email" class="form-control" placeholder="Email">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" v-model="auth.password" class="form-control" placeholder="Password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember">
              <label for="remember">
                Remember Me
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <b-overlay :show="loading" rounded="xs" spinner-small> 
            <button type="submit" @click="login()" class="btn btn-primary btn-block">Sign In</button>
            </b-overlay>
          </div>
          <!-- /.col -->
        </div>
   



      <p class="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p>
      <p class="mb-0">
        <a href="register.html" class="text-center">Register a new membership</a>
      </p>
      
    </div>
    <!-- /.login-card-body -->
  </div>
</div>
</div>
</template>
<script>
/* eslint-disable no-unused-vars */

import {myLoginRoutine} from '../js/login'
export default {
    data() {
        return {
            auth:{
                email:'erine.atordido@tigergraphics.com.ph',
                password:'erinemariele'
            },
            loading:false
        }
    },

    methods: {
        login(){
          this.loading = true
                myLoginRoutine(this.auth).then((x) => {
                    this.$store.commit("loginSuccess", x.data);
                    this.$router.push('/')
                }).catch(x=>{
                  this.loading = false
                })
        }
    },
}
</script>