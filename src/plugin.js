import Vue from 'vue'
import moment from 'moment'
Vue.prototype.moment = moment
export default {
    // called by Vue.use(FirstPlugin)
    install(Vue, options) {
        Vue.mixin({
            methods: {
              getInitial: function (name) {
                var initials = name.match(/\b\w/g) || [];
                initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
                return initials;
              },
              formatDate(val,format){
                return moment(val).format(format);
              }
            },
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