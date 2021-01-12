<template>
    <div>
        <b-button pill @click="add_project_modal=true" variant="secondary" class="btn-flat ml-3" size="sm">
            <b-icon-plus></b-icon-plus>
        </b-button>
        <b-modal :title="`Add Project`" v-model="add_project_modal" @ok="add_project">
            <b-form>
                  <b-form-group
                    id="input-group-1"
                    label="Project Name:"
                    label-for="input-1"
                >
                    <b-form-input
                    id="input-1"
                    v-model="data.ProjectName"
                    type="email"
                    placeholder="Enter email"
                    required
                    ></b-form-input>
                </b-form-group>


                <b-form-group
                    id="input-group-1"
                    label="Client:"
                    label-for="input-1"
                >
                    <b-form-select v-model="data.Client" :options="companies"
                    
                    required
                    ></b-form-select>
                </b-form-group>



            </b-form>
        </b-modal>
    </div>
</template>
<script>
/*eslint-disable*/
export default {
    data() {
        return {
            add_project_modal:false,
            data:{
                Client: "",
                ProjectName: "asdasd",
                SalesExec: this.$store.getters.current_employee_id,
                default_cont: "",
                datecreated: "2021-01-13"
            },
            companies:[]
        }
    },
    mounted() {
        this.getCompany()
    },
    methods: {
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
                console.error(err); 
            })
        },
        add_project(bvModalEvt){
             bvModalEvt.preventDefault()
             axios.post(`cors/wholeprojects`,this.data)
             .then(res => {
                //  console.log(res)
                this.$emit('project_added')
                this.add_project_modal = false
             })
             .catch(err => {
                 console.error(err); 
             })
        }
    },
}
</script>