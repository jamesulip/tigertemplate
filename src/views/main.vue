<template>
  <div class="about">
    <div class="wrapper">

      <!-- Navbar -->
      
      <topMenu/>
      <!-- /.navbar -->

      <!-- Main Sidebar Container -->
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="index3.html" class="brand-link">
          <img src="https://adminlte.io/themes/dev/AdminLTE/dist/img/AdminLTELogo.png" alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3" style="opacity: .8">
          <span class="brand-text font-weight-light">AdminLTE 3</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
          <!-- Sidebar user panel (optional) -->
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
         
              <!-- <img :src="''"
                class="img-circle elevation-2" alt="User Image"> -->
                 <b-avatar button style="    width: 40px;height: 40px;" variant="primary" :text="getInitial($store.state.currentUser.name)" class="align-baseline"></b-avatar>
           
            <div class="info">
              <a href="#" class="d-block">{{$store.state.currentUser.name}}</a>
            </div>
          </div>

          <!-- Sidebar Menu -->
          <sideMenu/>
         
          <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
      </aside>

      <div class="content-wrapper">
        <div class="content">
          <router-view/>
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