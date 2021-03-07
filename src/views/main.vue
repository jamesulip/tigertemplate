<template>

    <div class="wrapper">
      <topMenu />
        <sideMenu class="main-sidebar"/>
 

      <div class="content-wrapper">

        <b-overlay :show="loadingState" rounded="sm">
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
    mapState,mapGetters
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
    mounted() {
      document.title = "Sales";


      // axios.post(`cors/auth/test_connection`)
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   })
    },
    components: {
      sideMenu: () => import('../components/menus/side-menu2.vue'),
      topMenu: () => import('../components/menus/top-menu.vue')
    }
  }
</script>