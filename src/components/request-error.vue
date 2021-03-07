<template>
    <div class="row">
        <b-button @click="request_error=true">
            Request Error
        </b-button>
        <b-modal no-close-on-backdrop @show="load_assets()" size="lg" v-model="request_error" hide-header>

            <b-tabs>
                <b-tab>
                    <template #title>
                        <div>
                            Error Project
                        </div>
                    </template>
                    <div class="p-2 pt-3">
                        <b-form-group id="input-group-1" label="Projects:" label-for="input-1">
                            <v-select label="ID" multiple v-model="error_info.selected_projects" :options="projects">
                                <template #selected-option="p">
                                    <div>
                                        {{p.TYPE}}#{{p.NUM}}
                                        <template v-if="p.VERSION >0">
                                            {{p.VERSION}}
                                        </template>
                                    </div>
                                </template>
                                <template #option="p">
                                    <div>
                                        {{p.TYPE}}#{{p.NUM}}
                                        <template v-if="p.VERSION>0">
                                            {{p.VERSION}}
                                        </template>
                                    </div>
                                </template>
                            </v-select>
                        </b-form-group>
                        <table class="table ">
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>Item</td>
                                    <td>W</td>
                                    <td>H</td>
                                    <td>UoM</td>
                                    <td>Qty</td>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(proje) in error_info.selected_projects">
                                    <tr class="bg-gray-200" v-bind:key="`x-${proje.ID}`">
                                        <th colspan="6">
                                            {{proje.TYPE}}#{{proje.NUM}}
                                        </th>
                                    </tr>
                                    <tr :class="{'bg-gray-100':item.selected}" v-for="item in proje.items"
                                        :key="`i-${item.ID}`">
                                        <td>
                                            <b-form-checkbox v-model="item.selected" />
                                        </td>
                                        <td>{{item.source}}</td>
                                        <td>{{item.w}}</td>
                                        <td>{{item.h}}</td>
                                        <td>{{item.uom}}</td>
                                        <td class="w-20">
                                            <input class="form-control" type="text" name="" v-model="item.qty" id="">
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </b-tab>
                <b-tab>
                    <template #title>
                        <div>
                            Error Information
                        </div>
                    </template>
                    <div class="p2 pt-3">
                        <b-form-group @change="error_info.employees=[]" id="input-group-1" label="Error Description:" label-for="input-1">
                            <v-select :options="error_process" v-model="error_info.error_process" label="name"
                                :selectable="option => !option.hasOwnProperty('group')">
                                <template #option="{ group, name }">
                                    <div v-if="group" class="group">
                                        {{ group }}
                                    </div>
                                    {{ name }}
                                </template>
                            </v-select>
                        </b-form-group>

                        <b-form-group id="input-group-1" label="Possible Error Type:" label-for="input-1">
                            <v-select :multiple="false" v-if="error_info.error_process" v-model="error_info.error_type" :options="error_info.error_process.errors"
                                label="name" :selectable="option => !option.hasOwnProperty('group')">
                                <template #option="u">
                                   <span class="capitalize">{{ u.name.toLowerCase() }}</span>
                                </template>
                                <template #selected-option="u">
                                     <span class="capitalize">{{ u.name.toLowerCase() }}</span>
                                </template>
                            </v-select>
                        </b-form-group>

                        <b-form-group id="input-group-1" label="Plan:" label-for="input-1"  v-if="error_info.error_type">
                            <v-select :multiple="false" v-model="error_info.plan" :options="error_info.error_type.possile_plans"
                                label="name" :selectable="option => !option.hasOwnProperty('group')">
                                <template #option="u">
                                   <span class="capitalize">{{ u.plan.name }}</span>
                                </template>
                                <template #selected-option="u">
                                     <span class="capitalize">{{ u.plan.name}}</span>
                                </template>
                            </v-select>
                        </b-form-group>

                        <b-form-group id="input-group-1" label="Possible Employee:" label-for="input-1">
                            <v-select :multiple="true" v-if="error_info.error_process" v-model="error_info.employees" :options="possible_employees"
                                label="name" :selectable="option => !option.hasOwnProperty('group')">
                                <template #option="u">
                                    <span class="capitalize">{{ u.first_name.toLowerCase() }}</span>
                                </template>
                                <template #selected-option="u">
                                     <span class="capitalize">{{ u.first_name.toLowerCase() }}</span>
                                </template>
                            </v-select>
                        </b-form-group>
                    </div>

                </b-tab>
            </b-tabs>
        </b-modal>
    </div>
</template>
<script>
    export default {
        props: ['projects'],
        data() {
            return {
                request_error: false,
                


                error_type: [],
                error_process: [],
                employees:[],

                error_info: {
                    selected_projects: [],
                    error_process: {
                        errors: []
                    }
                }
            }
        },
        computed: {
            optgroup() {
                return this.error_process
            },
            possible_employees(){
                return this.employees.filter(x=>{
                    return x.department_code == this.error_info.error_process.department_id
                })
            }
        },
        methods: {
            load_assets() {
                axios.get(`/cors/error_types`)
                    .then(res => {
                        // console.log(res)
                        this.error_type = res.data
                    })
                    .catch(err => {
                        console.error(err);
                    })
                axios.get(`/cors/error_process`)
                    .then(res => {
                        // console.log(res)
                        this.error_process = res.data
                    })
                    .catch(err => {
                        console.error(err);
                })
                axios.get(`/cors/employees`)
                .then(res => {
                    this.employees =res.data
                })
                .catch(err => {
                    console.error(err); 
                })
            }
        },
    }
</script>