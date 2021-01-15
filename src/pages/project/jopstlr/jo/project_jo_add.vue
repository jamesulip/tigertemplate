<template #button-content>
    <li role="presentation">
        <a role="button" class="dropdown-item" @click="open_jo_add_modal = true">
            <slot>
                Add Job Order
            </slot>

        </a>
        <b-modal lazy @ok="submit" no-close-on-esc no-close-on-backdrop :title="`Add Job Order`" size="lg"
            v-model="open_jo_add_modal">
            <jo_form ref="jo_form" v-model="data" />
            <template #modal-footer="{ ok, close }">
               
                    <b-button variant="primary"  class="float-right" @click="close()">
                        Cancel
                    </b-button>
                     <b-button variant="primary"  class="float-right" @click="ok()">
                        Save
                    </b-button>
            </template>
        </b-modal>
    </li>
</template>
<script>
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
                    "finishers": [

                    ],
                    "details": {
                        "s_accountexec": this.$store.getters.current_employee_id,
                        "s_projname": this.$store.getters.get_project.ProjectName,
                        "s_company": this.$store.getters.get_project.Client
                    },
                    "projects": {
                        "SALESEXEC": this.$store.getters.current_employee_id,
                        "projectID": this.$store.getters.get_project.ID,
                        "TYPE": "JO",
                        "projecttype": 11
                    },
                    items:[]

                }
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