<template>
  <router-view />
</template>
<style
  src="../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
></style>
<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";
@import "admin-lte";
@import "./css/custom.css";
@import "~vue-select/dist/vue-select.css";
*,*:focus,*:hover{
    outline:none;
}

.media-attachment{
  &:not(:first-child){
    margin-top: $spacer/2;
  }
  padding-left: $spacer/2;
  align-items: center;
  border-left: 4px solid $border-color;
  .media-body{
    margin-left: $spacer/2;
    > a{
      display: block;
    }
  }
  div.avatar{
    border: none;
  }
}

.media-member{
  align-items: center;
  margin-bottom: $spacer;
  .media-body{
    margin-left: $spacer/2;
  }
}
</style>
<script>
export default {
  components: {},
  mounted() {
    document.body.classList.add("sidebar-min", "layout-fixed");
  }
};
</script>
