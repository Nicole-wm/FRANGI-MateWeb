<template>
    <div class="mateList">
        <!-- <p class="nocontent_mess">暂无素材</p> -->
        <div class="mateContent">
            <div class="matediv" v-for="mate in matelist" v-bind:key="mate.id">
                <span class="mate_name" v-html="mate.content">
                </span>
                <ul class="mate_img">
                    <li v-for="(item,index) in mate.posters" v-bind:key="index" v-bind:style="{backgroundImage:'url('+item+')'}" @click="clickImg(mate.posters,index)">
                    </li>
                </ul>
                <div class="clearfix"></div>
                <div class="mate_hr"></div>
                <div class="mate_opear">
                    <span class="mo_like heart" :class="{'heartAnimation':mate.islike==true}" @click="clickLike(mate)"></span>
                    <span class="mo_list">
                        <span class="mo_down" @click="downMate(mate.id)">下载图文</span>
                        <span class="mo_share" @click="shareMate(mate.id)">分享</span>
                        <span class="mo_ewm" @click="makeCode(mate.id)">生成二维码</span>
                    </span>
                </div>
                <div class="FullScreen" v-if="isShowFScreen">
                    <slider :pages="pages" :sliderinit="sliderinit" @tap='onTap'>
                        <div slot="loading">loading...</div>
                    </slider>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import slider from "vue-concise-slider";

export default {
    name: "matelist",
    data() {
        return {
            isShowFScreen: false,
            pages: [],
            sliderinit: {
                direction: "horizontal",
                thresholdDistance: 100,
                thresholdTime: 300,
                loop: true,
                infinite: 1,
                slidesToScroll: 1
            },
            matelist: [
                {
                    id: 1,
                    content:
                        "<h2><b>女神水功效和成分</b></h2><h5><span>十大无添加，八大功效，四大成分。</span></h5>",
                    posters: [
                        "../static/json/mateImg/1/1.jpg",
                        "../static/json/mateImg/1/2.jpg",
                        "../static/json/mateImg/1/3.jpg",
                        "../static/json/mateImg/1/4.jpg"
                    ]
                },
                {
                    id: 2,
                    content: "<h3>女神水设计大奖~</h3><p>恭喜恭喜</p>",
                    posters: [
                        "../static/json/mateImg/1/2.jpg",
                        "../static/json/mateImg/1/3.jpg",
                        "../static/json/mateImg/1/4.jpg",
                        "../static/json/mateImg/1/1.jpg"
                    ]
                },
                {
                    id: 3,
                    content: "<h3>【女神水大牌PK，看过来】</h3>",
                    posters: [
                        "../static/json/mateImg/1/2.jpg",
                        "../static/json/mateImg/1/1.jpg"
                    ]
                },
                {
                    id: 4,
                    content:
                        "<h3>女神水使用Tips</h3><p>1.取化妆棉</p><p>2.按压</p><p>3.擦拭</p>",
                    posters: ["../static/json/mateImg/1/3.jpg"]
                }
            ]
        };
    },

    components: {
        slider
    },

    mounted:function() {
        this.$route.meta.navShow=false;
    },

    methods: {
        clickLike(item) {
            if (item.islike) {
                console.log("点赞-1啦");
                Vue.set(item, "islike", false);
            } else {
                console.log("点赞+1啦");
                Vue.set(item, "islike", true);
            }
        },
        clickImg(posters, index) {
            var _this = this;
            this.pages = [];
            posters.forEach(function(item) {
                var curimg = { style: { background: "url(" + item + ")" } };
                _this.pages.push(curimg);
            });
            this.sliderinit.currentPage = index * 1;
            this.isShowFScreen = true;
        },
        onTap(data) {
            this.isShowFScreen = false;
        },
        shareMate(curId) {
            console.log("分享素材啦！mateId = " + curId);
        },
        makeCode(curId) {
            console.log("生成二维码啦！mateId = " + curId);
        },
        downMate(curId) {
            console.log("下载素材啦！mateId = " + curId);
        }
    }
};
</script>

<style>
.mateList {
    height: 100%;
    width: 100%;
    background-color: #fff;
}
.mateContent {
    width: 100%;
    background-color: #f8f8f8;
    padding: 5% 0;
}
.matediv {
    background-color: #ffffff;
    width: 80%;
    min-height: 2.5rem;
    margin: 0 auto;
    border-radius: 0.3rem;
    padding: 5%;
    margin-bottom: 5%;
}
.matediv .mate_name {
    line-height: 1.5rem;
}
.mate_img li {
    position: relative;
    float: left;
    width: 30%;
    margin-top: 5%;
    background-color: #eeeeee;
    border-radius: 0.3rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
.mate_img li:after {
    content: "";
    display: block;
    padding-bottom: 100%;
}

.mate_img li:nth-child(3n + 2) {
    margin-right: 5%;
    margin-left: 5%;
}
.matediv .mate_hr {
    height: 1px;
    background-color: #f8f8f8;
    margin: 5% 0;
}

.matediv .mate_opear {
    height: 2rem;
}
.matediv .mate_opear .mo_list {
    float: right;
    width: 90%;
}
.matediv .mate_opear .mo_list span {
    float: right;
    height: 2rem;
    line-height: 2rem;
    padding: 0 5%;
    margin-left: 3%;
    background-color: #f8f8f8;
    border: 1px solid #c6c6c6;
    border-radius: 0.4rem;
}
.matediv .mate_opear .mo_list .mo_down {
    background-color: #ee362f;
    color: #ffffff;
    border-color: #ee362f;
}
.mo_like {
    float: left;
    color: #e7e7e7;
    height: 2rem;
    width: 2rem;
    font-size: 1.4rem;
}
.FullScreen {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    background-color: #000;
    z-index: 500;
}
.FullScreen .slider-item {
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: contain !important;
}
</style>
