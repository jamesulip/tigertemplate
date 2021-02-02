<template>
    <div class="container pt-4">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Request Layout Proposal</h4>
                </div>
                <div class="card-body pb-1" v-if="data.details">
                    <div class="row">
                        <div class="col-md-12">
                            <b-form-group id="fieldset-1" label="Enter your Project Name" label-for="input-1">
                                <b-form-input id="input-1" v-model="data.details.s_projname" trim></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6">
                            {{state_check(errors['details.s_media'])}}
                            <b-form-group id="fieldset-1" label="Media" label-for="input-1">
                                <b-form-input :state="state_check(errors['details.s_media'])" id="input-1"
                                    v-model="data.details.s_media" trim></b-form-input>
                            </b-form-group>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Layouts</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in data.layout" :key="index">
                                <td>
                                       <b-form-input :state="state_check(errors[`layout.${index}.itemName`])"  id="input-1"
                                    v-model="item.itemName" trim></b-form-input>    
                                
                                </td>
                                <td><input 
                                        v-model="item.Media" placeholder="Media" type="text"
                                        class="form-control input-sm"></td>
                                <td>
                                    <textarea placeholder="Notes" v-model="item.Description" name="" id="" cols="30"
                                        rows="3" class="form-control"></textarea>
                                </td>
                                <td>
                                    <b-button variant="link" size="sm" @click="$delete(data.layout, index)"><i
                                            class="fa fa-times text-danger" aria-hidden="true"></i></b-button>
                                    <b-button variant="link" size="sm"
                                        @click="data.layout.push(JSON.parse(JSON.stringify(item)))"> <i
                                            class="fa fa-clone text-info" aria-hidden="true"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td colspan="2">
                                    <div class="float-right">
                                        <b-button variant="link" size="sm"
                                            @click="data.layout.push({Description:'',Height:'',Media:'',Width:'',itemName:''})">
                                            <b-icon-plus />
                                            Add Item

                                        </b-button>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="card-body clearfix" style="height:auto">
                    <message_textarea height="100%" v-model="content" @change="x=>{data.finishers[0].DETAILS=x.html}"/>
                </div>
                <div class="card-body clearfix" style="height:auto">
                    <div class="card card-body mt-1 p-1" v-if="files.length >0">
                        <table class="mt-2 table-hover table table-sm" style=" table-layout: fixed;">
                            <thead>
                                <tr>
                                    <th>Attachments</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th style="width:50px"></th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in files" :key="index">
                                    <td>
                                        <b-avatar rounded button @click="showImages(files)"
                                            :src="`${server}${item.response.thumb}`">
                                            <i v-if="fileIcon(item.name.split('.')[item.name.split('.').length-1],['gif','jpeg','jpg','png'])"
                                                :class="`fa ${fileIcon(item.name.split('.')[item.name.split('.').length-1],['gif','jpeg','jpg','png'])}`"
                                                aria-hidden="true"></i>
                                        </b-avatar>
                                    </td>

                                    <td>
                                        <div class="text-truncate">
                                            <span class="text-truncate">
                                                {{item.name}}
                                            </span>
                                        </div>
                                    </td>

                                    <td>
                                        <b-progress variant="success" :value="item.progress"></b-progress>
                                    </td>
                                    <td style="text-align: center;" v-if="item.error">{{item.error}}</td>
                                    <td style="text-align: center;" v-else-if="item.success"><i
                                            class="fa fa-check text-success" aria-hidden="true"></i></td>
                                    <td style="text-align: center;" v-else-if="item.active">{{item.progress}}</td>
                                    <td>
                                        <b-button variant="link" size="sm">
                                            <b-icon-x></b-icon-x>
                                        </b-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="clearfix">
                        <div class="row">
                            <div class="col-md-12 mt-2">

                                <file-upload class="btn btn-primary"
                                    :headers="{'Authorization':`Bearer ${ currentUser.token}`,'Accept':'application/json'}"
                                    :post-action="`${server}/cors/file/attach/send`" :multiple="true"
                                    :size="1024 * 1024 * 20" v-model="files" @input-filter="inputFilter"
                                    @input-file="inputFile" ref="upload">
                                    <i class="fa fa-plus"></i>
                                    Select files
                                </file-upload>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="col-md-4 float-right">
                        <b-button @click="send_lr()" class=" float-right"><i class="fa fa-paper-plane"
                                aria-hidden="true"></i> Send</b-button>
                    </div>
                </div>
            </div>
        </div>
        <view_image ref="viewer" />
    </div>
</template>
<style scoped>
    .table.table-sm td {
        vertical-align: middle;
    }
</style>
<script>
    /*eslint-disable*/
    import {
        mapActions,
        mapGetters,
        mapMutations
    } from 'vuex'
    import message_textarea from './message_textarea'
    import FileUpload from 'vue-upload-component'
    import view_image from '../../../../views/trail/view_image'
    import _ from 'lodash'
    export default {
        components: {
            message_textarea,
            FileUpload,
            view_image
        },
        
        data() {
            return {
                content: {
                    content: ``,
                    title: '',
                    projects: ''
                },
                files: [],
                server: window.axios.defaults.baseURL,
                data: {

                },
                errors: []
            }
        },
        methods: {
            ...mapActions(['set_productstep']),
            ...mapMutations(['set_projects']),
            async load_project() {
                await axios.get(`cors/wholeprojects/${this.$route.params.id}`).then(x => {
                    this.set_projects(x.data)
                })
            },
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
            },
            showImages(f) {
                console.log(f);
                var $images = f.filter(x => {
                    return /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(x.response.file_meta.ext)
                }).map(x => `${this.server}/${x.response.location}`)
                this.$refs.viewer.show($images)
            },

            send_lr() {
                this.errors = {}
                axios.post(`cors/newLr`, this.data)
                    .then(res => {
                        console.log('d',res)
                        var x = res.data
                        axios.post(`cors/emails2`, {
                            ...this.content,
                            title:`${x.project.TYPE}#${x.project.NUM}-${this.get_project.client.com_name}-${this.get_project.ProjectName}`,
                            projects: [x.project.ID]
                        })
                    })
                    .catch(err => {
                        this.errors = err.response.data.errors
                    })
            }
        },
        computed: {
            ...mapGetters(['current_employee_id', 'get_project', 'currentUser']),


        },
        async mounted() {
            
            await this.load_project()
            
            this.data = {
                "finishers": [

                ],
                "details": {
                    "s_accountexec": this.current_employee_id,
                    "s_projname": this.get_project.ProjectName,
                    "s_company": this.get_project.Client,
                    "size": ""
                },
                "projects": {
                    "SALESEXEC": this.current_employee_id,
                    "projectID": this.get_project.ID,
                    "TYPE": "LR",
                    "projecttype": 11
                },
                layout: []

            }

            await this.set_productstep().then(x => {
                 this.data.finishers = x.find(x => {
                    return x.stepname == "LAYOUT PROPOSAL"
                }).steps.map((s, i) => {
                    return {
                        DETAILS: s.detail,
                        FINISHING: s.production.prodt_name,
                        Num: i,
                        department: s.production.prodt_dep,
                        machine: s.sel_machine,
                        machine_req: s.production.prodt_machine,
                        processname: s.productionID,
                        productionID: s.productID
                    }
                })
            })

            
        },
    }
</script>