<template>
    <div id="app">
        <transition name="slide-left" mode="out-in">
            <router-view class="router-ani"></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        data(){
          return{
          }
        },
        mounted(){
            this.$nextTick(()=>{
            })
        },
        methods:{

        },
        components:{
        }
    }
</script>
<style lang="scss">

</style>