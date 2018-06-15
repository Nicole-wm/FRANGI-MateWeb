<template>
    <div class="mateList">
        <p v-if="ShowMateFlag" class="nocontent_mess">暂无素材</p>
        <div class="mateContent" v-if="!ShowMateFlag">
            <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
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
                </div>
            </scroller>
        </div>
        <div class="FullScreen" v-if="isShowFScreen">
            <slider :pages="pages" :sliderinit="sliderinit" @tap='onTap'>
                <div slot="loading">loading...</div>
            </slider>
        </div>
        <div class="qrCode" v-if="isShowFCode" @click='onTapCode'>
            <div class="qrCode_content">
                <img class="qrCode_img" src="/static/img/codebg.jpg" alt="cdbg">
                <qriously class="qrCode_code" :value="initQCode" :size="codeSize" />
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import slider from "vue-concise-slider";
import VueQriously from "vue-qriously";
Vue.use(VueQriously);

export default {
    name: "matelist",
    data() {
        return {
            ShowMateFlag: true,
            totalPage: 1,
            currentPage: 1,
            pageSize: 5,
            isShowFScreen: false,
            isShowFCode: true,
            pages: [],
            sliderinit: {
                direction: "horizontal",
                thresholdDistance: 100,
                thresholdTime: 300,
                loop: true,
                infinite: 1,
                slidesToScroll: 1
            },
            matelist: [],
            GetMateUrl: "/api/mate/mate_list.php",
            UpdateMateUrl: "/api/mate/mate_update.php",
            initQCode: "http://mateweb.frangi.cn",
            codeSize: 150
        };
    },

    components: {
        slider
    },

    created: function() {
        if (this.$route.params.tname) {
            document.title = "FRANGI_" + this.$route.params.tname;
        }
    },

    mounted: function() {
        this.GetMateList();
    },

    methods: {
        refresh: function(done) {
            var self = this;
            setTimeout(function() {
                self.currentPage = 1;
                self.GetMateList();
                done();
            }, 1500);
        },

        infinite: function(done) {
            var self = this;
            if (self.currentPage < self.totalPage) {
                setTimeout(function() {
                    self.GetMateList(self.InitPage(self.currentPage));
                    done();
                }, 1500);
            } else {
                setTimeout(() => {
                    this.$refs.my_scroller.finishInfinite(2);
                });
                return;
            }
        },

        InitPage: function(currentPage) {
            var params = {};
            return (params = {
                page: this.currentPage,
                limit: this.pageSize
            });
        },
        GetMateList: function(params) {
            var params = params;
            if (!params) {
                this.matelist = [];
                params = this.InitPage(1);
            } else {
                params = params;
            }

            let CurTID = this.$route.params.tid * 1;
            let CurMID = this.$route.params.mid * 1;

            if (!isNaN(CurTID)) {
                params["typeID"] = CurTID;
            }
            if (!isNaN(CurMID)) {
                params["mateID"] = CurMID;
            }

            this.$http.get(this.GetMateUrl, { params: params }).then(
                response => {
                    if (response.data.code == 1) {
                        let mateCount = response.data.data.count;
                        let CurMateList = response.data.data.results;
                        this.totalPage = Math.ceil(mateCount / this.pageSize);

                        if (
                            CurMateList === undefined ||
                            CurMateList.length == 0
                        ) {
                            this.ShowMateFlag = true;
                        } else {
                            this.ShowMateFlag = false;
                            for (let i = 0; i < CurMateList.length; i++) {
                                CurMateList[i].posters = CurMateList[i].posters;
                                this.matelist.push(CurMateList[i]);
                            }
                            this.currentPage++;
                        }
                    } else {
                        console.log("Server Error");
                    }
                },
                response => {
                    console.log("Error");
                }
            );
        },
        clickLike(item) {
            let params = {
                id: item.id,
                type: item.islike
            };
            this.$http.get(this.UpdateMateUrl, { params: params }).then(
                response => {
                    if (response.data.code == 1) {
                    } else {
                        console.log("Server Error");
                    }
                },
                response => {
                    console.log("Error");
                }
            );
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
            let shareUrl = "http://mateweb.frangi.cn/matelist/all/" + curId;
            console.log("分享素材啦！shareUrl = " + shareUrl);
        },
        makeCode(curId) {
            this.initQCode = "http://mateweb.frangi.cn/matelist/all/" + curId;
            this.isShowFCode = true;
            console.log("生成二维码啦！Url = " + this.initQCode);
        },
        onTapCode(data) {
            this.isShowFCode = false;
        },
        downMate(curId) {
            console.log("下载素材啦！mateId = " + curId);
        }
    }
};
</script>

<style>
.mateContent {
    padding-bottom: 3rem;
}
.mateList {
    height: 100%;
    width: 100%;
    background-color: #fff;
}
.mateContent {
    width: 100%;
    height: 100%;
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
.FullScreen,
.qrCode {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    background-color: #000;
    z-index: 9999;
}
.FullScreen .slider-item {
    z-index: 9999;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: contain !important;
}
.qrCode {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f0f3f2;
    z-index: 10000;
}
.qrCode .qrCode_content {
    width: 100%;
}
.qrCode_content .qrCode_img {
    width: 100%;
}
.qrCode_content .qrCode_code canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.75;
}
/* .qrCode .cdbg {
    width: 100%;
}
.qrCode .codeimg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: #000;
} */
</style>
