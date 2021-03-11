<template>
    <div class="row">
        <b-button variant="danger" @click="request_error=true">
            Request Error
        </b-button>
        <b-modal @ok="submit_error" no-close-on-backdrop @show="load_assets()" size="lg" v-model="request_error" hide-header>

            <b-tabs>
                <b-tab>
                    <template #title>
                        <div>
                            Error Project
                        </div>
                    </template>
                    <div class="p-2 pt-3">
                        <b-form-group id="input-group-1" label="Projects:" label-for="input-1">
                            <v-select label="ID" multiple v-model="error_info.selected_projects" :options="p">
                                <template #selected-option="{project}">
                                    <div>
                                        {{project.TYPE}}#{{project.NUM}}
                                        <template v-if="project.VERSION >0">
                                            {{project.VERSION}}
                                        </template>
                                    </div>
                                </template>
                                <template #option="{project}">
                                    <div>
                                        {{project.TYPE}}#{{project.NUM}}
                                        <template v-if="project.VERSION>0">
                                            {{project.VERSION}}
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
                                    <td>Width</td>
                                    <td>Height</td>
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
                                        <td><input type="text" class="tw-input py-1" name="" v-model="item.source" id=""></td>
                                        <td><input type="text" class="tw-input py-1" name="" v-model="item.w" id=""></td>
                                        <td><input type="text" class="tw-input py-1" name="" v-model="item.h" id=""></td>
                                        <td><input type="text" class="tw-input py-1" name="" v-model="item.uom" id=""></td>
                                        <td class="w-16">
                                            <input type="text" class="tw-input  py-1" name="" v-model="item.qty" id="">
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </b-tab>
                <b-tab :disabled="!Boolean(error_info.selected_projects.length)">
                    <template #title>
                        <div>
                            Error Information
                        </div>
                    </template>
                    <div class="col-md-12 pt-3">
                        <b-form-group @change="error_info.employees=[]" id="input-group-1" label="Error Description:"
                            label-for="input-1">
                            <v-select @input="select_error_process()" :options="error_process" v-model="error_info.error_process" label="name"
                                :selectable="option => !option.hasOwnProperty('group')">
                                <template #option="{ group, name }">
                                    <div v-if="group" class="group">
                                        {{ group }}
                                    </div>
                                    {{ name }}
                                </template>
                            </v-select>
                        </b-form-group>

                        <b-form-group id="input-group-1" label="Possible Error Type:" label-for="input-1"  v-if="error_info.error_process.id">
                            <v-select :multiple="false" v-model="error_info.error_type"
                                :options="error_info.error_process.errors" label=" u.name"
                                :selectable="option => !option.hasOwnProperty('group')">
                                <template #option="u">
                                    <span class="capitalize">{{ u.name.toLowerCase() }}</span>
                                </template>
                                <template #selected-option="u">
                                    <span class="capitalize">{{ u.name.toLowerCase() }}</span>
                                </template>
                            </v-select>
                        </b-form-group>

                        <b-form-group id="input-group-1" @change="update_finishing()" label="Plan:" label-for="input-1" v-if="error_info.error_type">
                            <v-select :multiple="false" v-model="error_info.plan"
                                :options="filter_plans(error_info.error_type.possile_plans)" label="u.plan.name"
                                :selectable="option => !option.hasOwnProperty('group')">
                                <template #option="u">
                                    <span class="capitalize">{{ u.plan.name }}</span>
                                </template>
                                <template #selected-option="u">
                                    <span class="capitalize">{{ u.plan.name}}</span>
                                </template>
                            </v-select>
                        </b-form-group>

                        <div class="row" v-if="error_info.error_process.id">
                        <b-form-group id="input-group-1" label="Employee:" class="col-6" label-for="input-1" v-if="error_info.error_process">
                            <v-select :multiple="true"  v-model="error_info.employees"
                                :options="possible_employees" label="u.first_name"
                                :selectable="option => !option.hasOwnProperty('group')">
                                <template #option="u">
                                    <span class="capitalize">{{ u.first_name.toLowerCase() }}</span>
                                </template>
                                <template #selected-option="u">
                                    <span class="capitalize">{{ u.first_name.toLowerCase() }}</span>
                                </template>
                            </v-select>
                        </b-form-group>
                        <b-form-group id="input-group-1" label="Machine:"  class="col-6" label-for="input-1" v-if="error_info.error_process && error_info.error_process.name =='MACHINE ERROR'">
                            <v-select :multiple="true"  v-model="error_info.employees"
                                :options="possible_employees" label="u.first_name"
                                :selectable="option => !option.hasOwnProperty('group')">
                                <template #option="u">
                                    <span class="capitalize">{{ u.first_name.toLowerCase() }}</span>
                                </template>
                                <template #selected-option="u">
                                    <span class="capitalize">{{ u.first_name.toLowerCase() }}</span>
                                </template>
                            </v-select>
                        </b-form-group>
                        </div>
                        
                        <div v-if="selected_project" class="row">
                            <div class="col-md-6" v-for="x in skip_finishing" :key="`ss-${x.ID}`" >
                                <div class="card" >
                                    <div class="card-header" :class="{'bg-blue-200':x.Status}">
                                        <h4 class="card-title">{{x.FINISHING}}</h4>
                                       <span class="float-right">
                                            {{x.Status?'Skipped':''}}
                                       </span>
                                    </div>
                                    <div class="card-body">
                                        <textarea name="" v-model="x.DETAILS" class="form-control"></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </b-tab>
            </b-tabs>
            <div class="col-md-12 pt-3">
                    <quillEditor  :options="customToolbar" v-model="data.content" style="height:100%" ref="test" />
            </div>
        </b-modal>
    </div>
