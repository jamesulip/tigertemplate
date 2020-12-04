<template>
  <nav class="mt-2">
    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
      <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
      <menu_item :to="{name:'home'}" :routeName="'home'">
        <div slot="title">
          <i class="nav-icon fas fa-th"></i>
          Home
        </div>
      </menu_item>
       <menu_item :to="{name:'projects'}" :routeName="'projects'" >
        <div slot="title">
          <i class="nav-icon fas fa-th"></i>
          Projects
        </div>
      </menu_item>
      <menu_item :to="{name:'delegate'}" :routeName="'delegate'" >
        <div slot="title">
          <i class="nav-icon fas fa-th"></i>
          Delegate Project
        </div>
      </menu_item>

    </ul>
  </nav>
</template>

<script>
  export default {
    components: {
      menu_item: () => import('./menu.vue'),
    }
  }
</script>