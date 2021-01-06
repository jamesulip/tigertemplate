<template>
  <div>
    <b-overlay :show="loading" rounded="sm" :opacity=".5">
      <template #overlay>
        <div class="text-center" style="margin-top:60vh">
          <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
          <p id="cancel-label">Loading...</p>

        </div>
      </template>
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mt-2">
            <div class="col-sm-6 p-0 back-button">
              <b-button @click="$router.push({name:'clients'})" pill variant="link" class="btn-flat" size="md">
                <b-icon-arrow-left></b-icon-arrow-left>
              </b-button>
              <h1> {{company_info.com_name|| 'Loading.'}}</h1>
            </div>
          </div>
        </div>
      </section>


      <div class="container-fluid ">
        <div class="card">
          <div class="card-header border-0">
            <h3 class="card-title">Company Information</h3>

          </div>
          <div class="card-body p-0">
            <div class="col-12 col-md-12 col-lg-12 ">
              <div class="row">
                <div class="col-md-6 border-right">
                  <h4>Contacts</h4>
                  <add_contact ref="add_contact" @contact_added="getContacts()"/>
                  <table class="table table-hover table-lg mt-3">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Tel</th>
                        <th style="min-width:100px;whitespace:nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="con in contacts" :key="con.ID">
                        <td>{{con.cli_name}}</td>
                        <td>
                          <div class="row">
                          <div class="col-md-10 text-truncate">{{con.cli_phone}}</div>
                          <a class="col-md-2" :href="`viber://chat?number=${con.cli_phone}`"><i class="fab fa-viber"></i></a>
                          <!-- <a class="col-md-3" :href="`viber://chat?number=${con.cli_phone}`"><i class="fab fa-viber"></i></a> -->
                          </div>
                        </td>
                        <td>{{con.cli_tel}}</td>
                        <td>
                          <b-button-group size="sm">
                            <b-button variant="danger" @click="confirm_delete(con.ID)"><b-icon-trash></b-icon-trash></b-button>
                            <!-- <b-button variant="info"><b-icon-pencil></b-icon-pencil></b-button> -->
                            <edit_contact :client="con"  @contact_added="getContacts()"/>
                          </b-button-group>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-md-6">
                  <h4>Projects</h4>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="info-box bg-light">
                        <div class="info-box-content">
                          <span class="info-box-text text-center text-muted">Estimated budget</span>
                          <span class="info-box-number text-center text-muted mb-0">2300</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table class="table table-hover table-sm">
                    <thead>
                      <tr>
                        <th>Number</th>
                        <th>Project Name</th>
                        <th>Media</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(who) in projects" v-show="Boolean(who.project.length)">
                        <tr scope="row" :key="who.ID" class="table-active">
                          <td colspan="5">{{who.ProjectName}}</td>
                        </tr>
                        <template v-if="Boolean(who.project.length)">
                          <tr v-for="pro in who.project" :key="pro.ID">
                            <td>{{pro.TYPE}}#{{pro.NUM}}</td>
                            <td>{{pro.detail.s_projname}}</td>
                            <td>{{pro.detail.s_media}}</td>
                            <td>3</td>
                            <td>3</td>
                          </tr>
                        </template>
                        <tr :key="`${who.ID}row`" v-else>
                          <td colspan="5">No project</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>
<script>
  /* eslint-disable*/
  import add_contact from './add_contact'
  import edit_contact from './edit_contact'
  export default {
    components:{
      add_contact,edit_contact
    },
    data() {
      return {
        company_info: {},
        projects: [],
        contacts: [],
        loading: true
      }
    },
    mounted() {
      axios.all([this.loadCompany(this.$route.params.id), this.loadProjects(), this.getContacts()])
        .then(axios.spread((res1, res2, res3) => {
          this.company_info = res1.data
          this.projects = res2.data
          this.loading = false

          if(this.$route.query.add_cont){
            this.$refs.add_contact.add_contact_modal=true
          }
        }))
    },
    methods: {
      loadCompany(id) {
        return axios.get(`cors/companies/${id}`)
      },
      loadProjects() {
        return axios.get(`cors/companies/${this.$route.params.id}/projects`)
      },
      getContacts() {
        return axios.get(`cors/companies/${this.$route.params.id}/contacts`).then(x=>{
          this.contacts = x.data
          return x 
        })

      },
      confirm_delete(id){

       this.$bvModal.msgBoxConfirm('Please confirm that you want to delete.', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if(value){
               axios.delete(`cors/clients/${id}`)
            .then(res => {
              // console.log(res)
              this.getContacts()
            })
            .catch(err => {
              console.error(err); 
            })
            }
          })
          .catch(err => {
            // An error occurred
          })
      


        
      }

    },
  }
</script>