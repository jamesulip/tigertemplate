<template>
  <body class="sidebar-mini layout-fixed">
    <home/>
  </body>  
</template>
<style src="../node_modules/@fortawesome/fontawesome-free/css/all.min.css"></style>
<style lang="scss">
  @import "admin-lte";
  // @import '~@fortawesome/fontawesome-free/css/all.min.css';

</style>
<script>

export default {
  components:{
    home:()=>import('./views/Home')
  }   
}
</script>