<template>
    <div class="flex  flex-wrap">
        <div class="w-full flex  flex-wrap">
            <div class="border  bg-white rounded-md m-2 flex " v-for=" f in uploaded" :key="`up-${f.id}`">
                <div class="bg-gray-50 object-cover rounded-l-md border-r bg-center bg-no-repeat" style="width:150px"
                    v-bind:style="{ backgroundImage: 'url(' + `${serUrl}${f.thumb}` + ')' }">
                </div>
                <div class="py-auto p-2">
                    <div>
                        <span for="input-1" class="d-block">Option </span>
                        <div><input type="text" class="form-control form-control-sm">

                        </div>
                    </div>
                    <div>
                        <span class="d-block">Enter your </span>
                        <div><textarea rows="1" wrap="soft" class="form-control form-control-sm"></textarea>

                        </div>
                    </div>
                </div>
            </div>
            <template v-for="f in files">
                <div class="border  bg-white rounded-md m-2  flex flex-col justify-center" :key="`uploading-${f.id}`"  style="width:300px"
                    v-if="f.active">

                    <div class="text-center  self-center">
                        <a
                            class="block text-2xl font-bold text-gray-400 dark:text-white text-center ">{{f.progress}}%</a>
                        <span class="text-sm text-gray-700 dark:text-gray-200 text-center ">Uploading</span>
                    </div>

                </div>
                <div class="border  bg-white rounded-md m-2 flex" :key="`files-${f.id}`" v-else>
                    <div class="bg-gray-50 object-cover rounded-l-md border-r bg-center bg-no-repeat"
                        style="width:200px"
                        v-bind:style="{ backgroundImage: 'url(' + `${serUrl}${f.response.thumb}` + ')' }">
                    </div>
                    <div class="py-auto p-2">
                        <b-form-group id="fieldset-1" label="Enter your " label-for="input-1">
                            <b-form-input trim></b-form-input>
                        </b-form-group>
                        <b-form-group id="fieldset-1" label="Enter your " label-for="input-1">
                            <b-form-textarea trim></b-form-textarea>
                        </b-form-group>
                    </div>
                </div>
            </template>





            <file-upload :size="(1024 * 1024) * 100" :data="{
                _projID:items.id,
                ...items
            }" :headers="{'Authorization': `Bearer  ${currentUser.token}`}" :extensions="['jpg', 'gif', 'png']"
                accept="image/*" :post-action="`${serUrl}/cors/layout_proposal/create`" :multiple="true" :drop="true"
                @input-filter="inputFilter" :add-index="true" @input-file="inputFile" :drop-directory="true"
                v-model="files" class=" cursor-pointer" ref="upload">
                <div style="width:150px;height:150px"
                    class="border-dashed border-2 rounded-md w-56 m-2 flex flex-col justify-center">
                    <div v-show="$refs.upload && $refs.upload.dropActive" class="relative bg-gray-400">
                        <h3 class="absolute bg-gray-500">Drop files to upload</h3>
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
        </div>
    </div>
</template>
<style scoped>
    label.btn {
        margin-bottom: 0;
        margin-right: 1rem;
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
            ...mapState(['currentUser', 'serUrl'])
        },
        props: ['items', 'uploaded'],
        data() {
            return {
                files: []
            }
        },
        methods: {
            inputFile(newFile, oldFile) {
                this.$refs.upload.active = true

                if (newFile && oldFile) {

                    // update
                    // if (newFile.active !== oldFile.active) {
                    //     newFile.data.option =_.filter(this.files, ['success', false]).length


                    // }

                    if (newFile.active && !oldFile.active) {

                        // beforeSend
                        // min size
                        if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
                            this.$refs.upload.update(newFile, {
                                error: 'size'
                            })
                        }
                    }
                    if (newFile.progress !== oldFile.progress) {
                        // progress
                    }
                    if (newFile.error && !oldFile.error) {
                        // error
                    }
                    if (newFile.success && !oldFile.success) {
                        // success
                        console.log(newFile.response)
                    }
                }
                if (!newFile && oldFile) {
                    // remove
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
                // Automatically activate upload

                // if (!this.$refs.upload.active) {
                // this.$refs.upload.active = true
                // }

            },
            inputFilter(newFile, oldFile, prevent) {

                if (newFile && !oldFile) {
                    var opt = 1;
                    console.log('newFile', newFile)
                    if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                        return prevent()
                    }
                    // Filter php html js file
                    // 过滤 php html js 文件
                    if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                        return prevent()
                    }
                    // Automatic compression
                    // 自动压缩
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
                    // Update file

                    // Increase the version number
                    if (!newFile.version) {
                        newFile.version = 0
                    }
                    newFile.version++
                }
                if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                    // Create a blob field
                    // 创建 blob 字段
                    newFile.blob = ''
                    let URL = window.URL || window.webkitURL
                    if (URL && URL.createObjectURL) {
                        newFile.blob = URL.createObjectURL(newFile.file)
                    }
                    // Thumbnails
                    // 缩略图
                    newFile.thumb = ''
                    if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                        newFile.thumb = newFile.blob
                    }
                }
            },
        },
    }
</script>