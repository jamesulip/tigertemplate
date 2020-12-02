<template>
    <div class="pt-3">
        <div class="col-md-12 row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Direct Chat</h3>
                    </div>
                    <div class="overlay">
                        <i class="fas fa-2x fa-spin fa-sync-alt"></i>
                    </div>
                    <div class="card-body p-0 cleafix">
                       
                        <div class="block">
                            <b-list-group class="list-group-flush">
                                <b-list-group-item class="d-flex align-items-center" v-for="(des,index) in designers"
                                    :key="`artist-${index}`">
                                    <b-avatar variant="info" src="https://placekitten.com/300/300" class="mr-3">
                                    </b-avatar>
                                    <span class="mr-auto">{{des.name}}</span>
                                    <b-badge>9</b-badge>
                                </b-list-group-item>
                            </b-list-group>
                        </div>
                         
                    </div>
                </div>

            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Projects</h3>
                    </div>
                    <div class="card-body p-1">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Number</th>
                                    <th>Project Name</th>
                                    <th>Company</th>
                                    <th>Delegated</th>
                                </tr>
                            </thead>
                            <tbody>
                               
                                    <tr v-for="proj in projects.data" :key="`projects-${proj.ID}`"
                                        style="cursor:pointer" @contextmenu.prevent="$refs.menu.open($event,proj)">
                                        <td>
                                            <b-form-checkbox id="checkbox-1" v-model="proj.selected" name="checkbox-1"
                                                :value="true" :unchecked-value="false">

                                            </b-form-checkbox>
                                        </td>
                                        <td scope="row">{{proj.project.TYPE}}#{{proj.project.NUM}}</td>
                                        <td>{{proj.details.s_projname}}</td>
                                        <td>{{proj.details.client2.com_name}} </td>
                                        <td>{{proj.employees2.ln}}</td>
                                    </tr>
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <vue-context ref="menu" v-slot="{ data }">
            <template v-if="designers">
                <li @click.prevent="delegate(data,des)" v-for="des in designers" :key="`dess-${des.id}`">
                    <a>
                        {{des.name}}
                        <br>
                        <small>{{des.email}}</small>
                    </a>
                </li>
            </template>
        </vue-context>
    </div>
</template>
<script>
    import VueContext from 'vue-context';
    /* eslint-disable */
    export default {
        components: {
            VueContext
        },
        data() {
            return {
                designers: [],
                projects: [],
                loading: {
                            projectLoading :true,
                            designersLoading: true
                        }
            }
        },
        mounted() {

            this.loadproject();

        },

        methods: {
            delegate(data, user) {
                axios.put(`cors/delegate`, {
                        finihserEmp: user.employee_id,
                        proj: this.projects.data.filter(x => x.selected).map(x => x.ID),
                        type: "delegate"
                    })
                    .then(res => {
                        // console.log(res)
                        this.loadproject()
                    })

            },
            getCreatives() {

                return axios.get(`cors/users/list?role=Creatives-Dept`).then(x=>{
                    this.loading.designersLoading = true
                    return x
                });

            },
            getProjects() {
                return axios.get(`cors/MyProject/all`).then(x=>{
                    this.loading.projectLoading = true
                    return x
                });
                    


            },
            loadproject() {
                
                axios.all([this.getCreatives(), this.getProjects()])
                    .then(axios.spread((designers, projects) => {
                        this.designers = designers.data;
                        this.projects = projects.data

                        this.loading = {
                            'projectLoading' :false,
                            'designersLoading': false
                        }
                }))
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '~vue-context/dist/css/vue-context.css';

    .context>li>a:hover {
        background-color: #dee2e6;
    }
</style>