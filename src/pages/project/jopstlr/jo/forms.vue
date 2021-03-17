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
                                <div class="w-6 h-6 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <label for="comments" class="mb-0 font-medium text-gray-700">Client Name</label>
                                    <p class="text-gray-500 capitalize">
                                        {{current_project.client.com_name}}
                                    </p>
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
                                    <label for="comments" class="mb-0 font-medium text-gray-700">Scope</label>
                                    <b-form-select v-model="test2" :options="get_productiontypes" class="tw-input text-sm"
                                        text-field="prodt_name" value-field="ID"></b-form-select>
                                    <b-form-invalid-feedback :state="Boolean(test2)">Select Scope
                                    </b-form-invalid-feedback>

                                </div>
                            </div>
                        </div>


                    </div>
                    <table class="table table-striped mt-5">
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
                            <tr v-for="(item,index) in value.items" :key="`item-${index}`">
                                <td>{{index+1}}</td>
                                <td>
                                    <b-form-input :state="array_to_bool(errors[`items.${index}.source`])" :id="`input-${_uid}`"
                                        v-model="item.source" size="sm" type="text" placeholder="Enter Item" required>
                                    </b-form-input>
                                </td>
                                <td>
                                    <b-form-input :state="array_to_bool(errors[`items.${index}.w`])" :id="`input-${_uid}`"
                                        v-model="item.w" size="sm" type="text" placeholder="Enter Width" required>
                                    </b-form-input>
                                </td>
                                <td>
                                    <b-form-input :state="array_to_bool(errors[`items.${index}.h`])" :id="`input-${_uid}`"
                                        v-model="item.h" size="sm" type="text" placeholder="Enter Height" required>
                                    </b-form-input>
                                </td>
                                <td>
                                    <b-form-input :state="array_to_bool(errors[`items.${index}.uom`])" :id="`input-${_uid}`"
                                        v-model="item.uom" size="sm" type="text" placeholder="Enter Unit of Measurement"
                                        required></b-form-input>
                                </td>
                                <td>
                                    <b-form-input :state="array_to_bool(errors[`items.${index}.qty`])" :id="`input-${_uid}`"
                                        v-model="item.qty" size="sm" type="text" placeholder="Enter Quantity" required>
                                    </b-form-input>
                                </td>
                                <td>
                                    <b-button variant="sm" @click="$delete(value.items, index)">
                                        <b-icon-trash></b-icon-trash>
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
                                             <b-button @click="value.items=[]" size="sm" class="mr-1 bg-red-400 hover:bg-red-500" variant="danger">
                                                <b-icon-plus></b-icon-plus> Clear Items
                                            </b-button>

                                            <b-button @click="AddItem()" size="sm" class="mr-1">
                                                <b-icon-plus></b-icon-plus> Add Item
                                            </b-button>
                                           
                                            <importItem @imported="import_data"/>
                                       


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
                    <b-form-select value-field="steps" :state="array_to_bool(errors['finishers'])" text-field="stepname"
                        v-model="finishers_selected" :options="get_productstep" :value="get_productstep[0]" />

                    <div class="mt-3 space-y-4">
                        <template v-for="(item, index) in finishers_selected">
                            <div :key="index">
                                <div class="flex flex-row justify-between">
                                    <span for="comments" class="text-sm text-gray-600 w-1/2 self-center font-semibold">
                                        {{item.production.prodt_name}}</span>
                                    <b-form-select :state="array_to_bool(errors[`finishers.${index}.machine`])"
                                        v-model="item.sel_machine"
                                        :disabled="!Boolean(filterMachine(machines,item).length)"
                                        :options="filterMachine(machines,item)" class="tw-input text-sm w-1/2" />
                                </div>
                                <textarea name="" id="" cols="30" rows="5" v-model="item.detail"
                                    class="shadow-sm focus:ring-indigo-500  p-2 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                            </div>
                        </template>

                    </div>
                </fieldset>

            </div>

        </div>
    </div>
</template>
<style lang="scss">
    .list-enter-active,
    .list-leave-active {
        transition: all .2s;
    }

    .list-enter,
    .list-leave-to

    /* .list-leave-active below version 2.1.8 */
        {
        opacity: 0;

    }
</style>
<script>
    import {
        mapGetters,
        mapState
    } from 'vuex'
    /*eslint-disable*/
    import importItem from './quickadd'
    export default {
        props: ['value'],
        components:{
            importItem
        },
        data() {
            return {
                show_errors: false,
                detail_tab: 0,
                finishers_selected: [],
                test2: "",
                errors: {
                    scope: {}
                },
                loading: false
            }

        },
        methods: {
            import_data:function(items){
       
                this.value.items = this.value.items.concat(items)
            },
            AddItem() {
                this.value.items.push({
                    source: "",
                    w: "",
                    h: "",
                    qty: "",
                    detailID: "",
                    uom: ""
                })
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
                if (!this.test2) {
                    this.errors.scope = [{
                        name: "s_media",
                        message: "No Media"
                    }]
                    return false
                }
                if (!Boolean(this.finishers_selected.length)) {
                    this.errors.finishers = [{
                        name: "s_media",
                        message: "No Media"
                    }]
                    return false
                }
                this.loading = true
                axios.post(`cors/newAddproject`, {
                        ...this.value,
                        finishers: this.finishers.concat(this.scope())
                    })
                    .then(res => {
                        this.$emit('added', res.data)
                        this.loading = false
                    })
                    .catch(err => {

                        this.errors = err.response.data.errors

                        if (this.errors_count.info) {
                            this.$bvToast.toast(`${this.errors_count.info} found on JO details Tab`, {
                                title: `Cant Proceed`,
                                variant: 'danger',
                                solid: true
                            })
                            this.detail_tab = 0
                        } else if (this.errors_count.items) {
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
            ...mapGetters(['get_productiontypes', 'get_productstep', 'get_projecttypes']),
            ...mapState(['machines', 'currentUser', 'current_project']),
            errors_count() {
                var counts = {}
                Object.keys(this.errors).map(x => {
                    return x.split('.')[0]
                }).forEach(function (x) {
                    if (x == 'items')
                        counts['items'] = (counts[x] || 0) + 1;
                    else
                        counts['info'] = (counts['info'] || 0) + 1;
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