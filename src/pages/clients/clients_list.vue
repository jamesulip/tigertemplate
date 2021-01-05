<template>
  <div class="container-fluid ">

    <section class="content-header">

      <div class="row mt-2">
        <div class="col-sm-6 p-0 back-button">
          <b-button pill variant="link" class="btn-flat" size="md">
            <b-icon-arrow-left></b-icon-arrow-left>
          </b-button>
          <h1> Clients</h1>
        </div>
        <div class="col-md-6">
          <div class="float-right">
              <client_add/>
          </div>
        </div>
      </div>
    </section>

    <div class="card">
      <div class="card-header border-0">
        <h3 class="card-title">Products</h3>
        <div class="card-tools">
          <div class="input-group input-group-sm" style="width: 250px;">
            <input type="text" @change="search()" v-model.lazy="search_q.com_name" name="table_search"
              class="form-control float-right" placeholder="Search">

            <div class="input-group-append">
              <button type="submit" @click="search()" class="btn btn-default"><i class="fas fa-search"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body p-0">



        <table class="table table-striped table-valign-middle table-lg">
          <thead>
            <tr>
              <th>Company Name</th>
              <th style="width:100px;whitespace:wrap">Projects</th>
              <th style="width:100px;whitespace:wrap">Contacts</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody v-if="!loading">
            <tr v-for="com in companies.data" :key="com.ID"
              @click="$router.push({ name: 'client_view', params: { id: com.ID }})" role="button">
              <td>
                {{ com.com_name }}
              </td>
              <td><span class="badge badge-info">{{com.projects_count}}</span></td>
              <td>
                <span class="badge badge-info"> {{ com.contacts_count }}</span>
              </td>
              <td style="width:50px">
                <div class="text-truncate">
                  {{ com.com_address }}
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <div class="col-md-12 text-center">
                  <h3 class="text-muted h5">
                    Nothing Found
                  </h3>

                  We couldn't find any matches for "{{search_q.com_name}}" Try checking for typos or using complete
                  words.
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <b-skeleton-table v-if="loading" :rows="5" :columns="4" :table-props="{  striped: true }"></b-skeleton-table>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  table,
  td,
  th {
    border-collapse: collapse;
    table-layout: fixed;
  }
</style>
<script>
import client_add from './client_add.vue'
  /* eslint-disable  */
  export default {
    components:{
      client_add
    },
    data() {
      return {
        companies: {},
        search_q: {
          com_name: null
        },
        loading: true
      }
    },
    mounted() {
      this.search()
    },
    methods: {
      search() {
        this.loading = true
        axios.post(`cors/companiespage`, {
            page_limit: 50,
            ...this.search_q
          })
          .then(res => {
            this.loading = false
            this.companies = res.data
          })
          .catch(err => {
            console.error(err);
          })
      }
    },
  }
</script>