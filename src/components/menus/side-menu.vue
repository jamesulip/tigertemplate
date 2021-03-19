<template>
  <nav class="mt-2">
    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
      <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
      <menu_item :to="{name:'trail'}" :routeName="'trail'">
        <div slot="title">
          <i class="nav-icon fas fa-th"></i>
          Job Trail
        </div>
      </menu_item>
       <menu_item :to="{name:'projects'}" :routeName="'projects'" >
        <template slot="title">
          <i class="nav-icon fas fa-th"></i>
          Dashboard
          <span class="right badge badge-danger">{{my_projects.data?my_projects.data.length: 0}}</span>
        </template>
        
      </menu_item>
      <menu_item :to="{name:'delegate'}" :routeName="'delegate'" admin>
        <div slot="title">
          <i class="nav-icon fas fa-th"></i>
          Delegate Project
        </div>
      </menu_item>
      <menu_item :to="{name:'timeline'}" :routeName="'timeline'" >
        <div slot="title">
          <i class="nav-icon fas fa-th"></i>
          Timeline
        </div>
      </menu_item>
      <menu_item :to="{name:'history'}" :routeName="'history'" >
        <div slot="title">
          <i class="nav-icon fas fa-th"></i>
          History
        </div>
      </menu_item>

    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    components: {
      menu_item: () => import('./menu.vue'),
    },
    computed: {
      ...mapState(['my_projects'])
    },
  }
</script>