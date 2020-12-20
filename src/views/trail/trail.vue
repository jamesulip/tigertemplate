<template>

  <div class="row mt-3">
    <!-- <div class="col-md-3">
          <a href="compose.html" class="btn btn-primary btn-block mb-3">Compose</a>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Folders</h3>

              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div class="card-body p-0">
              <ul class="nav nav-pills flex-column">
                <li class="nav-item active">
                  <a href="#" class="nav-link">
                    <i class="fas fa-inbox"></i> Inbox
                    <span class="badge bg-primary float-right">12</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="far fa-envelope"></i> Sent
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="far fa-file-alt"></i> Drafts
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="fas fa-filter"></i> Junk
                    <span class="badge bg-warning float-right">65</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="far fa-trash-alt"></i> Trash
                  </a>
                </li>
              </ul>
            </div>
         
          </div>
          
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Labels</h3>

              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <div class="card-body p-0">
              <ul class="nav nav-pills flex-column">
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="far fa-circle text-danger"></i>
                    Important
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="far fa-circle text-warning"></i> Promotions
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="far fa-circle text-primary"></i>
                    Social
                  </a>
                </li>
              </ul>
            </div>
           
          </div>
          
        </div> -->
    <!-- /.col -->
    <div class="col-md-12">
      <div class="card card-primary card-outline">
        <div class="card-header">
          <h3 class="card-title">Inbox</h3>

          <div class="card-tools">
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" placeholder="Search Mail">
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
        <div class="card-body p-0">
          <div class="mailbox-controls">
            <!-- Check all button -->
            <button type="button" class="btn btn-default btn-sm checkbox-toggle"><i class="far fa-square"></i>
            </button>
            <div class="btn-group">
              <button type="button" class="btn btn-default btn-sm"><i class="far fa-trash-alt"></i></button>
              <button type="button" class="btn btn-default btn-sm"><i class="fas fa-reply"></i></button>
              <button type="button" class="btn btn-default btn-sm"><i class="fas fa-share"></i></button>
            </div>
            <!-- /.btn-group -->
            <button type="button" class="btn btn-default btn-sm"><i class="fas fa-sync-alt"></i></button>
            <div class="float-right">
              1-50/200
              <div class="btn-group">
                <button type="button" class="btn btn-default btn-sm"><i class="fas fa-chevron-left"></i></button>
                <button type="button" class="btn btn-default btn-sm"><i class="fas fa-chevron-right"></i></button>
              </div>
              <!-- /.btn-group -->
            </div>
            <!-- /.float-right -->
          </div>
          <div class="table-responsive mailbox-messages">
            <table class="table table-hover table-sm  table-striped">
              <tbody>
                <template v-for="(trail, index) in page.data">
                  <tr :key="index" role="button" @click="openTrail(trail)">
                    <td>
                      <div class="icheck-primary">
                        <input type="checkbox" value="" id="check1">
                        <label for="check1"></label>
                      </div>
                    </td>
                    <td class="mailbox-star"><a href="#"></a>
                    </td>
                    <!-- <td class="mailbox-name">
                      <div v-if="Boolean(trail.email.lastcomment2.length)" class="">
                        <b-avatar-group size="sm">
                          <div>
                            <div class="d-inline">
                              <b-avatar class="float-left" size="sm"></b-avatar>
                            </div>
                            <div class="d-inline">
                              <b-badge v-for="(item, index) in noDulp(trail.email.lastcomment2)" :key="index" href="#"
                                class="mr-1 item-avatar" variant="primary">
                                {{item.name}}</b-badge>
                            </div>
                          </div>

                        </b-avatar-group>
                      </div>
                      <div v-else>

                        <div>
                          <div class="d-inline">
                            <b-avatar class="float-left" size="sm"></b-avatar>
                          </div>
                          <div class="d-inline">
                            <b-badge href="#" class="mr-1 item-avatar" variant="primary">
                              {{trail.from.name}}</b-badge>
                          </div>
                        </div>
                      </div>
                    </td> -->
                    <td class="mailbox-name">
                        <span class="badge badge-secondary mx-1" v-for="(item, index) in trail.project" :key="index">{{item.TYPE}}#{{item.NUM}}</span>
                    </td>
                    <td class="mailbox-subject">
                      <div class="col-md-12">
                        <div class="d-flex content-subject">
                          <div class="m-title col-md-3">
                            <b>{{trail.email.title}}</b>
                          </div>
                          <div class="col-md-9 m-content">
                          <span>
                            -
                            {{strippedContent(trail.email.lastcomment2,'contents') || trail.from.name}}

                          </span>
                          </div>
                        </div>
                      </div>

                    </td>
                    <td class="mailbox-attachment"></td>
                    <td class="mailbox-date">5 mins ago</td>
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
          <div class="mailbox-controls">
            <!-- Check all button -->
            <button type="button" class="btn btn-default btn-sm checkbox-toggle"><i class="far fa-square"></i>
            </button>
            <div class="btn-group">
              <button type="button" class="btn btn-default btn-sm"><i class="far fa-trash-alt"></i></button>
              <button type="button" class="btn btn-default btn-sm"><i class="fas fa-reply"></i></button>
              <button type="button" class="btn btn-default btn-sm"><i class="fas fa-share"></i></button>
            </div>
            <!-- /.btn-group -->
            <button type="button" class="btn btn-default btn-sm"><i class="fas fa-sync-alt"></i></button>
            <div class="float-right">
              1-50/200
              <div class="btn-group">
                <button type="button" class="btn btn-default btn-sm"><i class="fas fa-chevron-left"></i></button>
                <button type="button" class="btn btn-default btn-sm"><i class="fas fa-chevron-right"></i></button>
              </div>
              <!-- /.btn-group -->
            </div>
            <!-- /.float-right -->
          </div>
        </div>
      </div>
      <!-- /.card -->
    </div>
    <!-- /.col -->
  </div>

</template>
<style scoped>
  .m-content{
        overflow: hidden;
      max-width: 800px;
      white-space: nowrap;
      text-overflow: ellipsis;
  }
  .mailbox-date {
    width: 1%;
    white-space: nowrap;
  }
  .content-subject{
    font-size: .875rem;
  }
  .item-avatar {
    margin: -6px;
    padding-left: 10px;
  }
</style>
<script>
  /* eslint-disable */
  export default {
    data() {
      return {
        page: {

        }
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
      openTrail(){
        
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