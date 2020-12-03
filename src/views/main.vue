<template>
  <div class="about">
    <div class="wrapper">
      <topMenu/>
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" class="brand-link">
          <img src="https://adminlte.io/themes/dev/AdminLTE/dist/img/AdminLTELogo.png" alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3" style="opacity: .8">
          <span class="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        <div class="sidebar">
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                 <b-avatar button style="    width: 40px;height: 40px;" variant="primary" :text="getInitial($store.state.currentUser.name)" class="align-baseline"></b-avatar>
           
            <div class="info">
              <a href="#" class="d-block">{{$store.state.currentUser.name}}</a>
            </div>
          </div>
          <sideMenu/>
        </div>
      </aside>

      <div class="content-wrapper">
        <div class="content">
          <!-- <b-overlay :show="$store.getters.loadingState" rounded="sm"> -->
          <router-view/>
          <!-- </b-overlay> -->
        </div>
      </div>
  

    </div>
  </div>

</template>

<script>
/* eslint-disable  */

export default {
  components:{
    sideMenu:()=>import('../components/menus/side-menu.vue'),
    topMenu:()=>import('../components/menus/top-menu.vue')
  }
}
</script>