<template>
    <div>
        <div class="flex items-center">
            <b-avatar class="avatar mr-2 " :src="`${serUrl}${value.userl.img}`" size="md"></b-avatar>
            <div class="ml-2 w-full">
                
                <div class="text-sm ">
                    <span class="font-semibold">{{value.userl?value.userl.name:'mumu'}}</span>
                </div>
                <div class="text-gray-500 text-xs " v-html="value.userl?value.userl.role:'mumu'"></div>
                <div class="text-gray-500 text-xs flex">
                    <span class="inline-block">{{value.created_at | formatDate('ago')}}</span>
                </div>
            </div>
        </div>
        <p class="text-gray-800 text-sm mt-2 leading-normal md:leading-relaxed" v-html="value.content"></p>
        <div class="row text-sm bg-red-100"  >
            <div @click="get_inst()" class="ml-2 flex my-1 w-full max-w-xl overflow-hidden hover:shadow-md cursor-pointer bg-white rounded-lg shadow-sm dark:bg-gray-800">
                <div class="flex border-r bg-yellow-500 items-center justify-center px-4 w-12 font-black text-gray-100" >
                    REV
                </div>
                <div class="px-4 py-1 -mx-3 w-full " >
                    <div class="mx-3 flex justify-between">
                       <div>
                            <div class="block text-sm text-gray-600 dark:text-gray-200 text-truncate">
                                <span class="">{{value.attached_project.TYPE}}#{{value.attached_project.NUM}}</span>
                                <span class="text-md"> rev.</span>
                                <span class="text-lg font-bold" >{{value.attached_project.VERSION}}</span>
                            </div>
                            <div>
                                     {{value.attached_project.created_at | formatDate('LL')}}
                            </div>
                       </div>
                       <div class="flex items-center">

                       </div>
                    </div>
                </div>
                
            </div>
    
        </div>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    export default {
        props: ['value'],
        computed: {
            ...mapState(['serUrl'])
        },
        methods: {
            get_inst() {
                this.$emit('showdetails',this.value.error.DETAILID)
            }
        },
    }
</script>