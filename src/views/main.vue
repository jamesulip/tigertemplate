<template>

    <div class="wrapper">
      <topMenu />
        <sideMenu class="main-sidebar"/>
 

      <div class="content-wrapper">

        <b-overlay :show="loadingState" rounded="sm" >
        <!-- <keep-alive> -->
          <router-view />
        <!-- </keep-alive> -->
        </b-overlay>

      </div>
    </div>

</template>

<script>
  /* eslint-disable  */
  import {
    mapState,mapGetters, mapActions
  } from 'vuex'
  export default {
    computed: {
      ...mapState([
        'currentUser','serUrl'
      ]),
      ...mapGetters([
        'loadingState'
      ])

    },
    methods: {
      ...mapActions(['set_trails'])
    },
    mounted() {
      document.title = "Sales";
      this.set_trails()
    },
    components: {
      sideMenu: () => import('../components/menus/side-menu2.vue'),
      topMenu: () => import('../components/menus/top-menu.vue')
    }
  }
</script>