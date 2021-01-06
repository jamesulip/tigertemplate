<template>
    <div>
        <b-button pill @click="add_client=true" variant="info"><span>
                <b-icon-plus size="lg"></b-icon-plus>Add Client
            </span></b-button>
          
        <b-modal :title="`Add Client`" v-model="add_client" size="md" @ok="validate_client">
            <b-overlay  :show="loading">
            <div class="add_client_label">

                <b-form>
                    <b-form-group :state="array_to_bool(errors.com_name)" id="fieldset-horizontal" label-cols-sm="4" label-cols-lg="4" content-cols-sm
                        content-cols-lg="7" description="." label="Client Name" label-for="input-horizontal">
                        <b-form-input :state="array_to_bool(errors.com_name)" v-model="client.com_name" placeholder="Client Name"></b-form-input>
                    </b-form-group>
                </b-form>

                <b-form>
                    <b-form-group id="fieldset-horizontal" label-cols-sm="4" label-cols-lg="4" content-cols-sm
                        content-cols-lg="7" description="." label="Address" label-for="input-horizontal">
                        <b-form-textarea v-model="client.com_address" placeholder="Address"></b-form-textarea>
                    </b-form-group>
                </b-form>



                <div class="clearfix">
                    <hr>
                </div>
                <b-form>
                    <b-form-group :state="array_to_bool(errors.com_cathegory)" id="fieldset-horizontal" label-cols-sm="4" label-cols-lg="4" content-cols-sm
                        content-cols-lg="7" label="Category" label-for="input-horizontal">
                        <b-form-radio-group :state="array_to_bool(errors.com_cathegory)" v-model="client.com_cathegory" class="mt-2"
                            :options="['Business','Personal']"  name="plain-inline"
                            plain></b-form-radio-group>
                            <b-form-invalid-feedback :state="array_to_bool(errors.com_cathegory)">Please select one</b-form-invalid-feedback>
                    </b-form-group>
                </b-form>

                <b-form>
                    <b-form-group id="fieldset-horizontal" :state="array_to_bool(errors.com_vat)" label-cols-sm="4" label-cols-lg="4" content-cols-sm
                        content-cols-lg="7" label="Vat" label-for="input-horizontal">
                        <b-form-radio-group :state="array_to_bool(errors.com_vat)" class="mt-2" :options="[{
                            text:'Vatable',
                            value:1
                        },{
                            text:'Vat ex',
                            value:0
                        }]"  v-model="client.com_vat" name="plain-inline" plain>
                        </b-form-radio-group>
                          <b-form-invalid-feedback :state="array_to_bool(errors.com_vat)">Please select one</b-form-invalid-feedback>
                    </b-form-group>
                </b-form>
                <div class="clearfix">
                    <hr>
                </div>

                <b-form>
                    <b-form-group id="fieldset-horizontal" label-cols-sm="4" label-cols-lg="4" content-cols-sm
                        content-cols-lg="7" description="." label="Notes" label-for="input-horizontal">
                        <b-form-textarea placeholder="Notes" v-model="client.notes"> </b-form-textarea>
                    </b-form-group>
                </b-form>
            </div>
            </b-overlay>
        </b-modal>
    </div>
</template>
<script>
  /* eslint-disable*/
    export default {
        data() {
            return {
                add_client: false,
                client: {
                    com_address: null,
                    com_cathegory: null,
                    com_industry: null,
                    com_name: null,
                    com_products: null,
                    com_vat: null,
                    companycol: null,
                    contacts_count: 1,
                    notes: null,
                    salesExec: this.$store.getters.currentUser.id,
                },
                errors:{},
                loading:false
            }
        },
        methods: {
            array_to_bool(array){
                if(array)
                    return !Boolean(array.length)
            },
            validate_client(bvModalEvt) {
                this.loading = true
                bvModalEvt.preventDefault()
                this.errors = {}
                axios.post(`cors/companies`,this.client)
                .then(res => {
                    // console.log(res)
                    this.loading = false

                    this.continue_or_create(res.data)

                    


                })
                .catch(err => {
                    console.error(err.response.data); 
                    this.errors = err.response.data.errors
                    this.loading = false
                })
            },
            continue_or_create(res){
                this.$bvModal.msgBoxConfirm('Client Successfully added', {
                title: 'Success',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'info',
                okTitle: 'Add Contact',
                cancelTitle: 'Okay',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
                })
                .then(value => {
                    if(value)
                        this.$router.push({name:'client_view',params:{id:res.ID},query:{add_cont:true}})
                    else
                        this.add_client = false
                })
                .catch(err => {
                    // An error occurred
                })
            }
        },
    }
</script>