<template>
    <b-modal :title="`Start Project`" @ok="save()" @close="$emit('input',false)" @show="show()" size="lg"
        v-model="value_modal" header-class="bg-success disabled" button-size="sm">

        <template #modal-footer={ok,cancel}>
            <div>
                <b-button  variant="danger" class="mr-2" @click="cancel" :disabled="!Boolean(files_grouped)">
                    Cancel
                </b-button>
                <b-button  variant="primary" @click="ok"  :disabled="!Boolean(files_grouped)">
                    Submit Files 
                </b-button>
            </div>
        </template>

        <b-overlay :show="loading" style="min-height:200px">
            <template v-if="'files' in files && files.files.length<1">
              <projectUploader v-model="value" :project="project"/>
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
// import test1 from '../views/test'
import { mapState } from 'vuex'
    export default {
        props: ['value','project'],
        components:{
            FileUpload,
            // test1
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
               
                if(!Boolean(this.printing.filter(x=>!x.success).length) && !Boolean(this.cutting.filter(x=>!x.success).length))
                    if(newFile.success)
                        this.show()
            }
            if (!newFile && oldFile) {
                // remove
                console.log('remove', oldFile)
            }
            }

        },
        mounted() {
            this.open = this.value
        },
    }
</script>