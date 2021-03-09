<template>
  <b-modal
    :title="`Start Project`"
    @ok="save()"
    @close="$emit('input', false)"
    @show="show()"
    size="lg"
    v-model="value_modal"
    header-class="bg-success disabled"
    button-size="sm"
  >
    <b-overlay :show="loading" style="min-height:200px">
      <template v-if="'files' in files && files.files.length < 1">
        <div class="clearfix">
          <div class="col-md-12 bg-red-100">
            <small style="padding-top:20px;text-align: center;" class="col-md-12">
              No Files in folder <b>{{ files.dir }}</b>
            </small>
          </div>
        </div>
      </template>

      <template v-for="(group, key) in files_grouped" v-else>
        <table
          class="table table-sm table-hover table-condensed table-striped"
          :key="key"
        >
          <thead>
            <tr>
              <th colspan="5">
                {{ group.length }}
                <span class="text-uppercase">{{ key }}</span> Files
              </th>
            </tr>
            <tr>
              <th style="white-space:nowrap">Filename</th>
              <th>Width</th>
              <th>Height</th>
              <th>UoM</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in group" :key="index">
              <td>
                <input
                  class="form-control "
                  type="text"
                  name=""
                  v-model="item.name"
                />
              </td>
              <td>
                <input
                  class="form-control "
                  type="text"
                  name=""
                  v-model="item.info.Width"
                />
              </td>
              <td>
                <input
                  class="form-control "
                  type="text"
                  name=""
                  v-model="item.info.Height"
                />
              </td>
              <td>
                <input
                  class="form-control "
                  type="text"
                  name=""
                  v-model="item.info.uom"
                />
              </td>
              <td>
                <input
                  class="form-control "
                  :min="1"
                  type="number"
                  name=""
                  v-model="item.qty"
                />
              </td>
              <td>
                <b-button
                  size="xs"
                  :disabled="item.loading"
                  @click="load(item)"
                >
                  <i
                    v-if="!item.loading"
                    class="fas fa-ruler"
                    aria-hidden="true"
                  ></i>
                  <i
                    v-else
                    class="fas fa-circle-notch fa-spin"
                    aria-hidden="true"
                  ></i>
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </b-overlay>
  </b-modal>
</template>
<script>
/* eslint-disable */
    import { mapGetters } from 'vuex'
    export default {
        props: ['value'],
        data() {
            return {
                files: {},
                open: false,
                loading:true
            }
        },
        computed: {
          ...mapGetters([
              'getSelected_project',
            ]),
            value_modal:{
                get(){
                return this.value
                },
                set(val){
                this.$emit('input', val)
                }
            },
            files_grouped() {
                let group = {}
                try {
                    group = this.files.files.reduce((r, a) => {
                        r[a.root] = [...r[a.root] || [], a];
                        return r;
                    }, {});

                } catch (error) {}

                return group
            }
        },
        methods: {
            save() {
                this.loading= true
                var proj = this.getSelected_project
                axios.post('cors/insertTally', {
                    projectID: proj.project.DETAILID,
                    tally: this.files.files
                    
                }).then(x=>{
                    this.loading= false
                    this.$emit('sent',x)
                })
                
            },
            show() {
                this.loading = true
                var proj = this.getSelected_project
                axios.get(`cors/filesList2/${proj.project.DETAILID}`)
                    .then(res => {
                        this.files = res.data
                        this.loading = false
                    })
                    .catch(err => {
                        console.error(err);
                         this.loading = false
                    })
            },
            load($s) {
                // alert($s);
                $s.loading = true
                this.$forceUpdate();
                axios.post(`/get_gerometry`, {
                        folder: $s.file
                    })
                    .then(res => {
                        console.log(res)
                        $s.info = res.data
                        $s.loading = false
                        this.$forceUpdate();
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
        },
        mounted() {
            this.open = this.value
        },
    }
</script>