<template>
    <div>
        <div class="flex">

            <div class="w-4/6">
                <div class=" py-3  px-3 border-b border-solid w-full">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 uppercase">
                        Request Job Order
                    </h3>
                </div>
                <div class="px-3 pt-2">
                    <h3 class="text-md leading-6 text-gray-500 font-medium" id="modal-headline">
                        Project Summary
                    </h3>
                    <div class="row mt-3">

                        <div class="col-md-12 pb-3">
                            <div class="text-md flex">
                                <div class="w-6 h-6 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div class="w-full">
                                    <label for="comments" class="mb-0 font-medium text-gray-700">Project Name</label>
                                    <b-form-input :state="array_to_bool(errors['details.s_projname'])"
                                        class="tw-input text-sm" v-model="value.details.s_projname" />
                                </div>
                            </div>
                        </div>




                        <div class="col-md-6 pb-3">
                            <div class="text-md flex">
                                <b-avatar class="w-6 h-6 mr-1"></b-avatar>
                                <div class="w-full">
                                    <label for="comments" class="mb-0 font-medium text-gray-700">Type</label>
                                    <v-select :label="`name`" v-model="value.projects.projecttype"
                                        :reduce="Client => Client.ID" :options="get_projecttypes">
                                        <template #selected-option="{ name }">
                                            <div style="margin:2px">
                                                <strong>{{ name }}</strong>
                                            </div>
                                        </template>
                                    </v-select>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 pb-3">
                            <div class="text-md flex">
                                <div class="w-6 h-6 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <div class="w-full">
                                    <label for="comments" class="mb-0 font-medium text-gray-700">Media</label>
                                    <b-form-input :state="array_to_bool(errors['details.s_media'])"
                                        v-model="value.details.s_media" class="tw-input text-sm" />
                                </div>
                            </div>
                        </div>

                        
                        <div class="col-md-12 pb-3">
                            <div class="text-md flex">
                                <div class="w-6 h-6 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div class="w-full">
                                    <label for="comments" class="mb-0 font-medium text-gray-700">Client Name</label>
                                    <div class="text-gray-500 capitalize"
                                        v-if="value.details && value.details.client2">
                                        {{value.details.client2.com_name}}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <table class="table  mt-5">
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
                        <tbody>
                            <tr v-for="(item,index) in value.items" :key="`item-${index}`"
                                :class="{'bg-red-100':item.action=='delete','bg-yellow-50':item.action=='add'}">
                                <td>{{index+1}}</td>
                                <td>

                                    <b-form-input :state="array_to_bool(errors[`items.${index}.source`])"
                                        :id="`input1-${_uid}`" v-model="item.source" size="sm" type="text"
                                        placeholder="Enter Item" required>
                                    </b-form-input>
                                </td>
                                <td>
                                    <b-form-input :state="array_to_bool(errors[`items.${index}.w`])"
                                        :id="`input2-${_uid}`" v-model="item.w" size="sm" type="text"
                                        placeholder="Enter Width" required>
                                    </b-form-input>
                                </td>
                                <td>
                                    <b-form-input :state="array_to_bool(errors[`items.${index}.h`])"
                                        :id="`input3-${_uid}`" v-model="item.h" size="sm" type="text"
                                        placeholder="Enter Height" required>
                                    </b-form-input>
                                </td>
                                <td>
                                    <b-form-input :state="array_to_bool(errors[`items.${index}.uom`])"
                                        :id="`input4-${_uid}`" v-model="item.uom" size="sm" type="text"
                                        placeholder="Enter Unit of Measurement" required></b-form-input>
                                </td>
                                <td>
                                    <b-form-input :state="array_to_bool(errors[`items.${index}.qty`])"
                                        :id="`input5-${_uid}`" v-model="item.qty" size="sm" type="text"
                                        placeholder="Enter Quantity" required>
                                    </b-form-input>
                                </td>
                                <td>
                                    <b-button variant="sm" v-if="!item.ID" @click="x=>{$delete(value.items, index)}">
                                        <b-icon-x></b-icon-x>
                                    </b-button>
                                    <b-button variant="sm" v-else-if="item.action!='delete'"
                                        @click="x=>{item.action ='delete';$forceUpdate()}">
                                        <b-icon-x></b-icon-x>
                                    </b-button>
                                    <b-button variant="sm" v-else @click="x=>{item.action =null;$forceUpdate()}">
                                        <b-icon-check></b-icon-check>
                                    </b-button>
                                </td>
                            </tr>
                        </tbody>

                        <tbody v-if="!value.items.length">
                            <tr>
                                <td colspan="7">
                                    <div class="flex flex-col items-center">
                                        <div class="w-20 h-20 text-gray-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                            </svg>
                                        </div>
                                        <span>
                                            No Item
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="7" class="pr-0">
                                    <div class="float-right flex">
                                        <b-button @click="clearItems()" size="sm"
                                            class="mr-1 bg-red-400 hover:bg-red-500" variant="danger">
                                            <b-icon-plus></b-icon-plus> Clear Items
                                        </b-button>

                                        <b-button @click="AddItem()" size="sm" class="mr-1">
                                            <b-icon-plus></b-icon-plus> Add Item
                                        </b-button>

                                        <importItem @imported="import_data" />



                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div class="w-2/6 bg-gray-100 py-3 px-3 rounded-tr-lg">
                <fieldset>
                    <legend class="text-base font-medium text-gray-900">Finishers Instructions</legend>


                    <div class="mt-3 space-y-4">
                        <template v-for="(item, index) in value.finishers">
                            <div :key="index">
                                <div class="flex flex-row justify-between">
                                    <span for="comments" class="text-sm text-gray-600 w-1/2 self-center font-semibold">
                                        {{item.FINISHING}}</span>
                                    <b-form-select :state="array_to_bool(errors[`finishers.${index}.machine`])"
                                        v-model="item.machine" :disabled="!Boolean(filterMachine(machines,item).length)"
                                        :options="filterMachine(machines,item)" class="tw-input text-sm w-1/2" />
                                </div>
                                <textarea name="" id="" cols="30" rows="5" v-model="item.DETAILS"
                                    class="shadow-sm focus:ring-indigo-500  p-2 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                            </div>
                        </template>

                    </div>
                </fieldset>

            </div>

        </div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapState
    } from 'vuex'
    /*eslint-disable*/
    import importItem from './quickadd'
    export default {
        props: ['value'],
        components: {
            importItem
        },
        data() {
            return {
                show_errors: false,
                errors: {}
            }
        },
        computed: {
            ...mapGetters(['get_projecttypes']),
            ...mapState(['machines']),
            size: {
                get(val) {

                },
                set(val) {

                }
            },
        },
        methods: {
            clearItems() {
                this.value.items.slice(0).forEach((item,ind) => {
                    if(item.ID){
                        this.$set(this.value.items, ind, {
                            ...item,
                            action:'delete'
                        })
                    }
                     else if(item.action=='add'){
                        this.value.items.splice(this.value.items.indexOf(item), 1);
                    }

                 
                });
                this.$forceUpdate()
            },
            import_data: function (items) {
                var item = items.map(x => {
                    return {
                        ...x,
                        action: 'add'
                    }
                })
                this.value.items = this.value.items.concat(item)
            },
            AddItem() {
                this.value.items.push({
                    source: "",
                    w: "",
                    h: "",
                    qty: "",
                    detailID: "",
                    uom: "",
                    action: 'add'
                })
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