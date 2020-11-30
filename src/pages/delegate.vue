<template>
    <div class="pt-3">
        <div class="col-md-12 row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Direct Chat</h3>
                    </div>
                    <div class="card-body p-0">

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
                                    <th>Number</th>
                                    <th>Project Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="proj in projects.data" :key="`projects-${proj.ID}`"
                                    @contextmenu.prevent="$refs.menu.open">
                                    <td scope="row">{{proj.project.TYPE}}#{{proj.project.NUM}}</td>
                                    <td>{{proj.details.s_projname}}</td>
                                    <td>{{proj.details.client2.com_name}}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <vue-context ref="menu" class="list-group list-group-flush" v-slot="{ designers }">
            <b-list-group-item v-for="des in designers" :key="`dess-${des.id}`" class="d-flex justify-content-between align-items-center" href="#some-link">{{des.name}}
                <b-badge variant="primary" pill>1</b-badge>
            </b-list-group-item>
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
                projects: []
            }
        },
        mounted() {

            axios.all([this.getCreatives(), this.getProjects()])
                .then(axios.spread((designers, projects) => {
                    this.designers = designers.data;
                    this.projects = projects.data
                }))

        },
        methods: {
            getCreatives() {

                return axios.get(`cors/users/list?role=Creatives-Dept`)

            },
            getProjects() {
                return axios.get(`cors/MyProject/all`)


            }
        },
    }
</script>

<style lang="scss">
    @import '~vue-context/dist/css/vue-context.css';
</style>