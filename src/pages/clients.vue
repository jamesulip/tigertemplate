<template>
    <div class="container pt-3">
       <div class="card">
              <div class="card-header border-0">
                <h3 class="card-title">Products</h3>
                <div class="card-tools">
                  <a href="#" class="btn btn-tool btn-sm">
                    <i class="fas fa-download"></i>
                  </a>
                  <a href="#" class="btn btn-tool btn-sm">
                    <i class="fas fa-bars"></i>
                  </a>
                </div>
              </div>
              <div class="card-body p-0">
                <table class="table table-striped table-valign-middle">
                  <thead>
                  <tr>
                    <th>Company Name</th>
                    <th style="width:1%;whitespace:wrap">Projects</th>
                    <th style="width:1%;whitespace:wrap">Contacts</th>
                    <th >Address</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(com) in companies.data" :key="com.ID" role="button">
                    <td>
                     {{com.com_name}}
                    </td>
                    <td><span class="badge badge-info">20</span></td>
                    <td>
                       <span class="badge badge-info"> {{com.contacts_count}}</span>
                    </td>
                    <td >
                        <div  class="text-truncate">
                      {{com.com_address}}
                      </div>
                    </td>
                  </tr>
                
                  </tbody>
                </table>
              </div>
            </div>
    </div>
</template>
<style lang="scss">
    .table {
        table-layout: fixed;
    }
</style>
<script>
/* eslint-disable  */
export default {
    data() {
        return {
            companies:{}
        }
    },
    mounted() {
        axios.post(`cors/companiespage`,{
            page:50,
        })
        .then(res => {
            this.companies = res.data
        })
        .catch(err => {
            console.error(err); 
        })
    },
}
</script>