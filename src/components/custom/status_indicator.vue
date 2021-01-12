<template>
    <b-badge :pill="pill" :variant="statusVariant()">{{value}}</b-badge>
</template>
<script>
import {statusVariant} from '../../js/helper.js'
export default {
    props:['value','pill'],
    methods: {
        statusVariant(){
            return statusVariant(this.value)
        }
    },
}
</script>