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
export default {
  methods: {
    logout(){
       this.$store.commit('logout');
                this.$router.push('/login');
    }
  },
}
</script>