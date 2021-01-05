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
            <h3 class="card-title">Products</h3>

          </div>
          <div class="card-body p-0">
            <div class="col-12 col-md-12 col-lg-8 order-2 order-md-1">
              <div class="row">
                  <div class="col-md-6">
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
                      <h4>Recent Activity</h4>
                  </div>
                  <div class="col-md-6">
                    
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
  export default {
    data() {
      return {
        company_info: {},
        loading: true
      }
    },
    mounted() {
      this.loadCompany(this.$route.params.id)
    },
    methods: {
      loadCompany(id) {

        axios.get(`cors/companies/${id}`).then(x => {
          this.company_info = x.data
        }).then(x => {
          this.loading = false
        })
      }
    },
  }
</script>