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
          <trail-control v-model="page" @pageChange="x=>pageChange(x)" :loading="loading">
            <template #mailcontrol>
              
                <button type="button" class="btn btn-link btn-sm checkbox-toggle">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" /></svg>
                </button>


                <div class="btn-group">
                      <button type="button"  class="btn btn-link btn-sm">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" /></svg>
                  </button>



                  
                </div>
           
            </template>
          </trail-control>
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
                
                  <th></th>
                  <th style="width:60px"></th>
             
                  <th style="width:100px"></th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(trail, index) in page.data">
                  <tr :key="index" role="button" v-if="page.data"  @click="openTrail(trail)" :class="{'table-active':trail.selected}">
                    <td   @click.stop="x=>{$forceUpdate()}">
                       <b-form-checkbox
                      v-model="trail.selected"
                   
                      :id="`checkbox-${index}`"
                      :name="`checkbox-${index}`"
                
                      />
                    </td>
                    <td class="mailbox-star" @click.stop="t=>{trail.status2 = !trail.status2;$forceUpdate()}">


                          <b-icon-bell v-if="trail.status2"></b-icon-bell>
                          <b-icon-bell-fill  v-else ></b-icon-bell-fill>
                      <!-- <svg style="width:25px"  v-if="trail.status2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                      
                      <svg style="width:25px"  v-else  className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg> -->

                    </td>
                 
                    <td class="mailbox-subject">
                      <div class="col-md-12">
                        <div class="d-flex content-subject text-truncate">

                          <b>{{ trail.email.title }}</b>
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
                               <span class="badge badge-secondary mx-1 text-truncate" v-for="(item, index) in trail.project"
                        :key="index">{{ item.TYPE }}#{{ item.NUM }}</span>
                      </div>
                    </td>
                    <td class="mailbox-attachment">
                      <b-icon-check2></b-icon-check2>
                    </td>
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
          data:[]
        },
        loading:false,
        search:null,
        current_url:'',
        selected:[]
      }
    },


    components:{
      trailControl
    },
    computed: {
      selected_trail(){
        return this.page.data.filter(x=>x.selected).map(x=>x.id)
      }
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
        axios.post(`/cors/notifications/read/${trail.id}`)
        .then(res => {
         
        })
        
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