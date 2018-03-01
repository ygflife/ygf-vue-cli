<template>
    <div class="detail-container">
        <div class="swipe-box">
            <mt-swipe :auto="5000">
                <mt-swipe-item v-for="item in product.bannerList"><img :src="item" alt=""></mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="product-text-box">
            <section class="title"><span v-text="product.title"></span><span v-text="product.classify"></span></section>
            <section class="introduce" v-text="product.introduce"></section>
            <section class="text">
                <div class="left" v-text="product.price"></div>
                <div class="right" v-text="product.pv"></div>
            </section>
        </div>
        <div class="product-cell-box">
            <mt-cell
                    title="标题文字"
                    to="#"
                    is-link
                    value="">
            </mt-cell>
            <mt-cell
                    title="标题文字"
                    to="#"
                    is-link
                    value="">
            </mt-cell>
        </div>
        <div class="product-detail-addr-box">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">选项一</mt-tab-item>
                <mt-tab-item id="2">选项二</mt-tab-item>
            </mt-navbar>

            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <mt-cell v-for="n in 10" :title="'内容 ' + n" />
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <mt-cell v-for="n in 4" :title="'测试 ' + n" />
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>
<script>
    import axios from '../modules/axios.js'
    export default {
        data(){
            return{
                selected:"1",
                product:{}
            }
        },
        computed: {
            getProductId() {
                return this.$route.params.id
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.getProductList()
            })
        },
        methods:{
            getProductList(){
                axios.get('productDetail.json').then((res)=>{
                    let id = this.$route.params.id;
                    this.product = res.data[id];
                })
            }
        }
    }
</script>
<style lang="scss">
    @import '../../APPcommon/style/variable.scss';
    .detail-container{
        width: 100%;
    }
    .product-text-box{
        padding:0 converseUnit(15px);
        background-color: #fff;
        section{
            font-family: '微软雅黑';
            padding: converseUnit(2px) 0;
        }
        .title{
            span{
                &:first-child{
                    font-size: converseUnit(18px);
                    font-weight: 600;
                }
                &:last-child{
                    font-size: converseUnit(12px);
                    color: #777;
                    margin-left: converseUnit(30px);
                }
            }
        }
        .introduce{
            font-size: converseUnit(12px);
            color: #777;
        }
        .text{
            overflow: hidden;
            .left{
                font-size: converseUnit(26px);
                font-weight: bold;
                color: $mainColor;
            }
            .right{
                font-size: converseUnit(12px);
                color: #777;
                line-height: converseUnit(30px);
            }
        }
    }
    .product-cell-box,.product-detail-addr-box{
        margin-top: converseUnit(10px);
    }
</style>