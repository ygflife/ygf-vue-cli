<template>
    <div class="container">
        123
        <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
            <li v-for="item in list">{{ item }}</li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                loading:false,
                list:[0,1,2,3,4,5,6,7,8,9]
            }
        },
        methods:{
            loadMore(){
                this.loading = true;
                setTimeout(()=>{
                    let last = this.list[this.list.length -1];
                    for(let i=0;i<=10;i++){
                        this.list.push(last+i)
                    }
                    this.loading = false;
                },500)
            }
        }
    }
</script>
<style lang="scss">

</style>