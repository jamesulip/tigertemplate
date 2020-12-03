<template>
    <div class="pt-3">
        <div class="col-md-12 row">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Designers</h3>
                    </div>

                    <div class="card-body p-0 cleafix">

                        <div class="block">
                            <b-list-group class="list-group-flush">
                                <b-list-group-item class="d-flex align-items-center py-1"
                                    v-for="(des,index) in designers" :key="`artist-${index}`">
                                    <b-avatar style="width:25px;height:25px" variant="info"
                                        src="https://placekitten.com/300/300" class="mr-2">
                                    </b-avatar>
                                    <span class="mr-auto text-truncate"  v-b-tooltip.hover.bottom="des.name">{{des.name}}</span>
                                    <b-badge>{{des.count_count}}</b-badge>
                                </b-list-group-item>
                            </b-list-group>
                        </div>

                    </div>
                </div>

            </div>
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header border-0">
                        <h3 class="card-title">Products</h3>
                        <div class="card-tools">
                            <a href="#" class="btn btn-tool btn-sm">
                                <i class="fas fa-download"></i>
                            </a>
                            <a href="#" class="btn btn-tool btn-sm">
                                <i class="fas fa-bars"></i>
                            </a>
                        </div>
                    </div>
                    <loading1 v-if="loading.projectLoading"/>
                    <div class="card-body  p-0" style="min-height:600px">
                        <table class="table table-hover table-head-fixed table-condensed table-sm  table-valign-middle">
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

                                <tr v-for="proj in projects.data" :key="`projects-${proj.ID}`" style="cursor:pointer"
                                    @contextmenu.prevent="event=>openContext(event,proj)" :class="{'table-active':proj.selected}">
                                    <td>
                                        <b-form-checkbox id="checkbox-1" v-model="proj.selected" name="checkbox-1"
                                            :value="true" :unchecked-value="false">

                                        </b-form-checkbox>
                                    </td>
                                    <td scope="row">{{proj.project.TYPE}}#{{proj.project.NUM}}</td>
                                    <td>{{proj.details.s_projname}}</td>
                                    <td>{{proj.details.client2.com_name}} </td>
                                    <td >
                                        <b-avatar style="width:25px;height:25px" variant="info"
                                            src="https://placekitten.com/300/300" class="mr-2">
                                        </b-avatar> <div class="text-truncate d-inline-block" style="max-width: 150px;"> {{proj.employees2.ln}}</div>
                                    </td>
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
                    projectLoading: true,
                    designersLoading: true
                }
            }
        },
        mounted() {

            this.loadproject();

        },

        methods: {
            openContext($event, proj) {
                proj.selected = true
                this.$refs.menu.open($event, proj)
                this.$forceUpdate()
            },
            delegate(data, user) {
                this.loading.designersLoading = true
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

                this.loading.designersLoading = true
                return axios.get(`cors/users/list?role=Creatives-Dept`).then(x => {
                    this.loading.projectLoading = false
                    return x
                });

            },
            getProjects() {
                this.loading.projectLoading = true
                return axios.get(`cors/MyProject/all`).then(x => {
                    this.loading.projectLoading = false
                    return x
                });



            },
            loadproject() {

                axios.all([this.getCreatives(), this.getProjects()])
                    .then(axios.spread((designers, projects) => {
                        this.designers = designers.data;
                        this.projects = projects.data

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