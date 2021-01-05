<template>
  <div>
    Home
  </div>
</template>
<script>
/* eslint-disable */
export default {
    mounted() {
        axios.post(`cors/auth/me`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err); 
        })
    },
}
</script>