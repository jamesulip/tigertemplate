<template>
    <b-dropdown-item @click="show_modal()">
        <span class="h6 text-danger">
            <i class="fa fa-trash" aria-hidden="true"></i>
            Delete
        </span>

        <b-modal lazy title="Confirm Delete?" ref="con_password" centered size="sm" class="success"
            @ok="submit_password">
            <template #modal-footer={ok}>
                <div class="col-md-12">
                    <b-button variant="success" block size="md" @click="ok">Confirm</b-button>
                </div>
            </template>
            <div>
                <div class="form-group">
                    <label for="">Enter Password to confirm</label>
                    <div class="input-group">
                        <b-form-input type="password" :state="array_to_bool(errors.password)" v-model="password"
                            class="form-control" placeholder="Password" />
                        <b-form-invalid-feedback :state="array_to_bool(errors.password)">
                            Password Incorrect.
                        </b-form-invalid-feedback>
                    </div>
                </div>

            </div>
        </b-modal>
    </b-dropdown-item>
</template>
<script>
    /*eslint-disable*/
    import {mapGetters} from 'vuex'
    export default {
        props:['project'],
        data() {
            return {
                password: 'Persevere',
                errors: {}
            }
        },
        computed:{
            ...mapGetters([
               'current_employee_id' 
            ])
        },
        methods: {
            array_to_bool(array) {
                if (array)
                    return !Boolean(array.length)
            },
            async show_modal() {
                this.$refs['con_password'].show()
            },
            submit_password(s) {
                this.errors = {}
                s.preventDefault();
                axios.post(`cors/checkpass`, {
                    SalesExec: this.current_employee_id,
                    password: this.password
                })
                .then(res => {
                    axios.post(`cors/delete/${this.project.DETAILID}/job`)
                    .then(res => {
                        console.log(res)
                        this.$emit('deleted')
                    })
                    .catch(err => {
                        console.error(err); 
                    })
                })
                .catch(err => {
                    this.errors = err.response.data.errors
                })
            }
        },
    }
</script>