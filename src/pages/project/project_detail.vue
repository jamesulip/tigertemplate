<template>
  <div>
    <b-overlay v-if="loading" variant="outline-danger" size="sm" show style="min-height:200px" />

    <div class="flex" v-if="projectDetails">

      <div class="w-4/6">
        <div class=" py-3  px-3 border-b border-solid w-full">
          <h3 class="text-lg leading-6 font-medium text-gray-900 uppercase">
            {{projectDetails.project.TYPE}}#{{projectDetails.project.NUM}}-{{projectDetails.details.client2.com_name.toLowerCase()}}-{{projectDetails.details.s_projname.toLowerCase()}}
          </h3>
        </div>
        <div class="px-3 pt-2">
          <h3 class="text-md leading-6 text-gray-500 font-medium" id="modal-headline">
            Project Summary
          </h3>
          <div class="row mt-3">

            <div class="col-md-6 pb-3">
              <div class="text-md flex">
                <div class="w-6 h-6 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <label for="comments" class="mb-0 font-medium text-gray-700">Date Created</label>
                  <p class="text-gray-500 capitalize">
                    {{ projectDetails.project.created_at | formatDate('LL') }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 pb-3">
              <div class="text-md flex">
                <b-avatar :src="`${serUrl}${projectDetails.project.sales_exec_auth.img}`" class="w-6 h-6 mr-1"></b-avatar>
                <div>
                  <label for="comments" class="mb-0 font-medium text-gray-700">Account Exec</label>
                  <p class="text-gray-500 capitalize">
                    {{ projectDetails.project.sales_exec.fname.toLowerCase() }}
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-6 pb-3">
              <div class="text-md flex">
                <div class="w-6 h-6 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <label for="comments" class="mb-0 font-medium text-gray-700">Project Name</label>
                  <p class="text-gray-500 capitalize">
                    {{ projectDetails.details.s_projname.toLowerCase() }}
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-6 pb-3">
              <div class="text-md flex">
                <div class="w-6 h-6 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <label for="comments" class="mb-0 font-medium text-gray-700">Client Name</label>
                  <p class="text-gray-500 capitalize">
                    {{ projectDetails.details.client2.com_name.toLowerCase() }}
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-6 pb-3">
              <div class="text-md flex">
                <div class="w-6 h-6 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div>
                  <label for="comments" class="mb-0 font-medium text-gray-700">Media</label>
                  <p class="text-gray-500 capitalize">
                    {{ projectDetails.details.s_media }}
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-6 pb-3">
              <div class="text-md flex">
                <div class="w-6 h-6 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div>
                  <label for="comments" class="mb-0 font-medium text-gray-700">Scope</label>
                  <div class="text-gray-500 capitalize">
                    <dd v-if="Boolean(projectDetails.finishers)">
                      <span class="badge badge-info">{{projectDetails.finishers[projectDetails.finishers.length - 1].FINISHING
                          }}</span>
                    </dd>
                    <dd v-else>
                      {{projectDetails.project.finishers[projectDetails.project.finishers.length - 1].FINISHING}}
                    </dd>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <table class="table table-striped mt-5">
            <thead>
              <tr>
                <td>Source</td>
                <td>Width</td>
                <td>Height</td>
                <td>UoM</td>
                <td>Quantity</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i,ind) in projectDetails.items" :key="`item-${ind}`">
                <td>{{i.source}}</td>
                <td>{{i.w}}</td>
                <td>{{i.h}}</td>
                <td>{{i.uom}}</td>
                <td>{{i.qty}}</td>
              </tr>
            </tbody>
            <tbody v-if="!Boolean(projectDetails.items.length)">
              <tr>
                <td colspan="5">
                  <div class="flex flex-col items-center">
                    <div class="w-20 h-20 text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <span>
                      No Item
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="w-2/6 bg-gray-100 py-3 px-3 rounded-tr-lg">
        <fieldset>
          <legend class="text-base font-medium text-gray-900">Finishers Instructions</legend>
          <div class="mt-3 space-y-4">
            <template v-for="(item, index) in projectDetails.project.finishers || projectDetails.finishers">
              <div :key="index">
                <label for="comments" class="text-sm text-gray-600">{{item.FINISHING}}</label>
                <b-icon icon="circle-fill" :class="item.Status | status_col" class="text-xs ml-2"></b-icon>

                <div class="flex items-start bg-white p-2 rounded-md">
                  <div class="ml-1 text-sm">
                    <div class="text-gray-500" v-html="item.DETAILS || 'N/A'"></div>
                  </div>
                </div>
              </div>
            </template>

          </div>
        </fieldset>

      </div>
    
    </div>
      <div class="w-full border-t">
        <div class="py-2 px-3 clearfix">
          
          <slot name="footer">

          </slot>
          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  /* eslint-disable */
  export default {
    props: ['project', 'load', 'project_id'],
    data() {
      return {
        projectDetails: null,
        loading: true
      }
    },
    mounted() {
      if (!this.load && this.project) {
        this.projectDetails = this.project
        this.loading = false
      } else
        this.load_details(this.project_id)
    },
    computed:{
      ...mapState(['serUrl'])
    },
    methods: {
      load_details(id) {
        this.loading = true
        axios.get(`cors/projectDetail/${this.project_id}`)
          .then(res => {
            this.projectDetails = res.data
            this.loading = false
          })
          .catch(err => {
            console.error(err);
          })

      }
    }
  }
</script>