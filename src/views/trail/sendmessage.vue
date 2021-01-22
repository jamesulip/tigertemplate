<template>
    <div class="media row">
        <b-avatar class="avatar mr-2" size="md"></b-avatar>
        <div class="media-body">
            <div class="media-title" style="">
            </div>
            <div class="messge-body" style="font-size: .875rem;line-height: 1.3125rem;">
                <quillEditor ref="test" :options="customToolbar" v-model="data.content" />
            </div>
            <div class="row">
                <div class="col-md-12 mt-2">
                    <b-button class="float-right" @click="submit">
                        <i class="fa fa-paper-plane" aria-hidden="true"></i>Send
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /*eslint-disable*/

  
    import {
        quillEditor,Quill
    } from 'vue-quill-editor'
    import {ImageUpload} from 'quill-image-upload';
    import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
  
    Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)
    Quill.register('modules/imageUpload', ImageUpload);

    export default {
        props: ['trailid'],
        components: {
            quillEditor
        },
        data() {
            return {
                data: {
                    Type: "comment",
                    content: "",
                    user: this.$store.getters.current_employee_id,
                },
                customToolbar: {
                    theme: 'snow',
                    modules: {

                        
                        imageDropAndPaste: {
                            // add an custom image handler
                            handler: this.imageHandler
                        },
                        imageUpload: {
                            customUploader: (file, s) => this.handleImageAdded(file, s), // add custom uploader
                        },
                        toolbar: {

                            container: [
                                ["bold", "italic", "underline"],
                                [{
                                    list: "ordered"
                                }, {
                                    list: "bullet"
                                }],
                                ['image']
                            ],
                            handlers: {
                                'image': function () {
                                    document.getElementById('getFile').click()
                                }
                            }
                        }
                    }
                },
                editorSettings: {
                    modules: {
                        imageDrop: true,
                        imageResize: {}
                    }
                }
            }
        },
        mounted() {

        },
        methods: {
            imageHandler: function (imageDataUrl, type, imageData) {

                //    axios.get(imageDataUrl)
                //    .then(res => {
                //     this.handleImageAdded(res.blob())
                //    })
                //    .catch(err => {
                //        console.error(err); 
                //    })

                fetch(imageDataUrl)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "File name", {
                            type: "image/png"
                        })
                        this.handleImageAdded(file)
                    })

            },
            submit() {
                axios.post(`cors/trail/${this.trailid}/send`, this.data)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {

                var formData = new FormData();
                formData.append("upload", file);
                axios({
                        url: "cors/UploadImage",
                        method: "POST",
                        data: formData
                    })
                    .then(result => {
                        let url = result.data.url;
                        var quill = this.$refs.test.quill;
                        quill.insertEmbed(cursorLocation, "image", url);

                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
        },
    }
</script>