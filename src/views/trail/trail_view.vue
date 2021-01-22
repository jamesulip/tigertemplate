<template>
  <div class="container pt-5 pb-5">
    <div class="row justify-content-center">
      <div class="col-lg-12 col-xl-12">
        <div class="page-header">
          <h4>Medium Rare ☕</h4>
          <p class="lead">a</p>
        </div>
        <hr>

        <b-tabs pills fill variant="danger" active-nav-item-class="text-uppercase bg-white text-blue">
          <b-tab title="Test" :title-link-class="``">
            <div class="mt-3">
              <div class="content-list-body">
                <ol class="list-group list-group-flush">
                  <li class="list-group-item" v-for="i in messages" :key="i.id">
                    <div class="media">
                      <b-avatar class="avatar mr-2" size="md"></b-avatar>

                      <div class="media-body">
                        <div class="media-title" style="">
                          <span class="h6 mr-1">Claire</span>
                          <span class="float-right text-muted text-xs">
                            1 few min ago
                          </span>
                        </div>
                        <div class="messge-body" style="font-size: .875rem;line-height: 1.3125rem;" v-html="i.content">

                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item" style="background-color: transparent;">
                      <sendMessage :trailid="$route.params.id"/>
                  </li>
                </ol>
              </div>
            </div>
          </b-tab>
          <b-tab title="Projects">

          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<style lang="scss">


</style>

<script>
  /*eslint-disable*/
  import sendMessage from './sendmessage'
  export default {
    components:{
      sendMessage
    },
    data() {
      return {
        messages: [],
      }
    },
    mounted() {
      this.get_messages()
    },
    methods: {
     
      get_messages() {
        axios.post(`cors/trail/${this.$route.params.id}`)
          .then(res => {
            // console.log(res)
            this.messages = res.data
          })
          .catch(err => {
            console.error(err);
          })
      }
    },
  }
</script>