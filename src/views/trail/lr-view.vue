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
        <div class="row text-sm" v-if="Boolean(value.proposals.length)">
            <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div class="flex items-center justify-center w-12 bg-blue-500">
                    <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                    </svg>
                </div>

                <div class="px-4 py-2 -mx-3">
                    <div class="mx-3">
                        <span class="font-semibold text-blue-500 dark:text-blue-400">Info</span>
                        <p class="text-sm text-gray-600 dark:text-gray-200">This channel archived by the owner!</p>
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
        mounted() {
            // this.get_ins()
            axios.get(`/cors/proposed_files/${this.value.id}`)
                .then(res => {
                    console.log(res)
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