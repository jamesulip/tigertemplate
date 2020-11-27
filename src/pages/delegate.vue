<template>
    <div>
        asd
    </div>
</template>
<script>
/* eslint-disable */
export default {
    
    mounted() {
        axios.get(`cors/clients`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err); 
        })
    },
}
</script>