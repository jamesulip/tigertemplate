<template #button-content>
    <li role="presentation">
        <a role="button" class="dropdown-item" @click="open_jo_add_modal = true">
            <slot>
                Add Job Order
            </slot>

        </a>
        <b-modal lazy  no-close-on-esc  no-close-on-backdrop :title="`Add Job Order`" size="lg" v-model="open_jo_add_modal">
            <jo_form v-model="data"/>
        </b-modal>
    </li>
</template>
<script>
    import jo_form from './forms'
    export default {
        components:{
            jo_form
        },
        data() {
            return {
                open_jo_add_modal: false,
                data:{}
            }
        },
        
    }
</script>