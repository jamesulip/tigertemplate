<template>
    <div>
        <b-button @click="showNotification('gege','gogo','gugu','danger')">Show Toast with custom content</b-button>
    </div>
</template>

<script>
/*eslint-disable*/
    import test from '../plugin'
    export default {
        components:{
            test
        },
        data() {
            return {
                count: 0
            }
        },
        methods: {
           
        }
    }
</script>