<template #button-content>
    <li role="presentation">
        <a role="button" class="dropdown-item" @click="open_jo_add_modal = true">
            <slot>
                Add Job Order
            </slot>

        </a>
        <b-modal lazy @ok="submit" no-close-on-esc no-close-on-backdrop :title="`Add PSR`" size="lg" @show="add"
            v-model="open_jo_add_modal"     body-class="p-0"  hide-header>
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
    import jo_form from './forms'
    import {
        mapGetters
    } from 'vuex';
    export default {
        props: ['id'],
        components: {
            jo_form
        },
        data() {
            return {
                loaded: true,
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
                    "TYPE": "PSR",
                    "projecttype": 11
                },
                // items: []
                size:""
            }
        },
        methods: {
            submit(bvt) {
                bvt.preventDefault();
                this.$refs.jo_form.submit()
            },
            add() {
                this.loaded = true
                if (this.id)
                    this.create_from_id(this.id)
            },
            create_from_id(id) {

                axios.get(`cors/wholeprojects/${id}`).then(x => {
                    this.data = {
                        "finishers": [],
                        "details": {
                            "s_accountexec": this.current_employee_id,
                            "s_projname": x.ProjectName,
                            "s_company": x.Client,
                            "size": null
                        },
                        "projects": {
                            "SALESEXEC": this.current_employee_id,
                            "projectID": x.ID,
                            "TYPE": "PSR",
                            "projecttype": 11
                        },
                        items: []
                    }
                    this.loaded = false
                })
            }
        },

    }
</script>