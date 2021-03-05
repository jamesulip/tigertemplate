<template #button-content>
    <li role="presentation">
        <a role="button" class="dropdown-item" @click="open_jo_add_modal = true">
            <slot>
                Add Job Order
            </slot>

        </a>
        <b-modal lazy @ok="submit" no-close-on-esc no-close-on-backdrop v-if="data.projects" size="xl" @show="add"
            v-model="open_jo_add_modal">
            <jo_form ref="jo_form" v-model="data" @edited="x=>{
                $emit('edited');open_jo_add_modal=false
            }" />
            <template #modal-header="{ ok, close }">
               
                <div class="w-full">
                    <div class="inline-block py-1 pr-4 text-lg">
                        <span class="">
                            <b>Revise</b>{{`PSR#${data.projects.NUM} v.${data.projects.VERSION}`}}
                        </span>
                    </div>
                    <div class="float-right">
                        <b-button variant="danger" class=" mr-2" @click="close()">
                        Cancel
                        </b-button>
                    
                        <b-button :disabled="$refs.jo_form?$refs.jo_form.updating:false" variant="primary" class=""
                            @click="ok()">
                            <i class="fas fa-save"></i>
                            Revise
                        </b-button>
                    </div>
                  </div>
           
            </template>
            <template #modal-footer="{ ok, close }">
                <b-button variant="danger" class="float-right" @click="close()">
                    Cancel
                </b-button>
                <b-overlay :show="$refs.jo_form?$refs.jo_form.updating:false">
                <b-button :disabled="$refs.jo_form?$refs.jo_form.updating:false" variant="primary" class="float-right"
                    @click="ok()">
                    <i class="fas fa-save"></i>
                    Revise
                </b-button>
                </b-overlay>
            </template>
        </b-modal>
    </li>
</template>
<script>
import { mapGetters } from 'vuex'
    /*eslint-disable*/
    import jo_form from './edit_form'
    export default {
        props:['id'],
        components: {
            jo_form
        },
        data() {
            return {
                open_jo_add_modal: false,
                data: {
                   
                }
            }
        },
        computed: {
            
            ...mapGetters([
                'current_employee_id', 'get_project'
            ])
        },
        mounted() {
            this.data = {
                "finishers": [],
                "details": {
                    "s_accountexec": this.current_employee_id,
                    "s_projname": this.get_project.ProjectName,
                    "s_company": this.get_project.Client,
                    "size": ""
                },
                "projects": {
                    "SALESEXEC": this.current_employee_id,
                    "projectID": this.get_project.ID,
                    "TYPE": "JO",
                    "projecttype": 11
                },
                // items: []
                size:""
            }
        },
        methods: {
            submit(bvt) {
                bvt.preventDefault();
                this.$refs.jo_form.revise()
            },
            add(){
                if(this.id)
                    this.create_from_id(this.id)
            },
            create_from_id(id) {
               axios.get(`cors/projectDetail/${id.DETAILID}`)
               .then(res => {
                    this.data = {
                        ...res.data,
                        projects:{
                            ...res.data.project,
                            projecttype:parseInt(res.data.project.projecttype)
                        },
                    }
                    delete this.data.project;

               })
               .catch(err => {
                   console.error(err); 
               })
            }
        },

    }
</script>