</template>
<script>
    import _ from 'lodash'
    import {
        quillEditor,
        Quill
    } from 'vue-quill-editor'
import { mapState } from 'vuex'
    export default {
        props:['projects'],
        components:{
            quillEditor
        },
        data() {
            return {
                request_error: false,
                steps:3,
                step:2,
                error_type: [],
                error_process: [],
                employees: [],

                error_info: {
                    selected_projects: [],
                    employees:[],
                    error_process: {
                        errors: []
                    },
                    
                },
                customToolbar: {
                    theme: 'snow',
                    modules: {
                        toolbar: {

                            container: [
                                ["bold", "italic", "underline"],
                                [{
                                    list: "ordered"
                                }, {
                                    list: "bullet"
                                }],
                                ['image']
                            ],
                            // handlers: {
                            //     'image': function () {
                            //         document.getElementById('getFile').click()
                            //     }
                            // }
                        }
                    }
                },
                data:{
                    content:''
                },
                p:[],
                machines:[],
                possibleMachine:[],
                testsss:''
                // projects:[]
            }
        },
      
        computed: {
            ...mapState(['currentUser']),
            selected_project(){
                return _.first(this.p)
            },
            optgroup() {
                return this.error_process
            },
            possible_employees() {
                return this.employees.filter(x => {
                    return x.department_code == this.error_info.error_process.department_id
                })
            },
            
            skip_finishing:{
                get(){
                    try {
                        return _.first(this.p).finishers.map(x=>{
                            return {
                                ...x,
                                Status:this.error_info.plan.plan.data.find(g=>x.FINISHING ==g.prodt_name)?null:'Done',
                                Start:null,
                                Stop:null
                            }
                        })
                    } catch (error) {
                    
                        return []
                    }
                },
                set: _.debounce(function(newValue) {
                    this.$emit('input', newValue);
                }, 100)
               
            }
        },
        mounted() {
            axios.post(`/cors/projectDetail_multiple`,{
                projects:this.projects
            })
            .then(res => {
               this.p = res.data
            }),
            axios.get(`/cors/machines`)
            .then(res => {
              this.machines = res.data
            })
            .catch(err => {
                console.error(err); 
            })
           
        },
        methods: {
            select_error_process(){
                    var machine = this.skip_finishing.map(fin => {
                        return fin.map(w => {
                            console.log('x', w)
                            return w
                        })
                    }).flat().map(m => {
                        return m.folder
                    }).filter(x => {
                        return x != null
                    })

                    this.possibleMachine = this.machines.filter(x => {
                        return machine.includes(x.id)
                    }).flat()
            },
            checkShow(d) {
                try {
                    var ww = this.error_info.error_process.map(x => {
                        return x.department.Name
                    })
                    console.log('ww',ww);
                    return ww.includes(d);
                } catch (error) {
                    return false;
                }
            },
            filter_plans() {
                return this.error_info.error_type.possile_plans.filter(x => {
                    return x.plan
                })
            },
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
                        this.employees = res.data
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            submit_error(mo){
                mo.preventDefault();
                const test = {
                    error:{
                        error_desc:[this.error_info.error_process.id],
                        issued_by:this.currentUser.employee_id,
                        plan_id:this.error_info.plan.plan_id,
                        Status:'Approved'
                    },
                    error_item:{
                        project_id:this.error_info.selected_projects.map(x=>x.project.ID)
                    },
                    error_user:{
                        user_id:this.error_info.employees.map(x=>x.ID)
                    },
                    ...this.selected_project,
                    items:this.selected_project.items.filter(x=>x.selected),
                    finishers:this.skip_finishing
                }
                console.log('test',test);
                axios.post(`/cors/AddError`,test)
                .then(res => {
                    axios.post(`/cors/error/${res.data.error.id}/update`)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.error(err); 
                    })
                     axios.post(`cors/trail/${res.data.project.trailid}/send`, {
                        ...this.data,
                        user: this.currentUser.employee_id,
                        ref:res.data.ID,
                        content:this.data.content,
                        Type:'error'
                    }).then(res=>{
                        window.location.reload()
                    })
                })
                .catch(err => {
                    console.error(err); 
                })
            }
        },
    }
</script>