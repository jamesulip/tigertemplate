<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-lg-9 col-xl-9">
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
                  <li class="list-group-item" v-for="i in 20" :key="i">
                    <!-- <div class="media">
                      <div class="list-group-flush mr-2">
                        <b-avatar class="avatar" size="md"></b-avatar>
                      </div>
                      <div class="media-body">
                        <div>
                          <span class="h6 mr-1">Claire</span>
                          <span  class="text-muted">completed the task</span><a href="#"
                           class="A-filter-by-text">Set up client chat channel</a>
  <span data-filter-by="text" class="SPAN-filter-by-text">4 days ago</span>
                            <div class="trail-body">
                              asdasd <br>
                              asdasd <br>
                              asdasd <br>
                              asdasd <br>
                              asdasd <br>
                              asdasd <br>
                              asdasd <br>
                              asdasd <br>
                              asdasd <br>
                              asdasd <br>
                            </div>
                        </div>
                       
                      </div>
                    </div> -->
                    <div class="media">
                      <b-avatar class="avatar mr-2" size="md"></b-avatar>

                      <div class="media-body">
                        <div class="media-title" style="">
                          <span class="h6 mr-1">Claire</span>
                          <span class="float-right text-muted text-xs">
                            1 few min ago
                          </span>
                        </div>
                        <div class="messge-body" style="font-size: .875rem;line-height: 1.3125rem;">
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras
                        purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
                        vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                      </div>
                    </div>
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