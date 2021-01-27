<template>
  <div class="container pt-3">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12">
        <div class="card">
          <div class="card-header">
            <h4>History</h4>
          </div>
          <div class="card-body px-0">
            <div
              class="table-responsive"
              id="proTeamScroll"
              tabindex="2"
              style="height: 400px; overflow: hidden; outline: none;"
            >
              <table
                class="table table-striped table-sm table-condensed table-hover  "
              >
                <thead>
                  <tr>
                    <th class="pl-2">Type</th>
                    <th>Project Number</th>
                    <th>Version</th>
                    <th>Project Name/Client</th>

                    <th>Date Started</th>
                    <th>Date Finished</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in projects.data"
                    :key="index"
                    role="button"
                    @click="
                      x => {
                        selID = item.detailID;
                        current_project_modal = true;
                      }
                    "
                  >
                    <td class="pl-2">
                      <span class="h3 font-weight-bold m-0">
                        {{ item.project2.TYPE }}</span
                      >
                    </td>
                    <td>{{ item.project2.NUM }}</td>
                    <td>{{ item.project2.VERSION }}</td>
                    <td>
                      <b>{{ item.project2.detail2.s_projname }}</b>
                      <br />
                      {{ item.project2.detail2.client2.com_name }}
                    </td>
                    <td>{{ item.Start | formatDate("Y-M-D hh:m:d A") }}</td>
                    <td>{{ item.Stop | formatDate("Y-M-D hh:m:d A") }}</td>
                    <td>
                      {{ date_duration() }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer align-middle">
            <b-button-toolbar key-nav>
              <b-button-group size="sm" class="mx-1">
                <b-button
                  @click="changePage(projects.prev_page_url)"
                  :disabled="!projects.prev_page_url"
                  variant="info"
                >
                  <b-icon icon="chevron-left"></b-icon
                ></b-button>
              </b-button-group>
              <b-button-group size="sm" class="mx-1">
                <b-button
                  @click="changePage(projects.next_page_url)"
                  :disabled="!projects.next_page_url"
                  variant="info"
                >
                  <b-icon icon="chevron-right"></b-icon
                ></b-button>
              </b-button-group>
            </b-button-toolbar>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      size="lg"
      @shown="loadModal(selID)"
      ok-only
      v-model="current_project_modal"
      content-class="shadow"
    >
      <project_detail ref="detailModal" :project_id="selID" :load="true" />
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
/* eslint-disable */
    export default {
        data() {
            return {
                projects: {},
                current_page: 0,
                current_project_modal:false,
                selID:null
            }
        },
     
        mounted() {
            
            this.changePage(`cors/MyProject/History`)
            
            
        },
        methods: {
            loadModal(id){
              
                this.current_project_modal = true
               this.$refs.detailModal.load_details(id)
            },
            date_duration(){

            },
            changePage(url) {
                axios.get(url)
                .then(res => {
                    this.projects = res.data
                })
                .catch(err => {
                    console.error(err);
                })
            }
        },
    }
</script>
<style scoped>
    .table tbody td{
         font-size: .875rem;
    }
</style>