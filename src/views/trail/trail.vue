<template>
  <div class="content pt-4 p-0 ">
    <div class="col-md-12">
      <div class="card ">
        <div class="card-header">
          <h3 class="card-title">Trail</h3>

          <div class="card-tools">
            <div class="input-group input-group-sm">
              <input v-model="search" @change="pageChange('search')" type="text" class="form-control" placeholder="Search Mail" />
              <div class="input-group-append">
                <div class="btn btn-primary">
                  <i class="fas fa-search"></i>
                </div>
              </div>
            </div>
          </div>
          <!-- /.card-tools -->
        </div>
        <!-- /.card-header -->
        <div class="card-body p-1">
          <trail-control v-model="page" @pageChange="x=>pageChange(x)" :loading="loading"/>
          <div class="table-responsive">

            <div class="col-md-12 d-flex justify-content-center " v-if="page.data && !Boolean(page.data.length)">
              <div class="col-md-12 rounded border m-3   p-4 text-muted d-flex d-flex flex-column">
                <div class="text-center">
                  <b-icon-envelope class="h1"></b-icon-envelope>
                </div>
                <div class="text-center">
                  <span>No Trail</span>
                </div>

              </div>
            </div>
            <table v-else class="table table-hover table-md  table-striped" style="table-layout:fixed">
              <thead>
                <tr>
                  <th style="width:60px"></th>
                  <th style="width:60px"></th>
                  <th style="width:250px;max-width:400px"></th>
                  <th></th>
                  <th style="width:60px"></th>
                  <th style="width:100px"></th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(trail, index) in page.data">
                  <tr :key="index" role="button" @click="openTrail(trail)" v-if="page.data">
                    <td>
                      <div class="icheck-primary">
                        <input type="checkbox" value="" id="check1" />
                        <label for="check1"></label>
                      </div>
                    </td>
                    <td class="mailbox-star"><a href="#"></a></td>
                    <td class="mailbox-name  text-truncate">
                      <span class="badge badge-secondary mx-1 " v-for="(item, index) in trail.project"
                        :key="index">{{ item.TYPE }}#{{ item.NUM }}</span>
                    </td>
                    <td class="mailbox-subject">
                      <div class="col-md-12">
                        <div class="d-flex content-subject text-truncate">

                          <b class="text-truncate">{{ trail.email.title }}</b>
                          <span class="text-truncate">
                            -
                            {{
                                strippedContent(
                                  trail.email.lastcomment2,
                                  "contents"
                                ) || trail.from.name
                              }}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="mailbox-attachment"></td>
                    <td class="mailbox-date text-sm text-muted">
                      <div class="text-truncate"><span>
                          {{trail.updated_at |formatDate('ago')}}</span></div>
                    </td>
                  </tr>

                </template>


              </tbody>
            </table>

            <!-- /.table -->
          </div>
          <!-- /.mail-box-messages -->
        </div>
        <!-- /.card-body -->
        <div class="card-footer p-0">
           <!-- <trail-control/> -->
        </div>
      </div>
      <!-- /.card -->
    </div>
    <!-- /.col -->
  </div>
</template>
<style scoped>
  .m-content {
    overflow: hidden;
    max-width: 800px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .mailbox-date {
    width: 1%;
    white-space: nowrap;
  }

  .content-subject {
    font-size: 0.875rem;
  }

  .item-avatar {
    margin: -6px;
    padding-left: 10px;
  }
</style>
<script>
  /* eslint-disable */
  import trailControl from './trail-control'
  export default {
    data() {
      return {
        page: {

        },
        loading:false,
        search:null,
        current_url:''
      }
    },


    components:{
      trailControl
    },
    mounted() {
      axios.post(`cors/notifications2`)
        .then(res => {
          this.page = res.data
        })
        .catch(err => {

        })
    },
    methods: {
      pageChange(url){
          this.loading = true
            if(url =='refresh')
              url = this.current_url
            else if(url=='search')
              url = this.page.path


            this.current_url =url


            axios.post(url,{
              search:this.search
            })
        
            .then(res => {
                this.page = res.data
                this.loading = false
            })
            .catch(err => {
                this.loading = false
          })


      },
      openTrail(trail) {
        this.$router.push({
          name: 'view_trail',
          params: {
            'id': trail.email.id
          }
        })
      },
      noDulp(text) {
        var names = text.map(function (elem) {
          if (elem.userl)
            return elem.userl
        })
        return names.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
      },
      strippedContent(array, type) {


        var text = array.map(function (elem) {
          if (type == 'names') {
            return elem.userl.name.substring(0, 6);
          } else if (type == 'contents')
            return elem.content;
        })

        var uniqueArray = text.filter(function (item, pos) {
          return text.indexOf(item) == pos;
        })




        let regex = /(<([^>]+)>)/ig;
        try {
          return uniqueArray.join(',').replace(regex, "");
        } catch (error) {
          return ""
        }

      },
    },
  }
</script>