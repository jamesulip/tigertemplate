<template>
    <div class="p-5">
        <div class="upload">
            <!-- <ul v-if="files.length">
                <li v-for="file in files" :key="file.id">
                    <span>{{file.name}}</span> -
                    <span>{{(file.size)}}</span> -
                    <span v-if="file.error">{{file.error}}</span>
                    <span v-else-if="file.success">success</span>
                    <span v-else-if="file.active">active</span>
                    <span v-else></span>
                </li>
            </ul> -->

            <div class="p-20" v-if="files.length">
                <div class="h-96 border-4 border-light-blue-500 flex  justify-content-center">
                    <div class="text-center align-self-center  text-gray-300">
                        <span class="text-9xl">50%</span>
                        <span class="h4 block">
                            <b-spinner label="Loading..."></b-spinner>

                            <br>
                            Uploading..
                        </span>
                    </div>
                </div>
            </div>
            <div class="p-20" v-else>
                <div class="h-96 border-dashed border-4 border-light-blue-500 flex  justify-content-center">
                    <div class="text-center align-self-center  text-gray-300">
                        <i class="block fas fa-file-pdf text-9xl"></i>
                        <span class="h4 block">Drop Layout Proposal.</span>
                    </div>
                </div>
            </div>


            <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active" style="margin-left: 250px;">
                <h3>Drop files to upload</h3>
            </div>



            <div class="example-btn hidden">
                <file-upload @input-file="inputFile" @input-filter="inputFilter" class="btn btn-primary"
                    :post-action="`${serUrl}/cors/layout_proposal/create`"
                    :headers="{'Authorization': `Bearer ${currentUser.token}`}" :data="{
                        _projID:propose_id.id,
                        ...propose_id
                    }" :multiple="false" :drop="true" :drop-directory="true" v-model="files" ref="upload">
                    <i class="fa fa-plus"></i>
                    Select files
                </file-upload>
                <button type="button" class="btn btn-success" v-if="!$refs.upload || !$refs.upload.active"
                    @click.prevent="$refs.upload.active = true">
                    <i class="fa fa-arrow-up" aria-hidden="true"></i>
                    Start Upload
                </button>
                <button type="button" class="btn btn-danger" v-else @click.prevent="$refs.upload.active = false">
                    <i class="fa fa-stop" aria-hidden="true"></i>
                    Stop Upload
                </button>
            </div>
        </div>

    </div>
</template>
<style scoped>
    label.btn {
        margin-bottom: 0;
        margin-right: 1rem;
    }

    .drop-active {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 9999;
        opacity: .6;
        text-align: center;
        background: #000;
    }

    .drop-active h3 {
        margin: -.5em 0 0;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        font-size: 40px;
        color: #fff;
        padding: 0;
    }
</style>
<script>
    import FileUpload from 'vue-upload-component'
    import {
        mapState
    } from 'vuex'
    export default {
        components: {
            FileUpload,
        },
        computed: {
            ...mapState(['currentUser', 'serUrl']),
        },
        mounted() {
            axios.get(`/cors/projectDetail/${this.$route.params.id}`)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err);
                })

            axios.post(`/cors/layout_proposal/${this.$route.params.id}`)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err);
                })

        },
        methods: {
            inputFilter(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                        return prevent()
                    }
                    if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                        return prevent()
                    }
                }
            },
            inputFile(newFile, oldFile) {
                this.$refs.upload.active = true
                if (newFile && !oldFile) {
                    console.log('add', newFile)
                }
                if (newFile && oldFile) {
                    console.log('update', newFile)
                }
                if (!newFile && oldFile) {
                    console.log('remove', oldFile)
                }
            }
        },
        data() {
            return {
                files: [],
            }
        }
    }
</script>