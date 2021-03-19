<template>
<b-overlay :show="loading">
        <template v-if="'files' in files && files.files.length<1">
            <div class=" h-full " style="min-height:200px">
                <div class=" m-3 p-3 flex flex-col text-center  place-content-center">
                    <span class="text-4xl">
                        <b-icon icon="file-earmark-x"></b-icon>
                    </span>
                    <span>
                        No Files in folder
                    </span>
                    <span>{{files.dir}}</span>
                </div>
                <div class="flex flex-row">
                    <file-upload @input-file="inputFile" input-id="file1" :key="`uploader-printing`"
                        v-show="!Boolean(printing.length)"
                        class="flex-grow m-3 p-3 bg-gray-100 border-4 border-dashed place-content-center text-center"
                        :post-action="`${serUrl}/cors/upload_project`" :data="{
                                type:'printing',
                                folder:`${files.dir}/print`
                            }" :headers="{
                                Authorization:`Bearer ${currentUser.token}`
                            }" :multiple="true" :drop="true" :drop-directory="true" v-model="printing"
                        ref="upload_printing">
                        <i class="fa fa-plus"></i>
                        Drag <br>Printing File(s)
                    </file-upload>
                    <file-upload @input-file="inputFile" input-id="file2" :key="`uploader-cutting`"
                        v-show="!Boolean(cutting.length)"
                        class="flex-grow m-3 p-3 bg-gray-100 border-4 border-dashed place-content-center text-center"
                        :post-action="`${serUrl}/cors/upload_project`" :data="{
                                type:'cutting',
                                folder:`${files.dir}/cut`
                            }" :headers="{
                                Authorization:`Bearer ${currentUser.token}`
                            }" :multiple="true" :drop="true" :drop-directory="true" v-model="cutting"
                        ref="upload_cutting">
                        <i class="fa fa-plus"></i>
                        Drag <br>Cutting File(s)
                    </file-upload>
                </div>
                <div class="flex flex-row ">
                    <ul v-if="Boolean(printing.length)"
                        class="border border-gray-200 rounded-sm divide-y divide-gray-200 w-full    ">
                        <li class="pl-3 pr-4 py-1 bg-gray-100 flex items-center justify-between text-sm"
                            v-for="(item, index) in printing" :key="`upload-${index}`">
                            <!-- error -->
                            <template v-if="item.success">
                                <span v-b-tooltip.hover :title="item.name"
                                    class="w-3/4 truncate font-medium text-blue-500 hover:underline cursor-pointer">
                                    {{item.name}}
                                </span>
                                <div class="w-3/12 text-center">
                                    <span class="font-medium text-gray-500">({{item.size | bytesToSize(2)}})</span>
                                    <button class="text-gray-500 hover:text-red-600 float-right">
                                        <i class="fa fa-times" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </template>
                            <!-- success -->
                            <template v-else-if="item.error">
                                <span v-b-tooltip.hover :title="item.name" class="w-3/4 truncate">
                                    {{item.name}}
                                </span>
                                <div class="w-3/12 text-center">
                                    <span class="font-medium text-gray-500">Error</span>
                                    <button
                                        @click.prevent="$refs.upload_printing.update(item, {active: true, error: '', progress: '0.00'})"
                                        class="text-gray-500 hover:text-blue-600 float-right">
                                        <i class="fa fa-undo" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </template>
                            <!-- pending -->
                            <template v-else>
                                <span v-b-tooltip.hover :title="item.name" class="w-3/4 truncate">
                                    {{item.name}}
                                </span>
                                <b-progress class="w-3/12 rounded-md" :value="item.progress" :precision="1"
                                    show-progress></b-progress>
                            </template>
                        </li>
                    </ul>




                    <ul v-if="Boolean(cutting.length)"
                        class="border border-gray-200 rounded-sm divide-y divide-gray-200 w-full">
                        <li class="pl-3 pr-4 py-1 bg-gray-100 flex items-center justify-between text-sm"
                            v-for="(item, index) in cutting" :key="`upload-${index}`">
                            <!-- error -->
                            <template v-if="item.success">
                                <span v-b-tooltip.hover :title="item.name"
                                    class="w-3/4 truncate font-medium text-blue-500 hover:underline cursor-pointer">
                                    {{item.name}}
                                </span>
                                <div class="w-3/12 text-center">
                                    <span class="font-medium text-gray-500">({{item.size | bytesToSize(2)}})</span>
                                    <button class="text-gray-500 hover:text-red-600 float-right">
                                        <i class="fa fa-times" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </template>
                            <!-- success -->
                            <template v-else-if="item.error">
                                <span v-b-tooltip.hover :title="item.name" class="w-3/4 truncate">
                                    {{item.name}}
                                </span>
                                <div class="w-3/12 text-center">
                                    <span class="font-medium text-gray-500">Error</span>
                                    <button
                                        @click.prevent="$refs.upload_cutting.update(item, {active: true, error: '', progress: '0.00'})"
                                        class="text-gray-500 hover:text-blue-600 float-right">
                                        <i class="fa fa-undo" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </template>
                            <!-- pending -->
                            <template v-else>
                                <span v-b-tooltip.hover :title="item.name" class="w-3/4 truncate">
                                    {{item.name}}
                                </span>
                                <b-progress class="w-3/12 rounded-md" :value="item.progress" :precision="1"
                                    show-progress></b-progress>
                            </template>
                        </li>
                    </ul>


                </div>
                <div class="col-md-12">
                    <b-button class="float-right"
                        @click="x=>{$refs.upload_printing.active=true;$refs.upload_cutting.active=true}"
                        variant="primary" href="">
                        Upload All
                    </b-button>
                </div>

            </div>
        </template>

        <template v-for="(group, key) in files_grouped" v-else>
            <table class='table table-sm table-hover table-condensed table-striped' :key="key">
                <thead>
                    <tr>
                        <th colspan="5">
                            {{group.length}} <span class='text-uppercase'>{{key}}</span> Files
                        </th>
                    </tr>
                    <tr>
                        <th style="white-space:nowrap">Filename</th>
                        <th>Width</th>
                        <th>Height</th>
                        <th>UoM</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in group" :key="index">
                        <td><input class='form-control ' type="text" name="" v-model="item.name"></td>
                        <td><input class='form-control ' type="text" name="" v-model="item.info.Width"></td>
                        <td><input class='form-control ' type="text" name="" v-model="item.info.Height">
                        </td>
                        <td><input class='form-control ' type="text" name="" v-model="item.info.uom"></td>
                        <td><input class='form-control ' :min="1" type="number" name="" v-model="item.qty"></td>
                        <td>
                            <b-button size="xs" :disabled="item.loading" @click="load(item)">
                                <i v-if="!item.loading" class="fas fa-ruler" aria-hidden="true"></i>
                                <i v-else class="fas fa-circle-notch fa-spin" aria-hidden="true"></i>
                            </b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            
         
        </template>
        
