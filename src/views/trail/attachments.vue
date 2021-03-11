<template>

    <div class="col-md-12">

        <div class="row">
            <template v-for="(item, index) in files">
                <div class="col-md-3 p-2" :key="`f-${index}`">
                    <div class="media media-attachment ">

                        <b-avatar @click="check_mime(item.file_meta.ext)?full_screen_image(files    ):null" button
                            rounded="sm" size="2rem" :src="`${serUrl}${item.thumb}`" variant="primary" icon="paperclip">

                        </b-avatar>
                        <div class="media-body  text-truncate">
                            <a role="button" v-b-tooltip="{ title: item.filename, placement: 'bottom' }"
                                @click="check_mime(item.file_meta.ext)?full_screen_image(files.file):null"
                                class=" text-truncate">{{item.filename}}</a>
                            <span class="text-muted text-xs">{{item.file_meta.size | bytesToSize(2)}} <a
                                    v-b-tooltip="'download'" :href="`${serUrl}/cors/downloadFile2/${item.id}`"
                                    target="_blank"><i class="fa fa-download" aria-hidden="true"></i></a></span>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <view_image ref="viewer" />
    </div>

</template>
<script>
    import {
        mapState
    } from 'vuex'
    import view_image from './view_image'
    export default {
        components: {
            view_image
        },
        props: {
            files: {
                type: Array
            }
        },
        computed: {
            ...mapState(['serUrl'])
        },
        methods: {
            check_mime(type) {
                return /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(type);
            },
            full_screen_image(f) {
                var $images = f.filter(x => {
                    return /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(x.file_meta.ext)
                }).map(x => `${this.serUrl}/${x.location}`)
                this.$refs.viewer.show($images)
                console.log($images)
            },
        },
    }
</script>