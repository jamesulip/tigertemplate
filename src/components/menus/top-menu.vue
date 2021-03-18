<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light top-0" style="position:sticky">
   
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
      </li>
      
      <b-navbar-nav>
            <div class="ml-3 flex items-center">
                <updateButton :showView="true" class="my-auto" v-if="current_job.ID" :size="`xs`" :key="`btnupdate-${current_job.ID}`" :Project="current_job" @saved="set_my_projects()" />

                
                <div class="px-3">
                  <timeago :converterOptions="{ includeSeconds: true }" v-if="current_job.ID"  :datetime="current_job.updated_at"></timeago>
                </div>
            </div>  
          </b-navbar-nav>
    </ul>

    <b-collapse id="nav-collapse" is-nav>
      <b-collapse id="nav-collapse" class="h-full" is-nav>
        
        <b-navbar-nav class="ml-auto">
          
          <b-nav-item-dropdown right>
            <template #button-content>
                <!-- <img src="https://adminlte.io/themes/dev/AdminLTE/dist/img/user2-160x160.jpg"
                class="user-image img-circle elevation-2 mr-2" style="width:2rem" alt="User Image"> -->
              <span class="d-none d-md-inline">{{currentUser.name}}</span>
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
import { mapGetters, mapMutations, mapState } from 'vuex';
  /* eslint-disable */
  export default {
    computed: {
      ...mapState(['currentUser','current_job'])
    },
    methods: {
      ...mapGetters(['getCurrentJob']),
      ...mapMutations(['set_my_projects']),
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