<template>
    <div>
        <b-tabs card v-model="detail_tab">
            <b-tab active>
                <template #title>
                  Job Order Details  <b-avatar size="26px" variant="light" badge-variant="danger" :badge="`${errors_count.info || 0}`" icon="exclamation-triangle"></b-avatar>
                </template>


                <div class="row">
                    <div class="col-md-12">
                       
                         <b-alert dismissible @dismissed="x=>{show_errors=false,errors={}}" :show="Boolean(Object.keys(errors).length) && show_errors" variant="danger" class="disabled">
                             Cant Proceed {{Object.keys(errors).length}} error<template v-if="Object.keys(errors).length>0">s</template> found
                         </b-alert>
                    </div>
                    <div class="col-md-6">
                        <b-form-group label="Media:" label-for="input-3">
                            <b-form-input :state="array_to_bool(errors['details.s_media'])"
                                v-model="value.details.s_media" />
                        </b-form-group>
                    </div>
                    <div class="col-md-6">
                        <b-form-group label="Project Type:" label-for="input-1">
                            <v-select :label="`name`" v-model="value.projects.projecttype" :reduce="Client => Client.ID"
                                :options="get_projecttypes">
                                <template #selected-option="{ name }">
                                    <div style="margin:2px">
                                        <strong>{{ name }}</strong>
                                    </div>
                                </template>
                            </v-select>
                        </b-form-group>
                    </div>
                </div>
                <b-form-group label="Project Name:" label-for="input-2">
                    <b-form-input  :state="array_to_bool(errors['details.s_projname'])"
                        v-model="value.details.s_projname" />
                </b-form-group>
                <b-form-group label="Scope" label-for="radio-group-1">

                    <b-form-radio-group id="radio-group-1" v-model="test2" text-field="prodt_name" value-field="ID"
                        :options="get_productiontypes" name="radio-options">
                        <b-form-invalid-feedback :state="Boolean(test2)">Select Scope</b-form-invalid-feedback>
                    </b-form-radio-group>
                </b-form-group>

                <div class="clearfix">
                    <hr class="col-md-12">
                    <b-form-group label="Project Name:" label-for="input-2">
                        <b-form-select value-field="steps" :state="array_to_bool(errors['finishers'])" text-field="stepname" v-model="finishers_selected"
                            :options="get_productstep" :value="get_productstep[0]" />
                    </b-form-group>
                    <div class="row" v-if="finishers_selected">
                        <div class="col-md-12 row m-0 p-0 ">
                            <div class="col-md-6" v-for="(item, index) in finishers_selected" :key="index">

                                <div class="card card-outline shadow-sm">
                                    <div class="card-header">
                                        {{item.production.prodt_name}}
                                    </div>

                                    <div class="card-body">
                                        <b-form-group label="Machine:" label-for="input-2">
                                            <b-form-select :state="array_to_bool(errors[`finishers.${index}.machine`])"
                                                v-model="item.sel_machine"
                                                :disabled="!Boolean(filterMachine(machines,item).length)"
                                                :options="filterMachine(machines,item)" />
                                        </b-form-group>
                                        <b-form-group label="Instructions" label-for="input-5">
                                            <b-form-textarea v-model="item.detail" rows="5" max-rows="5" no-auto-shrink>
                                            </b-form-textarea>
                                        </b-form-group>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </b-tab>
            <b-tab>
                 <template #title>
                  Items  
                  <b-avatar size="26px" variant="light" badge-variant="danger" :badge="`${errors_count.items || 0}`" :text="`${value.items.length}`"></b-avatar>
                  
                </template>
               <table class="table">
                   <thead>
                       <tr>
                           <th>#</th>
                           <th>Item</th>
                           <th>Width</th>
                           <th>Height</th>
                           <th>Oum</th>
                           <th>Qty</th>
                           <th></th>
                       </tr>
                    </thead>
                    <transition-group name="list" tag="tbody">
                       <tr v-for="(item,index) in value.items" :key="`s${index}`" class="list-item-tr">
                           <td>{{index+1}}</td>
                           <td>
                               <b-form-input
                                :state="array_to_bool(errors[`items.${index}.source`])"
                                id="input-1"
                                v-model="item.source"
                                size="sm"
                                type="text"
                                placeholder="Enter Item"
                                required
                                ></b-form-input>
                           </td>
                           <td>
                               <b-form-input
                                :state="array_to_bool(errors[`items.${index}.w`])"
                                id="input-1"
                                v-model="item.w"
                                size="sm"
                                type="text"
                                placeholder="Enter Width"
                                required
                                ></b-form-input>
                           </td>
                           <td>
                                <b-form-input
                                 :state="array_to_bool(errors[`items.${index}.h`])"
                                id="input-1"
                                v-model="item.h"
                                size="sm"
                                type="text"
                                placeholder="Enter Height"
                                required
                                ></b-form-input>
                           </td>
                           <td>
                                <b-form-input
                                 :state="array_to_bool(errors[`items.${index}.uom`])"
                                id="input-1"
                                v-model="item.uom"
                                size="sm"
                                type="text"
                                placeholder="Enter Unit of Measurement"
                                required
                                ></b-form-input>
                           </td>
                           <td>
                                <b-form-input
                                 :state="array_to_bool(errors[`items.${index}.qty`])"
                                id="input-1"
                                v-model="item.qty"
                                size="sm"
                                type="text"
                                placeholder="Enter Quantity"
                                required
                                ></b-form-input>
                           </td>
                           <td>
                               <b-button variant="sm" @click="$delete(value.items, index)"><b-icon-trash></b-icon-trash></b-button>
                           </td>
                       </tr>
                    </transition-group>
                   <tfoot>
                       <tr>
                           <td colspan="7">
                               <div class="float-right">
                                   
                               <b-button @click="AddItem()" size="sm">
                                   <b-icon-plus></b-icon-plus> Add Item
                               </b-button>
                               </div>
                           </td>
                       </tr>
                   </tfoot>
               </table>
            </b-tab>
        </b-tabs>
    </div>
