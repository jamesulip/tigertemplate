<template>
<div class="tw-side-nav">
        <h2 class="text-3xl font-semibold text-gray-800 dark:text-white">TG-Sales</h2>

        <div class="relative mt-6">
            <!-- <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span>

            <input type="text" class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Search"> -->
        </div>
        
        <div class="flex flex-col justify-between flex-1 mt-6">
            <nav>
                <menu2/>
            </nav>

            <div class="flex items-center px-4 -mx-2">
                <!-- <img class="object-cover mx-2 rounded-full h-9 w-9" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar"> -->
                <b-img :src="`${serUrl}${currentUser.img}`" class="object-cover mx-2 rounded-full h-9 w-9"></b-img>
                <h4 class="mx-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">{{currentUser.name}}</h4>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import menus from '../../settings/sidemenu.js'
import menu2 from './menu2'
export default {
    components:{
        menu2
    },
    data() {
        return {
            menus:menus
        }
    },
    computed: {
        ...mapState(['currentUser','serUrl'])
    },
    mounted() {
      
    },
}
</script>