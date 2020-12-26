<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <!-- <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a> -->
      </li>
    </ul>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <b-collapse id="nav-collapse" class="mr-5" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
              <!-- <img src="https://adminlte.io/themes/dev/AdminLTE/dist/img/user2-160x160.jpg"
              class="user-image img-circle elevation-2 mr-2" style="width:2rem" alt="User Image"> -->
            <span class="d-none d-md-inline">{{$store.state.currentUser.name}}</span>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>


   
    </b-collapse>
  </nav>
</template>

<script>
  /* eslint-disable */
  export default {
    methods: {
      logout() {
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