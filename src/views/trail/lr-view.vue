<template>
    <div>
        <div class="flex items-center">
            <b-avatar class="avatar mr-2 " :src="`${serUrl}${value.userl.img}`" size="md"></b-avatar>
            <div class="ml-2">sssssssss
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
        <div class="row text-sm" v-if="value.file">
            <div class="col-md-12">
                <hr>
                <div class="row">
                    <template v-for="(item, index) in value.file">
                        <div class="col-md-3 p-2" :key="`f-${index}`">
                            <div class="media media-attachment ">

                                <b-avatar @click="check_mime(item.file_meta.ext)?full_screen_image(value.file):null"
                                    button rounded="sm" size="2rem" :src="`${serUrl}${item.thumb}`" variant="primary"
                                    icon="paperclip">

                                </b-avatar>
                                <div class="media-body  text-truncate">
                                    <a role="button" v-b-tooltip="{ title: item.filename, placement: 'bottom' }"
                                        @click="check_mime(item.file_meta.ext)?full_screen_image(value.file):null"
                                        class=" text-truncate">{{item.filename}}</a>
                                    <span class="text-muted text-xs">{{item.file_meta.size | bytesToSize(2)}} <a
                                            v-b-tooltip="'download'" :href="`${serUrl}/cors/downloadFile2/${item.id}`"
                                            target="_blank"><i class="fa fa-download" aria-hidden="true"></i></a></span>
                                </div>
                            </div>
                        </div>
                    </template>
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
            get_inst(){
             
                // axios.get(`/cors/proposed_files/${this.value.id}`)
                // .then(res => {
                //     console.log(res)
                // })
          
            }
        },
    }
</script>