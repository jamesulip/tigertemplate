<template>
    <div>
        <div class="flex items-center">
            <b-avatar class="avatar mr-2 " :src="`${serUrl}${value.userl.img}`" size="md"></b-avatar>
            <div class="ml-2">
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
    
        <div class="row text-sm bg-blue-300" v-if="Boolean(value.proposals.length)" >
            <div class="ml-1 flex my-1 w-full max-w-xl overflow-hidden hover:shadow-md cursor-pointer bg-white rounded-lg shadow-sm dark:bg-gray-800" @click="$router.push({name:'view_porposed',params:{file:p.id}})" v-for="p in proposals" :key="`pf-${p.id}`">
                <div class="flex border-r items-center justify-center px-4 w-12 " :class="{'bg-red-500':p.files.file_info.Status=='rejected'}">
                     <i class="far fa-file-pdf m-auto text-3xl text-gray-300"></i>
                </div>

                <div class="px-4 py-2 -mx-3 w-full" >
                    <div class="mx-3">
                        <div class="block text-sm text-gray-600 dark:text-gray-200 text-truncate">
                            <span class="">{{p.files.filename}}</span>
                        </div>
                        <div>
                            <span class="font-semibold text-blue-500 dark:text-blue-400">Version
                                {{value.attached_project.VERSION}}</span>
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
        data() {
            return {
                proposals:[]
            }
        },
        mounted() {
            // this.get_ins()
            axios.get(`/cors/proposed_files/${this.value.id}`)
                .then(res => {
                    // console.log(res)
                    this.proposals = res.data
                })
        },
        methods: {
            get_inst() {

                // axios.get(`/cors/proposed_files/${this.value.id}`)
                // .then(res => {
                //     console.log(res)
                // })

            }
        },
    }
</script>