</b-overlay>
</template>
<script>
    /* eslint-disable */
    import FileUpload from 'vue-upload-component'
    import updateBn from '../components/updatebutton'
    import {
        mapActions,
        mapGetters,
        mapMutations,
        mapState
    } from 'vuex'
    export default {
        props: {
            value: {
                default: Array
            },
            project:{
                type:Object
            }
        },
        components: {
            FileUpload
        },
        data() {
            return {
                files: {},
                open: false,
                loading: true,

                cutting: [],
                printing: []
            }
        },
        computed: {
            ...mapState(['currentUser', 'serUrl']),
            ...mapGetters(['getSelected_project']),
        
            files_grouped() {
                let group = {}
                try {
                    group = this.files.files.reduce((r, a) => {
                        r[a.root] = [...r[a.root] || [], a];
                        return r;
                    }, {});

                } catch (error) {}

                return group
            },
            check_all_uploaded() {
                try {
                    const $u_p = this.printing.filter(x => !x.success).length
                    const $u_c = this.cutting.filter(x => !x.success).length
                    return {
                        $u_p,
                        $u_c
                    }
                } catch (error) {
                    return error
                }
            }

        },
        methods: {
            ...mapActions(['set_current_job']),
            ...mapMutations(['set_selected_project']),
            save() {
                this.loading = true

                axios.post('cors/insertTally', {
                    projectID: this.project.detailID,
                    tally: this.files.files

                }).then(x => {
                    this.loading = false
                    this.$emit('sent', x)
                })

            },
            show() {
                this.loading = true

                axios.get(`cors/filesList2/${this.project.detailID}`)
                    .then(res => {
                        this.files = res.data
                        this.loading = false
                    })
                    .catch(err => {
                        console.error(err);
                        this.loading = false
                    })
            },
            load($s) {
                // alert($s);
                $s.loading = true
                this.$forceUpdate();
                axios.post(`cors/file/get_geometry`, {
                        folder: $s.file
                    })
                    .then(res => {
                        console.log(res)
                        $s.info = res.data
                        $s.loading = false
                        this.$forceUpdate();
                    })
                    .catch(err => {
                        console.error(err);
                        $s.loading = false
                    })
            },
            inputFile(newFile, oldFile) {
                if (newFile && !oldFile) {
                    // add
                    console.log('add', newFile)
                }
                if (newFile && oldFile) {

                    if (!Boolean(this.printing.filter(x => !x.success).length) && !Boolean(this.cutting.filter(x => !x
                            .success).length))
                        if (newFile.success)
                            this.show()
                }
                if (!newFile && oldFile) {
                    // remove
                    console.log('remove', oldFile)
                }
            }

        },
        mounted() {

     
            this.show()
        },
    }
</script>