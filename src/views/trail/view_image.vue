<template>
    <div style="display: none;">
        <div ref="test" class="images" v-viewer="options">
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
                images: [],
                options: {
                    movable: true,
                    navbar: false,
                    title: false,
                    toolbar: {
                        download: function(s,c) {
                        },
                    },
                    tooltip: false
                }
            }
        },
      
        methods: {
            show(images, index = 0) {
                this.images = images
                const viewer = this.$el.querySelector('.images').$viewer
                viewer.show()
            }
        }
    }
</script>