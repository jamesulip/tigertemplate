<template>
 <transition name="fade" mode="out-in">
      <keep-alive v-if="keepAlive()">
            <router-view ></router-view>
      </keep-alive>
      <router-view v-else></router-view>
 </transition>
</template>
<script>
import _ from 'lodash'
export default {
      methods: {
            keepAlive(){
                  return _.isEmpty(this.$route.params);
                  // return Object.keys(this.$route.params).length === 0
            }
      },
}
</script>