<template>
  <router-link tag="li" :to="to" class="nav-item" :class="{'active':$route.name ==routeName}" v-if="admin?currentUser.admin:true">
    <a class="nav-link">
      <slot name="title">
        {{routeName}}Admin
      </slot>
    </a>
  </router-link>

</template>
<script>
import { mapState } from 'vuex'
  export default {
    // props: ['to', 'routeName'],
    props:{
      to:{
        type:Object,
      },
      routeName:{
          type:String
      },
      admin:{
        type:Boolean,
        default:false
      }
    },
   computed: {
     ...mapState(['currentUser'])
   }, 
  }
</script>

