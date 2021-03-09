<template>
    <b-modal :title="`Start Project`" @ok="save()" @close="$emit('input',false)" @show="show()" size="lg"
        v-model="value_modal" header-class="bg-success disabled" button-size="sm">

        <template #modal-footer={ok}>
            <div>
                <b-button  variant="primary" @click="ok" :disabled="!Boolean(files_grouped)">
                    Submit Files 
                </b-button>
            </div>
        </template>

        <b-overlay :show="loading" style="min-height:200px">
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
                    <div class="flex flex-col ">
                        <!-- <div class="flex-grow m-3 p-3 bg-gray-100 border-4 border-dashed place-content-center text-center">Drag <br>Cutting File(s)</div> -->

                        <file-upload input-id="file1" :key="`uploader-printing`" v-show="!Boolean(printing.length)"
                            class="flex-grow m-3 p-3 bg-gray-100 border-4 border-dashed place-content-center text-center"
                            :post-action="`${serUrl}/cors/upload_project`" :data="{
                                type:'printing',
                                folder:`${files.dir}/print`
                            }" 
                            :headers="{
                                Authorization:`Bearer ${currentUser.token}`
                            }"
                            :multiple="true" :drop="true" :drop-directory="true"
                            v-model="printing" ref="upload_printing">
                            <i class="fa fa-plus"></i>
                            Drag <br>Printing File(s)
                        </file-upload>
                        <div v-if="Boolean(printing.length)" class="flex-grow m-3 p-3 bg-gray-100 border-4 border-dashed place-content-center text-center">
                            printing
                              <table class="table table-fixed">
                                  <tbody>
                                      <tr v-for="pr in printing" :key="`p-${pr.id}`">
                                          <td>{{pr.name}}</td>
                                          <td><b-progress v-model="pr.progress" :precision="1" show-progress animated></b-progress></td>
                                      </tr>
                                  </tbody>
                              </table>
                        </div>
                       
                        <file-upload input-id="file2" :key="`uploader-cutting`" v-show="!Boolean(cutting.length)"
                            class="flex-grow m-3 p-3 bg-gray-100 border-4 border-dashed place-content-center text-center"
                            :post-action="`${serUrl}/cors/upload_project`" :data="{
                                type:'cutting',
                                folder:`${files.dir}/cut`
                            }" 
                            :headers="{
                                Authorization:`Bearer ${currentUser.token}`
                            }"
                            :multiple="true" :drop="true" :drop-directory="true"
                            v-model="cutting" ref="upload_cutting">
                            <i class="fa fa-plus"></i>
                            Drag <br>Cutting File(s)
                        </file-upload>
                        <div v-if="Boolean(cutting.length)"   class="flex-grow m-3 p-3 bg-gray-100 border-4 border-dashed place-content-center text-center">
                            cutting
                            <table class="table table-fixed">

                                  <tbody>
                                      <tr v-for="pr in cutting" :key="`p-${pr.id}`">
                                          <td>{{pr.name}}</td>
                                          <td><b-progress v-model="pr.progress" :precision="1" show-progress animated></b-progress></td>
                                      </tr>
                                  </tbody>
                              </table>
                        </div>
                    

                    </div>
                    <div class="col-md-12">
                         <b-button class="float-right" @click="x=>{$refs.upload_printing.active=true;$refs.upload_cutting.active=true}" variant="primary" href="">
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
    </b-modal>
</template>
<script>
    /* eslint-disable */
    import FileUpload from 'vue-upload-component'
import { mapState } from 'vuex'
    export default {
        props: ['value'],
        components:{
            FileUpload
        },
        data() {
            return {
                files: {},
                open: false,
                loading: true,

                cutting:[],
                printing:[]
            }
        },
        computed: {
            ...mapState(['currentUser','serUrl']),
            value_modal: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('input', val)
                }
            },
            files_grouped() {
                let group = {}
                try {
                    group = this.files.files.reduce((r, a) => {
                        r[a.root] = [...r[a.root] || [], a];
                        return r;
                    }, {});

                } catch (error) {}

                return group
            },check_all_uploaded(){
                try {
                    const $u_p = this.printing.filter(x=>!x.success).length
                    const $u_c = this.cutting.filter(x=>!x.success).length
                    return {$u_p,$u_c}
                } catch (error) {
                    return error
                }
            }

        },
        methods: {
            save() {
                this.loading = true
                var proj = this.$store.getters.getSelected_project
                axios.post('cors/insertTally', {
                    projectID: proj.project.DETAILID,
                    tally: this.files.files

                }).then(x => {
                    this.loading = false
                    this.$emit('sent', x)
                })

            },
            show() {
                this.loading = true
                var proj = this.$store.getters.getSelected_project
                axios.get(`cors/filesList2/${proj.project.DETAILID}`)
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
        },
        mounted() {
            this.open = this.value
        },
    }
</script>