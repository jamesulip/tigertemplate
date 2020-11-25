<template>
  <nav class="mt-2">
    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
      <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
      <menu_item :to="{name:'home'}" :routeName="'home'"/>
      <menu_item :to="{name:'login'}" :routeName="'login'"/>
     
    </ul>
  </nav>
</template>

<script>
export default {
  components:{
    menu_item:()=>import('./menu.vue'),
  }
}
</script>