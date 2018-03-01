<template>
    <div class="container">
        <div class="product-box">
            <div class="swipe-box">
                <mt-swipe :auto="5000">
                    <mt-swipe-item v-for="item in bannerList"><img :src="item.imgSrc" alt=""></mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="product-list-box">
                <module-title title="人气套系" Hlink='www'></module-title>
                <ul class="complete" v-infinite-scroll="loadMoreRQTX" infinite-scroll-disabled="true">
                    <li class="complete-list-item" v-for="(item,index) in RQTXList" :key="index">
                        <router-link :to="{path:`/detail/${item.id}`}">
                            <img :src="item.imgSrc" alt="">
                            <div class="msg">
                                <h6 v-text="item.title">标题文字</h6>
                                <p>
                                    <span v-text="item.introduction">简介</span>
                                    <span v-text="item.number">浏览量</span>
                                </p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="product-list-box">
                <module-title title="最新案例" Hlink='www'></module-title>
                <ul class="newCase">
                    <li class="case-list-item" v-for="item in caseList">
                        <div class="imgBox">
                            <img :src="item.imgSrc" alt="">
                            <div class="icons">
                                <span>3D</span><span></span><span v-text="item.addr"></span>
                            </div>
                        </div>
                        <div class="textBox">
                            <div class="left">
                                <p>
                                    <span>{{item.title}}</span>
                                    <span>{{item.pv}}</span>
                                </p>
                                <ul>
                                    <li v-for="list in item.ms">{{list}}</li>
                                </ul>
                            </div>
                            <div class="right">
                                <img :src="item.userImg" alt="">
                                <span v-text="item.date"></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="product-list-box">
                <module-title title="新品上市"></module-title>
                <div class="newProduct">
                    <img src="../../APPcommon/images/banner1.png" alt="">
                    <ul>
                        <li><img src="../../APPcommon/images/product2.jpg" alt=""><span>翰墨诗香</span></li>
                        <li><img src="../../APPcommon/images/product4.jpg" alt=""><span>西雅图</span></li>
                        <li><img src="../../APPcommon/images/product1.jpg" alt=""><span>时光海</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <transition name="slide-left" mode="out-in">
            <router-view class="router-ani"></router-view>
        </transition>
    </div>
</template>

<script>
    import axios from '../modules/axios.js'
    const moduleTitle = {
        props:['title','Hlink'],
        template:`
            <div class="module-title">
                 <span></span>
                 <h4>{{title}}</h4>
                 <a v-if="Hlink" :href="Hlink">更多</a>
            </div>
        `.trim()};
    export default {
        data(){
            return{
                bannerList:[],
                RQTXList:[],
                caseList:[]
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.getBannerList();
                this.getCaseList();
            })
        },
        methods:{
            getBannerList(){
                axios.get('banner.json').then((res)=>{
                    this.bannerList = res.data;
                })
            },
            loadMoreRQTX(){
                axios.get('product-rqtx.json').then((response)=>{
                    this.RQTXList = response.data;
                })
            },
            getCaseList(){
                axios.get('newCase.json').then((res)=>{
                    this.caseList = res.data;
                })
            }
        },
        components:{
            'module-title':moduleTitle,
        }
    }
</script>

