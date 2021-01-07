<template>
<div class="card m-0 px-4 py-4 border-0" style="background:#dee2e6">
    <div class="row">
        <div class="col-md-6 col-sm-12 col-lg-4 d-flex align-items-stretch" v-for="con in value" :key="con.ID">
            <div class="card bg-light" style="width: 100%;">
                <div class="card-header text-muted border-bottom-0">
                  <div>  <span ><i class="fas fa-lg fa-at"></i></span>
                    {{con.cli_Email}}
                    </div>
                </div>
                <div class="card-body pt-0">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="lead"><b>{{con.cli_name}}</b></h2>
                                <span class="small d-block"> {{con.cli_Position}}</span>
                                <span class="small d-block"><i class="fa fa-phone" aria-hidden="true"></i>
                                    {{con.cli_phone}}
                                </span>
                            
                        </div>
                        <!-- <div class="col-5 text-center">
                            <img src="../../dist/img/user1-128x128.jpg" alt="user-avatar" class="img-circle img-fluid"> 
                            <b-avatar style="width:6rem;height:6rem"></b-avatar>
                        </div> -->
                    </div>
                </div>
                <div class="card-footer">
                    <div class="float">
                        <b-button-group size="sm">
                            <b-button variant="danger" @click="$emit('confirm_delete',con.ID)">
                              <b-icon-trash></b-icon-trash>
                            </b-button>
                            <edit_contact :client="con" @contact_added="$emit('contact_added')" />
                        </b-button-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
 import edit_contact from './edit_contact'
    export default {
        components:{
             edit_contact
        },
        props: ['value'],
        mounted() {

        },
    }
</script>