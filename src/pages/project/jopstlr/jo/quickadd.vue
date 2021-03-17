<template>
       <div>
            <b-button size="sm" class="flex" @click="modal_open=true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <span>Import</span>
            </b-button>
            <b-modal v-model="modal_open" hide-footer hide-header centered>
                <textarea name="" id="" class="w-full border p-2 text-center " @paste="onPaste" rows="10" placeholder="Paste Items Here"></textarea>
            </b-modal>
       </div>
</template>
<script>
export default {
    data(){
        return {
            modal_open:false
        }
    },
    methods: {
        onPaste (evt) {
           
            const data = evt.clipboardData.getData('text/plain')
            const to2dArray = data.split('\n').map(function(ln){
                return ln.split('\t');
            });

            var keys = to2dArray.shift();
            var objects = to2dArray.map(function(values) {
                var w = keys.reduce(function(o, k, i) {
                    if(k=='')
                        k='item'
                    o[k] = values[i];
                    return o;
                }, {});
                return {
                    source:w.DESCRIPTION,
                    w:w.W,
                    h:w.H,
                    uom:w.UOM,
                    qty:w.QTY
                }
            }).filter(x=>x.source && x.qty);

            this.modal_open = false
            this.$emit('imported',objects)
            
        }
    },
}
</script>