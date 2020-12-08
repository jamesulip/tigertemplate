<template>
    <div class="pt-3">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        Delegated Projects
                    </h3>
                </div>
                <div class="card-body" v-if="$store.getters.getCurrentJob.project">
                    Currently working on <span class="badge badge-primary p-1 badge-pill px-2"><a role="button"
                        @click="current_project_modal=true">{{$store.getters.getCurrentJob.project.TYPE}}#{{$store.getters.getCurrentJob.project.NUM}}</a></span> 
                </div>
                <loading1 v-if="loading"/>
                <div class="card-body  p-0" style="min-height:600px">
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
                                    <updateButton :Project="Project" @saved="loadProjects()"/>
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
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <b-modal v-model="send" hide-backdrop content-class="shadow">

        </b-modal>
        <b-modal size="lg" ok-only v-model="current_project_modal"   content-class="shadow">
            <project_detail v-if="current_project_modal" />
        </b-modal>
    </div>
</template>

<script>
// import Loading1 from '../components/loaders/loading1.vue'
    /* eslint-disable */
  
    export default {
        components: {
            project_detail: () => import('./project/project_detail.vue'),
            updateButton: () => import('../components/updatebutton.vue')
                
        },
        data() {
            return {
                projects: [],
                send: false,
                // current_job:this.$store.getters.getCurrentJob,
                current_project_modal: false,
                loading:true
            }
        },
        mounted() {
            this.loadProjects()
            this.$store.dispatch('set_current_job').then(x=>{
               console.log(x)
            })
        },
        computed:{
            // selectedproj(){
         
            //     var selected_project = this.$store.getters.getCurrentJob
            //     if(selected_project.project)
            //     return {
            //         project_name: `${selected_project.project.TYPE}#${selected_project.project.NUM}`,
            //         version:selected_project.project.VERSION,
            //         loaded:true
            //     }
            //     else
            //         return {
            //             project_name:null,
            //             version:null
            //         }
              
               
            // }
        },
        methods: {
            loadProjects(){
                this.loading = true
                axios.get(`cors/MyProject?page=&type=all`)
                .then(res => {
                    this.projects = res.data
                    this.loading = false
                })
                .catch(err => {
                    console.error(err);
                })
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