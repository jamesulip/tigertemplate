<template>
    <div v-if="data.details" class="row">
        <div class="col-md-12">
            <b-form-group id="fieldset-1" label="Proposal Name" label-for="input-1" valid-feedback="Thank you!">
                <b-form-input id="input-1" v-model="data.details.s_projname" trim></b-form-input>
            </b-form-group>
        </div>
        <div class="col md-6">
            <b-form-group id="fieldset-1" label=" Media" label-for="input-1">
                <b-form-input id="input-1" v-model="data.details.media" trim></b-form-input>
            </b-form-group>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';
    export default {
        data() {
            return {
                open_jo_add_modal: false,
                data: {

                }
            }
        },
        computed: {
            ...mapGetters(['current_employee_id', 'get_project'])
        },
        mounted() {
            this.data = {
                "finishers": [

                ],
                "details": {
                    "s_accountexec": this.current_employee_id,
                    "s_projname": this.get_project.ProjectName,
                    "s_company": this.get_project.Client,
                    "size": ""
                },
                "projects": {
                    "SALESEXEC": this.current_employee_id,
                    "projectID": this.get_project.ID,
                    "TYPE": "PSR",
                    "projecttype": 11
                },
                items: []
            }
        },
    }
</script>