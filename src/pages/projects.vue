<template>
    <div class="pt-3">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header ui-sortable-handle" style="cursor: move;">
                    <h3 class="card-title">
                        Delegated Projects
                    </h3>
                </div>
                <div class="card-body  p-0" style="min-height:600px">
                    <table class="table table-hover table-head-fixed table-striped table-condensed table-sm  table-valign-middle">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Number</th>
                                <th>Project Name</th>
                                <th>Company</th>
                                <th>Media</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(Project, index) in projects.data" :key="index">
                                <td>
                                    
                                    <div class="badge badge-info text-md">
                                        PSR
                                    </div>
                                </td>
                                <td>
                                    {{Project.project.NUM}} <span class="text-muted"
                                            v-if="parseInt(Project.project.VERSION)">Version:{{Project.project.VERSION}}</span>
                                </td>
                                <td>{{Project.details.s_projname}}</td>
                                <td>{{Project.details.client2.com_name}}</td>
                                <td  class=" middle-align">
                                    <span class="badge">{{Project.details.s_media}}</span>
                                </td>
                                <td >
                                    <span style="display:block">{{Project.Status}} </span>
                                </td>
                                <td >
                                    <i class="fa fa-history" aria-hidden="true"></i>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        data() {
            return {
                projects: []
            }
        },
        mounted() {
            axios.get(`cors/MyProject?page=&type=all`)
                .then(res => {
                    this.projects = res.data
                })
                .catch(err => {
                    console.error(err);
                })
        },
    }
</script>