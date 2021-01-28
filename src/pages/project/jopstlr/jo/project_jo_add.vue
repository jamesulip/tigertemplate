<template #button-content>
    <li role="presentation">
        <a role="button" class="dropdown-item" @click="open_jo_add_modal = true">
            <slot>
                Add Job Order
            </slot>

        </a>
        <b-modal lazy @ok="submit" no-close-on-esc no-close-on-backdrop :title="`Add Job Order`" size="lg"
            v-model="open_jo_add_modal">
            <jo_form ref="jo_form" v-model="data" @added="x=>{
                $emit('added');open_jo_add_modal=false
            }"/>
            <template #modal-footer="{ ok, close }">
                    <b-button variant="danger"  class="float-right" @click="close()">
                        Cancel
                    </b-button>
                     <b-button :disabled="$refs.jo_form?$refs.jo_form.loading:false" variant="primary"  class="float-right" @click="ok()">
                         <i class="fas fa-save"></i>
                         Save
                    </b-button>
            </template>
        </b-modal>
    </li>
</template>
<script>
import { mapGetters } from 'vuex';
    /*eslint-disable*/
    import jo_form from './forms'
    export default {
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
                'current_employee_id','get_project'
            ])
        },
        mounted() {
            this.data = {
                 "finishers": [
                    ],
                    "details": {
                        "s_accountexec": this.current_employee_id,
                        "s_projname": this.get_project.ProjectName,
                        "s_company": this.get_project.Client
                    },
                    "projects": {
                        "SALESEXEC": this.current_employee_id,
                        "projectID": this.get_project.ID,
                        "TYPE": "JO",
                        "projecttype": 11
                    },
                    items:[]
            }
        },
        methods: {
            
            submit(bvt) {
                bvt.preventDefault();
                // // console.log(this.data)

                this.$refs.jo_form.submit()
            }
        },

    }
</script>