<style lang="scss">
    @import '../style/variable.scss';
    .swipe-box{
        height:converseUnit(192px);
        img{
            width: 100%;
        }
    }
    .module-title{
        height: converseUnit(22px);
        margin: converseUnit(10px) converseUnit(6px);
        overflow: hidden;
        span{
            display: block;
            float: left;
            width: converseUnit(6px);
            height: 100%;
            background-color: black;
        }
        h4{
            display: block;
            float: left;
            font-size: converseUnit(16px);
            font-weight:400;
            padding-left: converseUnit(15px);
            line-height: converseUnit(22px);
        }
        a{
            float: right;
            font-size: converseUnit(12px);
            line-height: converseUnit(22px);
            color: #777;
        }
    }
    .product-list-box{
        padding: 0 converseUnit(8px);
        margin: converseUnit(8px) 0;
        overflow: hidden;
        background-color: #fff;
    }
    .complete{
        .complete-list-item{
            float: left;
            border-radius: converseUnit(5px);
            width: 48%;
            font-size: 0;
            overflow: hidden;
            box-shadow:0 2px 5px #aaa;
            margin-bottom: converseUnit(12px);
            &:nth-child(even){
                margin-left: 4%;
            }
            img{
                width: 100%;
            }
        }
        .msg{
            padding: 0 converseUnit(4px);
            h6{
                font-weight: 600;
                font-size: converseUnit(14px);
            }
            p{
                overflow: hidden;
                color: #777;
                font-size: converseUnit(12px);
                padding: converseUnit(8px) 0;
                span{
                    &:first-child{
                        float: left;
                    }
                    &:last-child{
                        float: right;
                    }
                }
            }
        }
    }
    .newCase{
        margin: 0 converseUnit(-8px);
        .case-list-item{
            position: relative;
            overflow: hidden;
            margin-bottom: converseUnit(10px);
            box-shadow:0 2px 5px #aaa;
            padding: converseUnit(8px);
            .imgBox{
                position: relative;
                font-size: 0;
                border-radius: converseUnit(6px);
                overflow: hidden;
                img{
                    width: 100%;
                }
                .icons{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background-color: rgba(0,0,0,0.1);
                    span{
                        position: absolute;
                        display: block;
                        &:nth-child(1){
                            width: converseUnit(100px);
                            height: converseUnit(26px);
                            left: converseUnit(-30px);
                            top: converseUnit(10px);
                            line-height: converseUnit(26px);
                            font-size: converseUnit(18px);
                            color: #fff;
                            text-align: center;
                            background-color: $mainColor;
                            transform:rotate(-45deg);
                            -ms-transform:rotate(-45deg);
                            -moz-transform:rotate(-45deg);
                            -webkit-transform:rotate(-45deg);
                            -o-transform:rotate(-45deg);
                        }
                        &:nth-child(2){
                            width: converseUnit(70px);
                            height: converseUnit(70px);
                            border-radius: converseUnit(70px);
                            border: solid converseUnit(3px) #fff;
                            left: 50%;
                            top: 50%;
                            margin-left: converseUnit(-35px);
                            margin-top: converseUnit(-35px);
                        }
                        &:nth-child(3){
                            height: converseUnit(24px);
                            border-radius:converseUnit(24px);
                            background-color: rgba(255,255,255,0.3);
                            font-size: converseUnit(12px);
                            color: #fff;
                            line-height: converseUnit(24px);
                            padding: 0 converseUnit(15px) 0 converseUnit(6px);
                            right: converseUnit(-13px);
                            bottom: converseUnit(30px);
                        }
                    }
                }
            }
            .textBox{
                position: relative;
                z-index: 9;
                overflow: visible;
                .left{
                    p{
                        display: block;
                        span{
                            &:first-child{
                                font-size: converseUnit(16px);
                                font-weight: 600;
                            }
                            &:last-child{
                                font-size: converseUnit(12px);
                                margin-left: converseUnit(30px);
                                color: #777;
                            }
                        }
                    }
                    ul{
                        overflow: hidden;
                        padding:converseUnit(4px) 0;
                        li{
                            float: left;
                            padding: 0 converseUnit(8px);
                            border: solid 1px $mainColor;
                            border-radius: converseUnit(16px);
                            font-size: converseUnit(12px);
                            color: $mainColor;
                            margin-left: converseUnit(10px);
                            &:first-child{
                                margin-left: 0;
                            }
                        }
                    }
                }
                .right{
                    text-align: center;
                    margin-top: converseUnit(-9px);
                    img{
                        display: inline-block;
                        width: converseUnit(50px);
                        height: converseUnit(50px);
                        border-radius: converseUnit(50px);
                        border: solid converseUnit(3px) #fff;
                    }
                    span{
                        display: block;
                        font-size: converseUnit(14px);
                        color: #777;
                    }
                }
            }
        }
    }
    .newProduct{
        img{
            width: 100%;
        }
        ul{
            width: 100%;
            display: -webkit-box;
            overflow-x: scroll;
            -webkit-overflow-scrolling:touch;
            li{
                width: 45%;
                margin-left: converseUnit(12px);
                margin-bottom: converseUnit(8px);
                box-shadow:2px 2px 8px #aaa;
                border-radius: converseUnit(3px);
                overflow: hidden;
                &:first-child{
                    margin-left: 0;
                }
                span{
                    display: block;
                    width: 100%;
                    font-size: converseUnit(16px);
                    text-align: center;
                    margin-bottom: converseUnit(8px);
                }
            }
        }
    }
</style>