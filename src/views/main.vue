<template>
  <div class="wrapper">
    <topMenu />
    <sideMenu />
    <div class="content-wrapper">
      <b-overlay :show="loadingState" rounded="sm">
        <router-view />
      </b-overlay>
    </div>
        <portal to="destination" >
          asd2
        </portal>
    <portal-target class="fixed right-0 bottom-0" name="destination"/>
    </div>
 
</template>
<script>
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    computed: {
      ...mapState([
        'currentUser', 'serUrl'
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
      this.set_trails({
        page: `cors/notifications2`
      })
    },
    components: {
      sideMenu: () => import('../components/menus/side-menu2.vue'),
      topMenu: () => import('../components/menus/top-menu.vue')
    }
  }
</script>