</template>
<style lang="scss">
    .list-enter-active, .list-leave-active {
        transition: all .2s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
       
    }
</style>
<script>
import { mapGetters, mapState } from 'vuex'
    /*eslint-disable*/

    export default {
        props: ['value'],
        data() {
            return {
                show_errors:false,
                detail_tab:0,
                finishers_selected: [],
                test2: "",
                errors: {
                    scope:{}
                },
                loading:false
            }
            
        },
        methods: {
           
            AddItem(){
              this.value.items.push({source: "", w: "", h: "", qty: "", detailID: "", uom: ""})
            },
            array_to_bool(array) {
                if (array)
                    return !Boolean(array.length)
               
            },
            filterMachine(machine, type) {
                var s = machine.filter(x => {
                    if (type.production.prodt_name == "PRINTING")
                        return x.Type == "PRINTER"
                    return x.Type == type.production.prodt_name
                })
                return s.map(x => {
                    return {
                        text: x.brand,
                        value: x.brand
                    }
                });

            },
            submit: function () {
                this.show_errors = true
                this.errors = {}
                if(!this.test2){
                    this.errors.scope = [
                        {name: "s_media", message: "No Media"}
                    ]
                    return false
                }
                if(!Boolean(this.finishers_selected.length)){
                    this.errors.finishers = [
                        {name: "s_media", message: "No Media"}
                    ]
                    return false
                }
                this.loading = true
                axios.post(`cors/newAddproject`, {
                    ...this.value,
                    finishers: this.finishers.concat(this.scope())
                })
                .then(res => {
                   this.$emit('added',res.data)
                     this.loading = false
                })
                .catch(err => {
                  
                    this.errors = err.response.data.errors

                    if(this.errors_count.info){
                        this.$bvToast.toast(`${this.errors_count.info} found on JO details Tab`, {
                        title: `Cant Proceed`,
                            variant: 'danger',
                            solid: true
                        })
                        this.detail_tab = 0
                    }
                    else if(this.errors_count.items){
                        this.$bvToast.toast(`${this.errors_count.items} found on Items Tab`, {
                        title: `Cant Proceed`,
                            variant: 'danger',
                            solid: true
                        })
                        this.detail_tab = 1
                    }
                     this.loading = false
                })
            },
            scope() {
                var sel_scope = this.get_productiontypes.find(x => x.ID === this.test2)
                let scope = {
                    DETAILS: "",
                    FINISHING: sel_scope.prodt_name,
                    Num: this.finishers_selected.length,
                    department: sel_scope.prodt_dep,
                }
                return scope;
            }

        },

        computed: {
             ...mapGetters(['get_productiontypes','get_productstep','get_projecttypes']),
             ...mapState(['machines']),
            errors_count(){
                var counts={}
                Object.keys(this.errors).map(x=>{
                    return x.split('.')[0]
                }).forEach(function(x) { 
                    if(x=='items')
                        counts['items'] = (counts[x] || 0)+1;
                    else
                         counts['info'] = (counts['info'] || 0)+1;
                 });

                return counts;
            },
            finishers: function () {
                return this.finishers_selected.map((s, i) => {
                    return {
                        DETAILS: s.detail,
                        FINISHING: s.production.prodt_name,
                        Num: i,
                        department: s.production.prodt_dep,
                        machine: s.sel_machine,
                        machine_req: s.production.prodt_machine,
                        processname: s.productionID,
                        productionID: s.productID
                    }
                })
            },

        },
        mounted() {

        },
    }
</script>