<template>
  <div class="about">
    <div class="wrapper">
      <topMenu/>
      <aside class="main-sidebar sidebar-light-warning border-r overflow-hidden elevate-1">
        <a href="index3.html" class="brand-link">
          <img src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-ipage-v1-0-2%2F752%2F533752%2FhworyvZU%2F6d67c622dc5443c59bce42015f241a75&methods=resize%2C500%2C5000" alt="AdminLTE Logo"
            class="brand-image " style="opacity: .8">
          <span class="brand-text font-weight-light">.</span>
        </a>
        <div class="sidebar">
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                 <b-avatar :src="currentUser.img" button style="width: 40px;height: 40px;" variant="primary" :text="getInitial($store.state.currentUser.name)" class="align-baseline"></b-avatar>
           
            <div class="info">
              <a href="#" class="d-block">{{$store.state.currentUser.name}}</a>
            </div>
          </div>
          <sideMenu/>
        </div>
      </aside>

      <div class="content-wrapper bg-white" >
       
          <!-- <b-overlay :show="$store.getters.loadingState" rounded="sm"> -->
          <router-view/>
          <!-- </b-overlay> -->
        
      </div>
  

    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
/* eslint-disable  */


export default {
  mounted() {
       document.title = "Creatives!";
        this.$store.dispatch('set_current_job').then(x => {})
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  components:{
    sideMenu:()=>import('../components/menus/side-menu.vue'),
    topMenu:()=>import('../components/menus/top-menu.vue')
  }
}
</script>