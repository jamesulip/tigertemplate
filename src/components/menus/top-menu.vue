<template>
  <nav class="sticky top-0 main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" @click="toggleSide()"  href="#">
          <b-icon-arrow-bar-left v-if="collapseButton"/>
          <b-icon-arrow-bar-right v-else/>
        </a>
      </li>
    </ul>

    <b-collapse id="nav-collapse" is-nav>
      <b-collapse id="nav-collapse" class="mr-5" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <!-- <img src="https://adminlte.io/themes/dev/AdminLTE/dist/img/user2-160x160.jpg"
              class="user-image img-circle elevation-2 mr-2" style="width:2rem" alt="User Image"> -->
              <span class="d-none d-md-inline">{{
                currentUser.name
              }}</span>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout2()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-collapse>
  </nav>
</template>

<script>
  /* eslint-disable */
  import {
    mapGetters,mapMutations
  } from 'vuex'

  export default {
    data() {
      return {
        collapseButton:false
      }
    },
    computed: {
      ...mapGetters([
        'currentUser'
      ]),
    },
 
    methods: {
       ...mapMutations(['logout','setLoading']),

      toggleSide(){
        this.$nextTick().then(() =>{
            if( $('body').hasClass('sidebar-collapse')){
              document.body.classList.remove('sidebar-collapse')
              this.collapseButton = false
            }
            else{
              document.body.classList.add('sidebar-collapse')
              this.collapseButton = true
            }
        })
      },

      logout2() {
        this.setLoading(true)
        axios.post(`cors/auth/logout`)
          .then(res => {
            this.logout()
             this.setLoading(false)
            this.$router.push('/login');
          })
          .catch(err => {
            console.error(err);
          })
      }
    },
  }
</script>