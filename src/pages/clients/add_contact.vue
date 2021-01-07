<template>
    <div>
        <div class="d-flex" style="align-items: flex-start;">
            <span class="h4">Add Contact</span>
            <b-button pill variant="secondary" class="ml-2" size="sm" @click="add_contact_modal=true">
                <b-icon-plus></b-icon-plus>
            </b-button>
        </div>

        <b-modal v-model="add_contact_modal" @ok="validate" :title="`Add Contacts`">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="Contact Name:*" :state="array_to_bool(validation.name)" label-for="name-input" invalid-feedback="Contact Name is required">
                    <b-form-input id="name-input" :state="array_to_bool(validation.cli_name)" v-model="clients.cli_name" required></b-form-input>
                </b-form-group>

                <b-form-group label="Email" label-for="email-input" invalid-feedback="Email is required">
                    <b-form-input type="email" id="email-input" :state="array_to_bool(validation.cli_Email)" v-model="clients.cli_Email" ></b-form-input>
                </b-form-group>

                <b-form-group label="Position" label-for="Position-input" invalid-feedback="Position is required">
                    <b-form-input id="Position-input" v-model="clients.cli_Position" ></b-form-input>
                </b-form-group>

                <b-form-group label="Contact Numbers" label-for="Contact-input"
                    invalid-feedback="Atleast 1 contact Number is required">
                    <b-form-tags tag-variant="primary" v-model="clients.cli_phone" tag-pills id="Contact-input"
                        ></b-form-tags>
                </b-form-group>
        
            </form>
        </b-modal>
    </div>
</template>
<script>
  /* eslint-disable*/
    export default {
        data() {
            return {
                add_contact_modal: false,
                clients: {
                    "cli_name": null,
                    "cli_Email": null,
                    "cli_phone": null,
                    "cli_Position": null,
                    "cli_company": this.$route.params.id,
                    "s_accountexec": this.$store.state.currentUser.id,
                    "active": true,
                },
                validation:{
                  
                }
            }
        },
        methods: {
            array_to_bool(array){
                if(array)
                    return !Boolean(array.length)
            },
            validate(bvModalEvt) {
                bvModalEvt.preventDefault()
                // this.handleSubmit()
                
                    axios.post(`cors/clients`,{
                        ...this.clients,
                        cli_phone:this.clients.cli_phone.join(',')

                    })
                    .then(res => {
                        this.$emit('contact_added')
                        this.add_contact_modal = false
                    })
                    .catch(err => {
                        console.log(err.response.data.errors)
                        this.validation = err.response.data.errors; 
                    })
                
            }
        },
    }
</script>