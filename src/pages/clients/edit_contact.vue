<template>
    
        <b-button size="sm"  variant="info" @click="add_contact_modal=true">
            <b-icon-pencil></b-icon-pencil>

             <b-modal v-model="add_contact_modal" @show="setClient()" @ok="validate" :title="`Edit Contacts`">
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
                    <b-form-tags separator="," tag-variant="primary" v-model="clients.cli_phone" tag-pills id="Contact-input"
                        ></b-form-tags>
                </b-form-group>
        
            </form>
        </b-modal>
        </b-button>

       
    
</template>
<script>
import { mapState } from 'vuex'
  /* eslint-disable*/
  
    export default {
        props:['client'],
        data() {
            return {
                add_contact_modal: false,
                clients: {
                   
                },
                validation:{
                  
                }
            }
        },
        computed:{
            ...mapState(['currentUser'])
        },
        mounted() {
            
        },
        methods: {
            array_to_bool(array){
                if(array)
                    return !Boolean(array.length)
            },
            setClient(){
                this.clients = JSON.parse(JSON.stringify({
                    ...this.client,
                    cli_phone:this.client.cli_phone?this.client.cli_phone.split(','):[]
                }))
            },
            validate(bvModalEvt) {
                bvModalEvt.preventDefault()
                // this.handleSubmit()
                    delete this.clients.ID;
                    axios.patch(`cors/clients/${this.client.ID}`,{
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