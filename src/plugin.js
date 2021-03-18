import Vue from 'vue'
import moment from 'moment'
Vue.prototype.moment = moment
export default {
    // called by Vue.use(FirstPlugin)
    install(Vue, options) {
        Vue.mixin({
            methods: {
              
                updateStatus(project, status) {
                    this.$store.commit('set_selected_project', project)
                    var xx = `${project.project.TYPE}#${project.project.NUM}v.${project.project.VERSION}`;
                    this.message = {
                        Type: "log",
                        content: `${xx}  ${status=='Paused'?'On Hold':status}`,
                        parentID: project.project.trailid,
                        state: status,
                        user: this.$store.getters.currentUser.employee_id,
                        project_id: project.ID,
                    }
                    this.loading = true
    
    
                    this.$store.dispatch('set_current_job').then(x => {
                        this.loading = false
                        if (status == 'Done') {
                            this.modal.jo_done = true
                        } else if (x && x.ID == project.ID) {
                            this.modal.start = true
    
                        } else if (x && x.ID != project.ID) {
    
                            this.confirmChangeJob(xx)
                        } else if (!x) {
                            this.modal.start = true
                        }
                    })
                },
                btnIcon(Status, f, pp) {
    
                    return btnIcon(Status, f, pp)
                },
                confirmChangeJob(xx) {
                    var project = this.$store.getters.getCurrentJob
                    console.log('project', project)
                    var projectName = `${project.project.TYPE}#${project.project.NUM}v.${project.project.VERSION}`;
    
                    const titleVNode = this.$createElement('span', {
                        domProps: {
                            innerHTML: `Project <b>${projectName}</b> is in progess, Do you want to Stop current project start <b>${xx}</b>`
                        }
                    })
                    this.$bvModal.msgBoxConfirm(titleVNode, {
                            title: `Do you want to Continue?`,
                            size: 'md',
                            buttonSize: 'md',
                            okVariant: 'danger',
                            okTitle: 'YES',
                            cancelTitle: 'NO',
                            footerClass: 'p-2',
                            hideHeaderClose: false,
                            centered: true
                        })
                        .then(value => {
                            if (value) {
    
                                axios.put('cors/finishers/' + project.ID, {
                                    "Status": 'Paused'
                                }).then(x => this.modal.start = true)
                            }
                        })
                        .catch(err => {
                            // An error occurred
                        })
                },
                updateStatusText(id, Status) {
                    // this.updateStatus(this.Project,Status)
                    axios.post(`/cors/trail/${this.Project.project.trailid}/send`, this.message)
                    return axios.patch(`cors/finishers/${this.message.project_id}`, {
                            Status: this.message.state
                        })
                        .then(res => {
    
                            this.$emit('saved', res.data)
                            this.$store.dispatch('set_current_job')
                            return res.data
                        })
                        .catch(err => {
    
                        })
                },
                $evaluate: param => eval('this.'+param),
                showNotification(set={title:'title',subject:'subject',content:'content',variant:'default',toast:'b-toaster-bottom-left'}) {
                    function stripHtml(html)
                    {
                       let tmp = document.createElement("DIV");
                       tmp.innerHTML = html;
                       return tmp.textContent || tmp.innerText || "";
                    }

                    const h = this.$createElement
                    const vNodesMsg = h(
                        'div', {
                            class: ['d-flex']
                        },
                        [
                            h(
                                'div', {
                                    class: ['pr-2', 'h4']
                                },
                                [
                                    h(set.icon)
    
                                ]
                            ),
    
                            h(
                                'div', {
                                    class: ['text-truncate']
                                },
                                [
                                    h(
                                        'span', {
                                            class: ['text-bold']
                                        },
                                        [
                                            h('span', set.subject)
    
                                        ]
                                    ),
                                    h(
                                        'div', {
                                            class: ['notif-contrnt']
                                        },
                                        [
                                            h('span',stripHtml(set.content))
                                        ]
                                    ),
    
                                ]
                            )
    
                        ]
                    )
                    const vNodesTitle = h(
                    'div',
                    { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
                    [
                        h('strong', { class: 'mr-2' },  set.title),
                    ]
                    )
                    this.$bvToast.toast([vNodesMsg], {
                        autoHideDelay: 20000,
                        title: vNodesTitle,
                        solid: true,
                        variant: set.variant,
                        toaster:'b-toaster-bottom-left'
    
                    })
                },
                getInitial: function (name) {
                    var initials = name.match(/\b\w/g) || [];
                    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
                    return initials;
                },
                state_check(array) {
                
                    if(array)
                        return false
                  
                },
                formatDate(val, format) {
                    return moment(val).format(format);
                },
                fileIcon(val, skip = []) {

                    var ext = {
                        gif: 'fa-file-image',
                        jpeg: 'fa-file-image',
                        jpg: 'fa-file-image',
                        png: 'fa-file-image',
                        pdf: 'fa-file-pdf',
                        doc: 'fa-file-word',
                        docx: 'fa-file-word',
                        ppt: 'fa-file-powerpoint',
                        pptx: 'fa-file-powerpoint',
                        xls: 'fa-file-excel',
                        xlsx: 'fa-file-excel',
                        csv: 'fa-file-csv',
                        aac: 'fa-file-audio',
                        mp3: 'fa-file-audio',
                        ogg: 'fa-file-audio',
                        avi: 'fa-file-video',
                        flv: 'fa-file-video',
                        mkv: 'fa-file-video',
                        mp4: 'fa-file-video',
                        gz: 'fa-file-archive',
                        rar: 'fa-file-archive',
                        zip: 'fa-file-archive',
                        css: 'fa-file-code',
                        html: 'fa-file-code',
                        js: 'fa-file-code',
                        txt: 'fa-file-alt'
                    }
                    skip.forEach(element => {
                        delete ext[element];

                    });
                    return ext[val]
                }
            },
        })
        Vue.filter('status_col',function(Status){
            
                switch (Status) {
                  case "Working on it":
                    return "primary text-blue-600 bg-blue-100";
                  case "Done":
                    return "success text-green-600 bg-green-100";
                  case "Paused":
                    return "warning text-yellow-600 bg-yellow-100";
                  case "REVISED":
                    return "danger text-red-600 bg-red-100";
                  default:
                    return "warning text-yellow-600 bg-yellow-100";
                }
              
        })
        Vue.filter('lr_status',function(Status){
                switch (Status) {
                    case "Approved":
                        return "primary text-blue-600 bg-blue-100";
                    case "For Approval":
                        return "success text-green-600 bg-green-100";
                    case "Paused":
                        return "warning text-yellow-600 bg-yellow-100";
                    case "Rejected":
                        return "danger text-red-600 bg-red-100";
                    default:
                        return "warning text-yellow-600 bg-yellow-100";
                }
        })
        Vue.filter('formatDate', function (value, format) {
            if (format == 'ago') {
                var date = new Date(value)
                var seconds = Math.floor((new Date() - date) / 1000);

                var interval = seconds / 31536000;

                if (interval > 1) {
                    return Math.floor(interval) + " years ago";
                }
                interval = seconds / 2592000;
                if (interval > 1) {
                    return Math.floor(interval) + " months ago";
                }
                interval = seconds / 86400;
                if (interval > 1) {
                    return Math.floor(interval) + " days ago";
                }
                interval = seconds / 3600;
                if (interval > 1) {
                    return Math.floor(interval) + " hours ago";
                }
                interval = seconds / 60;
                if (interval > 1) {
                    return Math.floor(interval) + " minutes ago";
                }
                return Math.floor(seconds) + " seconds ago";
            } else
                return moment(value).format(format)
        })
        Vue.filter('bytesToSize', function (bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        })
    }
}