<template>
  
        <quillEditor :options="customToolbar" v-model="value.content" @change="$emit('change',$event)"/>

</template>
<script>
    /*eslint-disable*/
    import _ from 'lodash';

    import {
        quillEditor,
        Quill
    } from 'vue-quill-editor'
    import {
        ImageUpload
    } from 'quill-image-upload';
    import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
    import ImageResize from 'quill-image-resize-vue';
    import MagicUrl from 'quill-magic-url'
    import "quill-mention";
    import FileUpload from 'vue-upload-component'
    import {
        mapGetters
    } from 'vuex';
    var InlineBlot = Quill.import('blots/block');

    Quill.register({
        'modules/imageDropAndPaste': QuillImageDropAndPaste,
        'modules/imageDropAndPaste': QuillImageDropAndPaste,
        'modules/imageUpload': ImageUpload,
        "modules/imageResize": ImageResize,
        'modules/magicUrl': MagicUrl,
    })

    class ImageBlot extends InlineBlot {
        static create(data) {
            const node = super.create(data);
            node.setAttribute('src', data.src);
            node.setAttribute('style', data.style);
            node.style.maxWidth = "500px";
            node.setAttribute('data-custom', data.custom);
            console.log(node);
            return node;
        }
        static value(domNode) {
            const {
                src,
                custom
            } = domNode.dataset;
            return {
                src,
                custom
            };
        }
    }
    ImageBlot.blotName = 'imageBlot';
    ImageBlot.className = 'image-blot';
    ImageBlot.tagName = 'img';
    ImageBlot.style = "background-color: red;"

    Quill.register({
        'formats/imageBlot': ImageBlot
    });
    export default {
        props:{
            value:{

            },
            change: { type: Function, required: false },        

        },
        components:{
            quillEditor
        },
        data() {
            return {
                customToolbar: {
                    
                    theme: 'snow',
                    modules: {
                        
                        mention: {
                            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                            mentionDenotationChars: ["@", "#"],
                            listItemClass: 'list-group-item list-group-item-action',
                            mentionListClass: 'list-group',

                            source: async (searchTerm, renderList) => {
                                const matchedPeople = this.suggestPeople(searchTerm);

                                renderList(matchedPeople.map(x => {
                                    return {
                                        id: x.id,
                                        value: x.name
                                    }
                                }));
                            }
                        },
                        imageResize: {},
                        magicUrl: true,
                        imageDropAndPaste: {
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
            }
        },
        methods: {
            imageHandler: function (imageDataUrl, type, imageData) {
                fetch(imageDataUrl)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "File name", {
                            type: "image/png"
                        })
                        this.handleImageAdded(file)
                    })

            },
            handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
                this.sending = true
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
                        this.sending = false
                        quill.insertEmbed(quill.getSelection().index, 'imageBlot', {
                            src: url,
                            // custom: 'hello-' + Date.now(),
                        }, 'user');

                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
        },
    }
</script>