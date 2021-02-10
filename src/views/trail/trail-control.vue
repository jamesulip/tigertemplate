<template>
    <div class="mailbox-controls">
        <!-- Check all button -->
        <!-- <button type="button" class="btn btn-link btn-sm checkbox-toggle">
            <i class="far fa-square"></i>
        </button>
        <div class="btn-group">
              <button type="button"  class="btn btn-link btn-sm">
                 <b-icon-trash></b-icon-trash>
            </button>
           
        </div> -->

      
        <div class="float-right">
            {{value.from}}- {{value.to}}/ {{value.total}}
            <div class="btn-group">
                 <b-button @click="$emit('pageChange',value.prev_page_url)" :disabled="loading || !value.prev_page_url" variant="link">
              <b-icon-arrow-left></b-icon-arrow-left>
            </b-button>
              <b-button variant="link" :disabled="loading" @click="$emit('pageChange','refresh')">
            <b-icon-arrow-clockwise></b-icon-arrow-clockwise>
        </b-button>
            <b-button @click="$emit('pageChange',value.next_page_url)" :disabled="loading || !value.next_page_url" variant="link">
                 <b-icon-arrow-right></b-icon-arrow-right>
            </b-button>
            </div>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
export default {
    props:{
        value:{
            default(){

            },
            type:Object
        },
        pageChange: { type: Function },
        loading:false

    },
    data() {
        return {
            current_url:null,
         
        }
    },
    methods: {
        
    
    },
}
</script>