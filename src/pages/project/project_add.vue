<template>
    <div class="ml-3">
        <div @click.prevent="add_project_modal=true"   :class="size?size:'h-10 w-10'" class="transition-all delay-75 cursor-pointer hover:bg-yellow-400 rounded-full bg-yellow-500  text-center  flex items-center justify-center" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3/4 h-3/4 " :class="size" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </div>
        <b-modal @hide="retsetData()" size="sm" no-close-on-backdrop :title="`Add Project`" v-model="add_project_modal" @ok="add_project">
            <b-form>
                  <b-form-group
                    id="input-group-1"
                    label="Project Name:"
                    label-for="input-1"
                    :state="array_to_bool(validation.ProjectName)"
                >
                    <b-form-input
                    id="input-1"
                    v-model="data.ProjectName"
                    type="text"
                    :state="array_to_bool(validation.ProjectName)"
                    placeholder="Enter Project Name"
                    required
                    ></b-form-input>
                </b-form-group>


                <b-form-group
                    id="input-group-1"
                    label="Client:"
                    label-for="input-1"
                    :state="array_to_bool(validation.Client)"
                >
                   <v-select label="text" :reduce="Client => Client.value" v-model="data.Client" :options="companies">
                   </v-select>
                       <b-form-invalid-feedback :state="array_to_bool(validation.Client)">
                        Client is required
                    </b-form-invalid-feedback>
                </b-form-group>
                


            </b-form>
        </b-modal>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
/*eslint-disable*/

export default {
    props:['size'],
    data() {
        return {
            add_project_modal:false,
            data:{
                Client: "",
                ProjectName: "",
                SalesExec: this.current_employee_id,
                default_cont: "",
                datecreated: "2021-01-13"
            },
            companies:[],
            validation:{

            }
        }
    },
    mounted() {
        this.getCompany()
        this.data.SalesExec = this.current_employee_id
    },
    computed: {
        ...mapGetters([
            'current_employee_id'
        ])
    },
    methods: {
        retsetData(){
            this.data ={
                Client: "",
                ProjectName: "",
                SalesExec: this.current_employee_id,
                default_cont: "",
                // datecreated: "2021-01-13"
            }
        },
        getCompany(){
            axios.get(`cors/companies`)
            .then(res => {
                // console.log(res)
                this.companies = res.data.map(x=>{
                    return {
                        text:x.com_name,
                        value:x.ID
                    }
                })
            })
            .catch(err => {
                
            })
        },
        add_project(bvModalEvt){
             bvModalEvt.preventDefault()
             axios.post(`cors/wholeprojects`,this.data)
             .then(res => {
                //  console.log(res)
                this.$emit('project_added')
                this.add_project_modal = false

                this.$bvToast.toast(`Project ${res.data.ProjectName}`, {
                    to:{
                        name:'project_view',
                        params:{
                            id:res.data.ID
                        }
                    },
                    title: 'Project Added',
                    autoHideDelay: 20000,
                    appendToast: true,
                    variant:'success',
                    toaster:'b-toaster-bottom-left'
                })
             })
             .catch(err => {
                 console.log(err)
                 this.validation = err.response.data.errors
             })
        },
        array_to_bool(array){
                if(array)
                    return !Boolean(array.length)
        },
    },
}
</script>