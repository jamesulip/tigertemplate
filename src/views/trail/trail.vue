<template>
  <div class="content pt-4 p-0 ">
    <div class="col-md-12">
      <div class="card card-primary card-outline">
        <div class="card-header">
          <h3 class="card-title">Inbox</h3>

          <div class="card-tools">
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" placeholder="Search Mail" />
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
            <button type="button" class="btn btn-default btn-sm checkbox-toggle">
              <i class="far fa-square"></i>
            </button>
            <div class="btn-group">
              <button type="button" class="btn btn-default btn-sm">
                <i class="far fa-trash-alt"></i>
              </button>
              <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-reply"></i>
              </button>
              <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-share"></i>
              </button>
            </div>
            <!-- /.btn-group -->
            <button type="button" class="btn btn-default btn-sm">
              <i class="fas fa-sync-alt"></i>
            </button>
            <div class="float-right">
              1-50/200
              <div class="btn-group">
                <button type="button" class="btn btn-default btn-sm">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button type="button" class="btn btn-default btn-sm">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
              <!-- /.btn-group -->
            </div>
            <!-- /.float-right -->
          </div>
          <div class="table-responsive mailbox-messages">
            <table class="table table-hover table-sm  table-striped" style="table-layout:fixed">
              <thead>
                <tr>
                  <th style="width:60px"></th>
                  <th style="width:60px"></th>
                  <th style="width:auto;max-width:400px"></th>
                  <th></th>
                  <th style="width:60px"></th>
                  <th style="width:100px"></th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(trail, index) in page.data">
                  <tr :key="index" role="button" @click="openTrail(trail)">
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
            <button type="button" class="btn btn-default btn-sm checkbox-toggle">
              <i class="far fa-square"></i>
            </button>
            <div class="btn-group">
              <button type="button" class="btn btn-default btn-sm">
                <i class="far fa-trash-alt"></i>
              </button>
              <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-reply"></i>
              </button>
              <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-share"></i>
              </button>
            </div>
            <!-- /.btn-group -->
            <button type="button" class="btn btn-default btn-sm">
              <i class="fas fa-sync-alt"></i>
            </button>
            <div class="float-right">
              1-50/200
              <div class="btn-group">
                <button type="button" class="btn btn-default btn-sm">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button type="button" class="btn btn-default btn-sm">
                  <i class="fas fa-chevron-right"></i>
                </button>
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
      openTrail(trail) {
          this.$router.push({name:'view_trail',params:{'id':trail.id}})
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