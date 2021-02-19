<template>
    <router-view/>
</template>
<style src="../node_modules/@fortawesome/fontawesome-free/css/all.min.css"></style>
<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";
@import "admin-lte";
@import "./css/custom.css";
@import "./css/main.scss";

@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.bubble.css';
@import 'quill/dist/quill.snow.css';

*,*:focus,*:hover{
    outline:none;
}
  // @import '~@fortawesome/fontawesome-free/css/all.min.css';

</style>
<script>

export default {
  components:{
  } ,  
  mounted() {
    document.body.classList.add('sidebar-min', 'layout-fixed')
  },
}
</script>