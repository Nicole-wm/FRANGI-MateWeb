<template>
    <div class="mateList">
        <p v-if="ShowMateFlag" class="nocontent_mess">暂无素材</p>
        <div class="mateContent" v-if="!ShowMateFlag">
            <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
                <div class="matediv" v-for="mate in matelist" v-bind:key="mate.id" @click="selectMate(mate)">
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
                            <span class="mo_down" @click="downMate(mate.id)">下载文字</span>
                            <!-- <span class="mo_share" @click="shareMate(mate)">分享</span> -->
                            <span class="mo_ewm" @click="makeCode(mate.id)">分享</span>
                        </span>
                    </div>
                </div>
                <button style="opacity:0;" class="cmate_btn" ref="cmate_btn">Copy</button>
            </scroller>
        </div>
        <div class="FullShare" v-if="isShowFShare">
            <img src="/static/img/wxshare.png" alt="分享" @click='onShareTap'>
        </div>
        <div class="FullScreen" v-if="isShowFScreen">
            <slider :pages="pages" :sliderinit="sliderinit" @tap='onTap'>
                <div slot="loading">loading...</div>
            </slider>
        </div>
        <div class="codeAll">
            <div class="qrCode" v-if="isShowFCode">
                <qriously class="qrCode_code" id="curcode" :value="initUrl" :size="codeSize" />
            </div>
            <div class="QCImgDiv">
                <canvas id="QCImg"></canvas>
            </div>
            <div class="scanPayImg" id="scanPayImg" ref="scanPayImg" v-bind:class="{ 'QCImgDivShow':isShowFCode}" @click='onTapCode'></div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import slider from "vue-concise-slider";
import VueQriously from "vue-qriously";
import Clipboard from "clipboard";

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
            isShowFShare: false,
            isShowFCode: false,
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
            DownMateUrl: "/api/mate/mate_down.php",
            initUrl: "http://mateweb.frangi.cn",
            codeSize: screen.width / 3
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
        this.CopyMate("FRANGI");
    },

    methods: {
        refresh: function(done) {
            //下拉刷新
            var self = this;
            setTimeout(function() {
                self.currentPage = 1;
                self.GetMateList();
                done();
            }, 1500);
        },
        infinite: function(done) {
            //上拉加载更多
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
            //初始化素材数据
            var params = {};
            return (params = {
                page: this.currentPage,
                limit: this.pageSize
            });
        },
        GetMateList: function(params) {
            //获取素材
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
            //素材点赞喜欢
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
            //素材9宫格展示
            var _this = this;
            this.pages = [];
            posters.forEach(function(item) {
                // var curimg = { style: { background: "url(" + item + ")" } };
                // _this.pages.push(curimg);
                var sliderImg = {
                    html:
                        '<div class="slider_img"><img src="' +
                        item +
                        '"></div>',
                    style: {
                        background: "#000"
                    }
                };
                _this.pages.push(sliderImg);
            });
            this.sliderinit.currentPage = index * 1;
            this.isShowFScreen = true;
        },
        onTap(data) {
            //素材9宫格关闭
            this.isShowFScreen = false;
        },
        shareMate(curMate) {
            //分享素材
            let shareUrl = this.initUrl + "/matelist/all/" + curMate.id;
            let sharedata = {
                desc: curMate.content.replace(/<[^>]*>|/g, ""),
                link: shareUrl
            };
            this.wxapi.ShareContent(sharedata);
            this.isShowFShare = true;
        },
        onShareTap(data) {
            //素材微信分享
            this.isShowFShare = false;
        },
        makeCode(curId) {
            //生成二维码
            var getPixelRatio = function(context) {
                var backingStore =
                    context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio ||
                    1;
                return (window.devicePixelRatio || 1) / backingStore;
            };

            let shareUrl = this.initUrl + "/matelist/all/" + curId;
            this.initUrl = shareUrl;
            this.isShowFCode = true;
            var oC = document.getElementById("QCImg");
            var curw = screen.width;
            var curh = screen.height;
            oC.width = curw;
            oC.height = curh;
            var oGC = oC.getContext("2d");
            var ratio = getPixelRatio(oGC);
            var yImg = new Image();
            yImg.onload = function() {
                var imgW = this.width;
                var imgH = this.height;
                if (curw < imgW) {
                    oC.width = curw * ratio;
                    oC.height = curw * imgH / imgW * ratio;
                } else {
                    oC.width = imgW * ratio;
                    oC.height = imgH * ratio;
                }
                draw(this);
            };
            yImg.src = "/static/img/codebg.jpg";
            var _self = this;
            function draw(obj) {
                var code_width = oC.width / 3;
                var code_height = code_width;
                var code_xcenter = (oC.width - code_width) / 2;
                var code_ycenter = (oC.height - code_height) / 2;
                oGC.drawImage(obj, 0, 0, oC.width, oC.height);
                let ccdcanvas = document
                    .getElementById("curcode")
                    .getElementsByTagName("canvas")[0];
                oGC.drawImage(
                    ccdcanvas,
                    code_xcenter,
                    code_ycenter,
                    code_width,
                    code_height
                );
                function convertCanvasToImage(canvas) {
                    var image = new Image();
                    image.src = canvas.toDataURL("image/png");
                    return image;
                }
                var mycanvas1 = document.getElementById("QCImg");
                var img = convertCanvasToImage(mycanvas1);
                _self.$refs.scanPayImg.html = "";
                _self.$refs.scanPayImg.append(img);
            }
        },
        onTapCode(data) {
            //清除二维码
            this.isShowFCode = false;
            var c = document.getElementById("QCImg");
            var cxt = c.getContext("2d");
            cxt.clearRect(0, 0, c.width, c.height);
        },
        downMate(curId) {
            //下载素材
            console.log("下载素材啦！mateId = " + curId);
            var obj = this.matelist.find(function(x) {
                return x.id == curId;
            });
            var CurCopyText = obj.content.replace(/<[^>]*>|/g, "");
            var CurDownImg = obj.posters;
            this.CopyMate(CurCopyText);
            this.$refs.cmate_btn.click();
            this.DownImg(obj.posters, curId);
            alert("素材文字已复制！");
        },
        CopyMate(CurCopyText) {
            var clipboard = new Clipboard(".cmate_btn", {
                text: function() {
                    return CurCopyText;
                }
            });
            clipboard.on("success", e => {
                console.log("复制成功");
                clipboard.destroy();
            });
            clipboard.on("error", e => {
                console.log("该浏览器不支持自动复制");
                clipboard.destroy();
            });
        },
        DownImg(imgs, curId) {
            for (let i = 0; i < imgs.length; i++) {
                downloadIamge(imgs[i]);
            }
            function downloadIamge(imgurl) {
                var url = imgurl;
            }
        },
        selectMate(curmate) {
            this.$router.push({
                name: "matelist",
                params: { tid: "all", mid: curmate.id }
            });
        }
    }
};
</script>

<style>
.mateContent {
    /* padding-bottom: 3rem; */
}
.mateList {
    height: 100%;
    width: 100%;
    background-color: #ffffff;
}
.mateContent {
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;
    /* padding: 5% 0; */
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
.QCImgDivShow {
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
    z-index: 5000;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: contain !important;
}
.FullShare {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;
}
.FullShare img {
    width: 100%;
}
.QCImgDiv,
.scanPayImg {
    display: none;
    background-color: #f0f3f2;
    z-index: 10000;
}
.scanPayImg img {
    width: 100%;
}
.QCImgDivShow {
    display: block;
}
.slider_img {
    width: 100%;
}
.slider_img img {
    max-width: 100%;
    height: auto;
}
</style>
