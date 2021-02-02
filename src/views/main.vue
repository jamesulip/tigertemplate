<template>
  <div class="about">
    <div class="wrapper">
      <topMenu />
      <aside class="main-sidebar sidebar-dark bg-dark">
        <a href="index3.html" class="brand-link">
          <img
            src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-ipage-v1-0-2%2F752%2F533752%2FhworyvZU%2F6d67c622dc5443c59bce42015f241a75&methods=resize%2C500%2C5000"
            alt="AdminLTE Logo" class="brand-image " style="opacity: .8" />
          <span class="brand-text font-weight-light">.</span>
        </a>
        <div class="sidebar">
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <b-avatar button style="    width: 40px;height: 40px;" variant="primary"
              :text="getInitial(currentUser.name)" class="align-baseline"></b-avatar>

            <div class="info">
              <a href="#" class="d-block">{{
                currentUser.name
              }}</a>
            </div>
          </div>
          <sideMenu />
        </div>
      </aside>

      <div class="content-wrapper">

        <b-overlay :show="loadingState" rounded="sm">
        <keep-alive>
          <router-view />
        </keep-alive>
        </b-overlay>

      </div>
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
        'currentUser'
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
      sideMenu: () => import('../components/menus/side-menu.vue'),
      topMenu: () => import('../components/menus/top-menu.vue')
    }
  }
</script>