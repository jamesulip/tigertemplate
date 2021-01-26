<template>
    <div style="display: none;">
        <div class="images" v-viewer="{movable: true,navbar: false, title: false, toolbar: true, tooltip: false}">
            <img v-for="src in images" :src="src" :key="src">
        </div>

    </div>
</template>
<script>
    import 'viewerjs/dist/viewer.css'
    import Viewer from 'v-viewer'
    import Vue from 'vue'
    Vue.use(Viewer)
    export default {
        data() {
            return {
                images: []
            }
        },
        methods: {
            show(images,index=0) {
                this.images = images
                const viewer = this.$el.querySelector('.images').$viewer
                viewer.show()
            }
        }
    }
</script>