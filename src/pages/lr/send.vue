<template>
    <div class="pt-20 min-h-screen">
        <div class="container-sm ">
            <b-modal @hidden="file=[]" size="lg" v-model="upload_proposal_modal" @ok="submit_rev">
                <template #modal-title>
                    <div>
                        Version {{project.project.VERSION}}
                    </div>
                </template>
                <template #modal-footer={ok}>
                    <div>
                         <b-button @click="ok">Send Proposal</b-button>
                    </div>
                </template>
                <div class="w-full">
                    <transition-group tag="div" name="fade">
                        <div v-for="(f,ind) in file" :key="`${f.id}`" style="height:150px"
                            class=" rounded-l-md border-2 rounded-md w-auto m-3 flex">
                            <div class="h-full flex rounded-l-md" style="width:200px">
                                <i class="far fa-file-pdf m-auto text-7xl text-gray-300"></i>
                            </div>
                            <div class="h-auto w-full py-3 pr-4 flex flex-col justify-between">
                                 <label class="float-right hidden" for="">Option {{f.data.option = ind}}</label>
                                <span class="text-base md:text-md">
                                    {{f.name}}
                                </span>
                                <b-progress v-model="f.progress" :precision="1" show-progress></b-progress>
                            </div>
                        </div>
                    </transition-group>
                    <div class="w-full p-4">
                        <transition name="fade">
                            <send_mes ref="submit_b" :hide-button="true" @sent="update_proposal" v-if="project.project" :trailid="project.project"
                                :disabled="!Boolean(file.length)" v-show="Boolean(file.length)" />
                        </transition>
                    </div>
                </div>
            </b-modal>
            <file-upload :add-index="true" :size="(1024 * 1024) * 100" :headers="{'Authorization': `Bearer  ${currentUser.token}`}"
                v-show="!Boolean(file.length)" accept="application/pdf"
                :post-action="`${serUrl}/cors/layout_proposal/create`" :multiple="false" :drop="true" :data="{
                        project_id:this.$route.params.id,
                        
                    }" @input-filter="inputFilter" @input-file="inputFile" :drop-directory="true" v-model="file"
                class="w-full" ref="upload">
                <div style="height:250px"
                    class="relative border-dashed border-8 rounded-md w-auto m-3 flex flex-col justify-center">

                    <div v-show="$refs.upload && $refs.upload.dropActive" class="relative bg-gray-400">
                        <h3 class="absolute w-full h-full bg-gray-500">Drop Proposal</h3>
                    </div>

                    <span class="text-center  self-center">
                        <svg class="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                            </path>
                        </svg>

                    </span>
                    <span class="text-center ">Upload</span>
                </div>
            </file-upload>



            <h3 class="pl-3 text-gray-500">
                Proposals Sent
            </h3>
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Updated Date</th>
                        <th>Version</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sp in sent_proposal" :key="`sp-${sp.id}`">
                        <td class="w-0">
                            <i class="far fa-file-pdf m-auto text-7xl text-gray-300"></i>
                        </td>
                        <td class="text-truncate">
                            <div class="w-48">
                                <span>{{sp.files.filename}}</span>
                            </div>
                        </td>
                        <td>{{sp.created_at | formatDate('L')}}</td>
                        <td>{{sp.files.file_info.version}}</td>
                        <td>{{sp.files.file_info.option}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter,
    .fade-leave-to

    /* .fade-leave-active below version 2.1.8 */
        {
        opacity: 0;
    }
</style>
<script>
    import _ from 'lodash';

    import FileUpload from 'vue-upload-component'
    import send_mes from './sendmessage.vue'
    import {
        mapState
    } from 'vuex'
    export default {
        components: {
            FileUpload,
            send_mes
        },
        computed: {
            ...mapState(['currentUser', 'serUrl']),
            f_options(){
                return {
                    selected_options:this.file.filter(x=>x.data.option !==undefined).map(x=>x.data.option),
                    options:_.range(this.file.length)
                }
            },
            test2(){
                if(Boolean(this.file) && this.file.every(x=>x.success)){
                    // alert('xx')
                    
                    return true
                }
                return false
            }
        },
        data() {
            return {
                file: [],
                sent_proposal: [],
                project: {},
                upload_proposal_modal: false
            }
        },
        mounted() {
            axios.post(`/cors/layout_proposal/${this.$route.params.id}/files`)
                .then(res => {
                    this.sent_proposal = res.data
                })
                .catch(err => {
                    console.error(err);
                })
            axios.get(`/cors/projectDetail/${this.$route.params.id}`)
                .then(res => {
                    this.project = res.data
                })
                .catch(err => {
                    console.error(err);
                })
        },
        methods: {
            submit_rev(x){
                x.preventDefault();
                this.$refs.submit_b.submit()
            },
            test(x){
                setInterval(() => {
                    console.log('x',x);
                    this.file[x].data.option = x
                }, 500);
            },
            update_proposal(d) {
                axios.post(`/cors/layout_proposalUpdateComment`, {
                        comment_id: d.id,
                        id: this.file.map(x => {
                            return x.response
                        }).map(x => {
                            return x.file_info.id
                        })

                    })
                    .then(res => {
                        axios.put(`/cors/finishers/${this.$route.query.project}`, {
                                'Status': "Done"
                            })
                            .then(res => {
                                this.$router.push({
                                    name: 'view_trail',
                                    params: {
                                        id: d.parentID
                                    }
                                })
                            })
                            .catch(err => {
                                console.error(err);
                            })

                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            inputFile(newFile, oldFile) {
              if(newFile){
                  this.$refs.upload.active = true
                  this.upload_proposal_modal = true
                  newFile.data.version = this.project.project.VERSION
                }

                if (newFile && oldFile) {
                    if (newFile.active && !oldFile.active) {
                        if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
                            this.$refs.upload.update(newFile, {
                                error: 'size'
                            })
                        }
                    }

                 


                }
                if (!newFile && oldFile) {
                    if (oldFile.success && oldFile.response.id) {
                        axios.put(`/upload_proposal/${oldFile.response.id}`, oldFile.response)
                            .then(res => {
                                console.log(res)
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    }
                }

            },
            inputFilter(newFile, oldFile, prevent) {

                if (newFile && !oldFile) {
                    
                    console.log('newFile', newFile)
                    if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                        return prevent()
                    }
                    if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                        return prevent()
                    }
                    if (newFile.file && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this
                        .autoCompress < newFile.size) {
                        newFile.error = 'compressing'
                        const imageCompressor = new ImageCompressor(null, {
                            convertSize: Infinity,
                            maxWidth: 512,
                            maxHeight: 512,
                        })
                        imageCompressor.compress(newFile.file)
                            .then((file) => {
                                this.$refs.upload.update(newFile, {
                                    error: '',
                                    file,
                                    size: file.size,
                                    type: file.type
                                })
                            })
                            .catch((err) => {
                                this.$refs.upload.update(newFile, {
                                    error: err.message || 'compress'
                                })
                            })
                    }
                }
                if (newFile && oldFile) {
                    if (!newFile.version) {
                        newFile.version = 0
                    }
                    console.log('version',newFile.version);
                    newFile.version++
                }
                if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                    newFile.blob = ''
                    let URL = window.URL || window.webkitURL
                    if (URL && URL.createObjectURL) {
                        newFile.blob = URL.createObjectURL(newFile.file)
                    }
                    newFile.thumb = ''
                    if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                        newFile.thumb = newFile.blob
                    }
                }
            },
        },
    }
</script>