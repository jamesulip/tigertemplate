<template #button-content>
    <li role="presentation">
        <a role="button" class="dropdown-item" @click="open_jo_add_modal = true">
            <slot>
                Add Job Order
            </slot>

        </a>
        <b-modal lazy @ok="submit" no-close-on-esc no-close-on-backdrop :title="`Add PSR`" size="lg" @show="add"
            v-model="open_jo_add_modal">
            <jo_form ref="jo_form" v-model="data" @added="x=>{
                $emit('added');open_jo_add_modal=false
            }" />
            <template #modal-footer="{ ok, close }">
                <b-button variant="danger" class="float-right" @click="close()">
                    Cancel
                </b-button>
                <b-button :disabled="$refs.jo_form?$refs.jo_form.loading:false" variant="primary" class="float-right"
                    @click="ok()">
                    <i class="fas fa-save"></i>
                    Save
                </b-button>
            </template>
        </b-modal>
    </li>
</template>
<script>
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
                    "finishers": [

                    ],
                    "details": {
                        "s_accountexec": this.$store.getters.current_employee_id,
                        "s_projname": this.$store.getters.get_project.ProjectName,
                        "s_company": this.$store.getters.get_project.Client,
                        "size": ""
                    },
                    "projects": {
                        "SALESEXEC": this.$store.getters.current_employee_id,
                        "projectID": this.$store.getters.get_project.ID,
                        "TYPE": "PSR",
                        "projecttype": 11
                    },
                    items: []

                }
            }
        },

        methods: {
            submit(bvt) {
                bvt.preventDefault();
                this.$refs.jo_form.submit()
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
                        projects:res.data.project,
                        // details:{
                        //     ...res.data.details,
                        //     size:res.data.details.size.split(',')
                        // }
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