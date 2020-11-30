<template>
<nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <a href="index3.html" class="nav-link">Home</a>
          </li>
          <li class="nav-item d-none d-sm-inline-block" @click="logout">
            <a href="#" class="nav-link">Contact</a>
          </li>
        </ul>
      </nav>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    logout(){
        axios.post(`cors/auth/logout`)
        .then(res => {
          this.$store.commit('logout');
          this.$router.push('/login');
        })
        .catch(err => {
          console.error(err); 
        })
    }
  },
}
</script>