<template>
    <router-view/>
</template>
<style src="../node_modules/@fortawesome/fontawesome-free/css/all.min.css"></style>
<style lang="scss">
  @import "admin-lte";
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