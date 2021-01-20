<template>
    <div>


        <b-tabs card>
            <b-tab active title="Details">
                <div class="row">
                    <div class="col-md-12">

                        <b-alert dismissible @dismissed="x=>{show_errors=false,errors={}}"
                            :show="Boolean(Object.keys(errors).length) && show_errors" variant="danger"
                            class="disabled">
                            Cant Proceed {{Object.keys(errors).length}} error<template
                                v-if="Object.keys(errors).length>0">s</template> found
                        </b-alert>
                    </div>
                    <div class="col-md-12">
                        <b-form-group label="Project Name:" label-for="input-2">
                            <b-form-input :state="array_to_bool(errors['details.s_projname'])"
                                v-model="value.details.s_projname" />
                        </b-form-group>
                    </div><div class="col-md-12">
                        <b-form-group label="Project Name:" label-for="input-2">
                            <b-form-input :state="array_to_bool(errors['details.s_projname'])"
                                v-model="value.details.s_projname" />
                        </b-form-group>
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
                                :options="$store.getters.get_projecttypes">
                                <template #selected-option="{ name }">
                                    <div style="margin:2px">
                                        <strong>{{ name }}</strong>
                                    </div>
                                </template>
                            </v-select>
                        </b-form-group>
                    </div>
                </div>
                <hr class="col-md-12">
                <div class="row">
                    <div class="col-md-12 row m-0 p-0 ">
                        <div class="col-md-6" v-for="(item, index) in value.finishers" :key="index">

                            <div class="card card-outline shadow-sm">
                                <div class="card-header">
                                    {{item.FINISHING}}
                                </div>

                                <div class="card-body">
                                    <b-form-group label="Machine:" label-for="input-2">
                                        <b-form-select :state="array_to_bool(errors[`finishers.${index}.machine`])"
                                            v-model="item.machine"
                                            :disabled="!Boolean(filterMachine($store.state.machines,item).length)"
                                            :options="filterMachine($store.state.machines,item)" />
                                    </b-form-group>
                                    <b-form-group label="Instructions" label-for="input-5">
                                        <b-form-textarea v-model="item.DETAILS" rows="5" max-rows="5" no-auto-shrink>
                                        </b-form-textarea>
                                    </b-form-group>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </b-tab>
            <b-tab title="Items">
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
                       <tr v-for="(item,index) in value.items" :key="`s${index}`" class="list-item-tr" :class="{'bg-danger disabled':item.action=='delete'}">
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
                               <b-button variant="sm" v-if="!item.ID" @click="x=>{$delete(value.items, index)}"><b-icon-x></b-icon-x></b-button>
                               <b-button variant="sm" v-else-if="item.action!='delete'" @click="x=>{item.action ='delete';$forceUpdate()}"><b-icon-x></b-icon-x></b-button>
                               <b-button variant="sm" v-else @click="x=>{item.action =null;$forceUpdate()}"><b-icon-check></b-icon-check></b-button>
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

<script>
    /*eslint-disable*/
    export default {
        props: ['value'],
        data() {
            return {
                show_errors: false,
                errors: {}
            }
        },
        computed: {
            size: {
                get(val) {

                },
                set(val) {

                }
            },
        },
        methods: {
             AddItem(){
              this.value.items.push({source: "", w: "", h: "", qty: "", detailID: "", uom: "",action:'add'})
            },
            array_to_bool(array) {
                if (array)
                    return !Boolean(array.length)

            },
            filterMachine(machine, type) {

                var s = machine.filter(x => {
                    if (type.FINISHING == "PRINTING")
                        return x.Type == "PRINTER"
                    else if (type.FINISHING == "CUTTING")
                        return x.Type == "CUTTING"
                })

                return s.map(x => {
                    return {
                        text: x.brand,
                        value: x.brand
                    }
                });

            },
            submit() {
                this.errors = {}
                axios.post(`cors/updateProject/${this.value.details.ID}`,
                        this.value)
                    .then(res => {

                        this.$emit('edited', res.data)

                    })
                    .catch(err => {
                        // console.error(err); 

                        this.errors = err.response.data.errors
                    })
            }
        },
    }
</script>