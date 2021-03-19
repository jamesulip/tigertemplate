<template>
    <b-overlay rounded opacity="0.6" spinner-small spinner-variant="secondary" :show="loading">
        <b-button-toolbar >
            <b-button-group :size="size">
                <b-button variant="info" @click="updateStatus(Project,'Working on it')"
                    :disabled="btnIcon(Project.Status,'dis_en','play')||false">
                    <b-icon-play-fill></b-icon-play-fill>
                </b-button>
                <b-button variant="warning" @click="updateStatus(Project,'Paused')"
                    :disabled="btnIcon(Project.Status,'dis_en','pause')||false">
                    <b-icon-pause-fill></b-icon-pause-fill>
                </b-button>
                <b-button v-if="Project.project.TYPE =='LR'" variant="success"
                    @click="$router.push({name:'lrsend',params:{id:Project.detailID},query:{project:Project.ID}})"
                    :disabled="btnIcon(Project.Status,'dis_en','done')||false">
                    SP
                </b-button>
                <b-button v-else variant="success" @click="updateStatus(Project,'Done')"
                    :disabled="btnIcon(Project.Status,'dis_en','done')||false">
                    <b-icon-flag-fill></b-icon-flag-fill>
                </b-button>
                <!-- <b-button variant="success" @click="$router.push({name:'test',params:{detailid:Project.detailID}})"
                    :disabled="btnIcon(Project.Status,'dis_en','done')||false">
                    <b-icon-flag-fill></b-icon-flag-fill>
                </b-button> -->
            </b-button-group>
            <b-button-group class="pl-2" v-if="showView" :size="size">
                <b-button variant="link" @click="current_project_modal=true">
                     Project Details
                </b-button>
            </b-button-group>
        </b-button-toolbar>
        <b-modal centered ok-only :title="`Start Project ${message.content}`" v-model="modal.start"
            header-class="bg-info disabled" button-size="sm" @ok="updateStatusText()">
            <b-form-group>
                <label for="">Message</label>
                <textarea v-model="message.content" cols="30" rows="3" class="form-control"></textarea>
            </b-form-group>
            <div slot="modal-ok">
                <b-icon-play-fill></b-icon-play-fill>
                Send
            </div>
        </b-modal>



        <fileList @sent="x=>{updateStatusText(x,'Done')}" ref="filelist" v-model="modal.jo_done" :project="Project"/>

        <b-modal size="lg" hide-header ok-only v-model="current_project_modal" :title="`${project_name(Project)}`"
            content-class="shadow">
            <project_detail v-if="current_project_modal" :project="Project" />
        </b-modal>
    </b-overlay>
</template>
<script>
    /* eslint-disable */
    import {
        btnIcon
    } from '../js/update.js';
    import fileList from './fileslist.vue'
    export default {
        props: {
            'Project': {
                type: Object,
            },
            size: {
                type: String,
                default: 'sm'
            },
            showView:{
                defaultStatus:false,
                type:Boolean
            }
        },
        components: {
            fileList,
        },
        data() {
            return {
                current_project_modal:false,
                loading: false,
                modal: {
                    start: false,
                    jo_done: false
                },
                message: {
                    Type: "log",
                    content: "JO#000001v.0  Working on it",
                    parentID: null,
                    state: "Working on it",
                    user: this.$store.getters.currentUser.employee_id
                }
            }
        },
        methods: {
            updateStatus(project, status) {
                  
                   
                    var xx = `${project.project.TYPE}#${project.project.NUM}v.${project.project.VERSION}`;
                    this.message = {
                        Type: "log",
                        content: `${xx}  ${status=='Paused'?'On Hold':status}`,
                        parentID: project.project.trailid,
                        state: status,
                        user: this.$store.getters.currentUser.employee_id,
                        project_id: project.ID,
                    }
                    this.loading = true
    
    
                    this.$store.dispatch('set_current_job').then(x => {
                        this.loading = false
                        if (status == 'Done') {
                            this.modal.jo_done = true
                        } else if (x && x.ID == project.ID) {
                            this.modal.start = true
    
                        } else if (x && x.ID != project.ID) {
    
                            this.confirmChangeJob(xx)
                        } else if (!x) {
                            this.modal.start = true
                        }
                       
                    })
                },
                btnIcon(Status, f, pp) {
    
                    return btnIcon(Status, f, pp)
                },
                confirmChangeJob(xx) {
                    var project = this.$store.getters.getCurrentJob
                    console.log('project', project)
                    var projectName = `${project.project.TYPE}#${project.project.NUM}v.${project.project.VERSION}`;
    
                    const titleVNode = this.$createElement('span', {
                        domProps: {
                            innerHTML: `Project <b>${projectName}</b> is in progess, Do you want to Stop current project start <b>${xx}</b>`
                        }
                    })
                    this.$bvModal.msgBoxConfirm(titleVNode, {
                            title: `Do you want to Continue?`,
                            size: 'md',
                            buttonSize: 'md',
                            okVariant: 'danger',
                            okTitle: 'YES',
                            cancelTitle: 'NO',
                            footerClass: 'p-2',
                            hideHeaderClose: false,
                            centered: true
                        })
                        .then(value => {
                            if (value) {
    
                                axios.put('cors/finishers/' + project.ID, {
                                    "Status": 'Paused'
                                }).then(x => this.modal.start = true)
                            }
                        })
                        .catch(err => {
                            // An error occurred
                        })
                },
                updateStatusText(id, Status) {
                    axios.post(`/cors/trail/${this.Project.project.trailid}/send`, this.message)
                    return axios.patch(`cors/finishers/${this.message.project_id}`, {
                            Status: this.message.state
                        })
                        .then(res => {
    
                            this.$emit('saved', res.data)
                            this.$store.dispatch('set_current_job')
                            return res.data
                        })
                        .catch(err => {
    
                        })
                },
            project_name(project) {
                if (project.project)
                    return `${project.project.TYPE}#${project.project.NUM}v.${project.project.VERSION}`;
            },
             btnIcon(Status, f, pp) {
    
                    return btnIcon(Status, f, pp)
                },
            
        },
    }
</script>