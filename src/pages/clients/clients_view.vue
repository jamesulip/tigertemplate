<template>
  <div class="container-fluid">
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
            <div class="col-sm-12 p-0 back-button">
              <b-button @click="$router.push({name:'clients'})" pill variant="link" class="btn-flat" size="md">
                <b-icon-arrow-left></b-icon-arrow-left>
              </b-button>
              <h1> {{company_info.com_name|| 'Loading.'}}</h1>
            </div>
          </div>
        </div>
      </section>
      <div>
          <b-tabs pills card>
            <b-tab title="Contacts" active>
              <b-card-body>
                <add_contact ref="add_contact" @contact_added="getContacts()" />
                <contacts @confirm_delete="x=>{confirm_delete(x)}"  @contact_added="getContacts()"  v-model="contacts" class="mt-3"/>
              </b-card-body>
            </b-tab>
            <b-tab title="Projects">
              <b-card-body class="p-0">
                <client_projects v-model="projects"/>
              </b-card-body>
            </b-tab>
          </b-tabs>
      </div>
    </b-overlay>
  </div>
</template>
<script>
  /* eslint-disable*/
  import add_contact from './add_contact'
  import contacts from './contacts.vue'
  import client_projects from './client_projects.vue'
  export default {
    components: {
      add_contact,
      contacts,
      client_projects
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

          if (this.$route.query.add_cont) {
            this.$refs.add_contact.add_contact_modal = true
          }
        }))
    },
    methods: {
      loadCompany(id) {
        return axios.get(`cors/companies/${id}`)
      },
      loadProjects() {
        return axios.get(`cors/companies/${this.$route.params.id}/projects_all`)
      },
      getContacts() {
        return axios.get(`cors/companies/${this.$route.params.id}/contacts`).then(x => {
          this.contacts = x.data
          return x
        })

      },
      confirm_delete(id) {

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
            if (value) {
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