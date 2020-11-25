<template>
    <li class="nav-item " >
       <!-- <b-overlay :show="true" :opacity="0.11" rounded="xs"
       spinner-small  spinner-type="grow"> -->
        <router-link :to="to" class="nav-link" :class="{'active':$route.name ==routeName}">
          <i class="nav-icon fas fa-th"></i>
          <p>
            Simple Link
            <span class="right badge badge-danger">New</span>
          </p>
        </router-link>
       <!-- </b-overlay> -->
      </li>
</template>
<script>
export default {
  props:['to','routeName']
}
</script>