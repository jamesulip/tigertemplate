<template>
    <div class="pt-3 container-fluid row">
        <div class="col-md-12 ">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        Delegated Projects
                    </h3>
                    <div class="float-right">
                        <b-button @click="activities=!activities" variant="link">Activities</b-button>
                    </div>
                </div>
                <div class="card-body" v-if="$store.getters.getCurrentJob.project">
                    Currently working on <span class="badge badge-primary p-1 badge-pill px-2"><a role="button"
                            @click="x=>{selected_view =$store.getters.getCurrentJob;current_project_modal=true}">{{$store.getters.getCurrentJob.project.TYPE}}#{{$store.getters.getCurrentJob.project.NUM}}</a></span>
                    <div class="float-right">
                        <updateButton :size="`xs`" :key="`btnupdate-${$store.getters.getCurrentJob.ID}`"
                            :Project="$store.getters.getCurrentJob" @saved="loadProjects()" />
                    </div>
                </div>
                <loading1 v-if="loading" />
                <div class="card-body  p-0 table-responsive" style="min-height:600px">
                    <table
                        class="table table-hover  table-head-fixed table-striped table-condensed table-sm  table-valign-middle">
                        <thead>
                            <tr>
                                <th></th>
                                <th>TYPE</th>
                                <th>Number</th>
                                <th>Project Name</th>
                                <th>Company</th>
                                <th>Media</th>
                                <th>Status</th>
                                <th>ss</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(Project, index) in projects.data" :key="index">
                                <td>
                                    <updateButton :key="`btnupdate-${Project.ID}`" :Project="Project"
                                        @saved="loadProjects()" />

                                </td>
                                <td>
                                    <p class="h3 font-weight-bold m-0">{{Project.project.TYPE}}</p>
                                </td>
                                <td>

                                    {{Project.project.NUM}} <span class="text-muted"
                                        v-if="parseInt(Project.project.VERSION)">Version:{{Project.project.VERSION}}</span>
                                </td>
                                <td>
                                    <div class="text-truncate" style="width:150px">{{Project.details.client2.com_name}}
                                    </div>
                                </td>
                                <td>
                                    <div class="text-truncate" style="width:150px">{{Project.details.s_projname}}</div>
                                </td>
                                <td class=" middle-align">
                                    <span class="badge">{{Project.details.s_media}}</span>
                                </td>
                                <td>
                                    <span style="display:block">{{Project.Status}} </span>
                                </td>
                                <td>
                                    <i class="fa fa-history" aria-hidden="true"></i>
                                </td>
                                <td>
                                    <a role="button" class="text-info"
                                        @click="x=>{selected_view =Project;current_project_modal=true}">
                                        <b-icon-info-circle></b-icon-info-circle>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <b-sidebar  id="sidebar-1" v-model="activities" title="Activity" shadow right >
            <div class="px-1 py-2">
                <table class="table table-striped text-xs">
                    <tbody>
                        <tr v-for="(l,i) in mylogs" :key="`o${i}`">
                            <td>
                                <span v-html="l.text"></span><br>
                                <span class="text-muted">{{l.created_at}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </b-sidebar>


        <b-modal v-model="send" hide-backdrop content-class="shadow">

        </b-modal>
        <b-modal size="lg" ok-only v-model="current_project_modal" :title="`${project_name(selected_view)}`"
            content-class="shadow">
            <project_detail v-if="current_project_modal" :project="selected_view" />
        </b-modal>
    </div>
</template>
<style scoped>
   
</style>
<script>
    // import Loading1 from '../components/loaders/loading1.vue'
    /* eslint-disable */

    export default {
        components: {
            // project_detail: () => import('./project/project_detail.vue'),
            updateButton: () => import('../components/updatebutton.vue')

        },
        data() {
            return {
                projects: [],
                mylogs: [],
                send: false,
                // current_job:this.$store.getters.getCurrentJob,
                current_project_modal: false,
                loading: true,
                selected_view: {},
                activities:true
            }
        },
        mounted() {
            this.loadProjects()
          
        },
        computed: {

        },
        methods: {
            loadLogs() {
                axios.get(`cors/jarvis_projectlog/current`)
                    .then(res => {
                        this.mylogs = res.data
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            loadProjects() {
                this.loading = true
                axios.get(`cors/MyProject?page=&type=all`)
                    .then(res => {
                        this.projects = res.data
                        this.loading = false
                        this.$store.commit('set_my_projects', res.data)
                    })
                    .catch(err => {
                        console.error(err);
                    })

                this.loadLogs()
            },
            project_name(project) {
                if (project.project)
                    return `${project.project.TYPE}#${project.project.NUM}v.${project.project.VERSION}`;
            },
            updateStatus(Project) {
                updateStatus(Project)
            },
            btnIcon(Status, f, pp) {
                if (f == "dis_en") {
                    if (pp == "play") {
                        if (Status == null && Status != "Working on it" || Status == 'Paused')
                            return false;
                        else
                            return true;

                    } else if (pp == "pause") {
                        if (Status == "Working on it")
                            return false;
                        else
                            return true;
                    } else {
                        if (Status == "Working on it")
                            return false;

                        else
                            return true;
                    }
                }
            },


        },
    }
</script>