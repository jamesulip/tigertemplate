<template>
    <b-form>
        <div class="row">
            <div class="col-md-6">
                <b-form-group label="Media:" label-for="input-3">
                    <b-form-input v-model="form.details.s_media" />
                </b-form-group>
            </div>
            <div class="col-md-6">
                <b-form-group label="Project Type:" label-for="input-1">
                    <v-select :label="`name`" v-model="form.projects.projecttype" :reduce="Client => Client.ID"
                        :options="$store.getters.get_projecttypes">
                        <template #selected-option="{ name }">
                            <div style="margin:2px">
                                <strong>{{ name }}</strong>
                            </div>
                        </template>
                    </v-select>
                </b-form-group>
            </div>
        </div>
        <b-form-group label="Project Name:" label-for="input-2">
            <b-form-input v-model="form.details.s_projname" />
        </b-form-group>

        <div class="clearfix">
            <hr class="col-md-12">
            <b-form-group label="Project Name:" label-for="input-2">
                <b-form-select value-field="steps" text-field="stepname" v-model="test" :options="this.$store.getters.get_productstep"/>
            </b-form-group>
        </div>
    </b-form>
</template>
<script>
    export default {
        props: ['value'],
        data() {
            return {
                test:[],
                form: {
                    "finishers": [],
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
                    "items": []
                }
            }
        },
        mounted() {



        },
    }
</script>