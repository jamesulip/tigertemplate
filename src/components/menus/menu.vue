<template>
  <li class="nav-item ">
    <router-link
      :to="to"
      class="nav-link"
      :class="{ active: $route.name == routeName }"
    >
      <p>
        <slot name="title">
          {{ routeName }}
        </slot>
        <!-- <span class="right badge badge-danger">New</span> -->
      </p>
    </router-link>
  </li>
</template>
<script>
export default {
  props: ["to", "routeName"]
};
</script>
