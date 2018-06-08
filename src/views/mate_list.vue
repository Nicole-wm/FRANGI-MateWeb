<template>
    <div class="mateContent">
        <div class="matediv" v-for="mate in matelist" v-bind:key="mate.id">
            <span class="mate_name" v-html="mate.content">
            </span>
            <ul class="mate_img">
                <li v-for="item in mate.posters" v-bind:key="item">
                    <img v-lazy="item" alt="item">
                </li>
            </ul>
            <div class="clearfix"></div>
            <div class="mate_hr"></div>
            <div class="mate_opear">
                <span class="fa fa-heart"></span>
                <span class="mo_ewm">生成二维码</span>
                <span class="mo_share">分享</span>
                <span class="mo_down">下载图文</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "matelist",
    data() {
        return {
            matelist: [
                { id: 1, content: "<h2><b>女神水功效和成分</b></h2><h5><span>十大无添加，八大功效，四大成分。</span></h5>",posters:["../static/json/mateImg/1/1.jpg","../static/json/mateImg/1/2.jpg","../static/json/mateImg/1/3.jpg","../static/json/mateImg/1/4.jpg"]},
                { id: 2, content: "<h3>女神水设计大奖~</h3><p>恭喜恭喜</p>",posters:["../static/json/mateImg/1/1.jpg","../static/json/mateImg/1/2.jpg","../static/json/mateImg/1/3.jpg","../static/json/mateImg/1/4.jpg"]},
                { id: 3, content: "<h3>【女神水大牌PK，看过来】</h3>",posters:["../static/json/mateImg/1/1.jpg","../static/json/mateImg/1/2.jpg","../static/json/mateImg/1/4.jpg"]},
                { id: 4, content: "<h3>女神水使用Tips</h3><p>1.取化妆棉</p><p>2.按压</p><p>3.擦拭</p>",posters:["../static/json/mateImg/1/1.jpg","../static/json/mateImg/1/2.jpg","../static/json/mateImg/1/3.jpg","../static/json/mateImg/1/4.jpg"]}
            ]
        };
    }
};
</script>

<style>
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
    line-height: 2.5rem;
}
.mate_img li {
    float: left;
    width: 30%;
    margin-top: 5%;
    background-color:beige;
    border-radius: 0.3rem;
}
.mate_img li img{
    width: 100%;
}
.mate_img li:nth-child(3n+2){
    margin-right:5%;
    margin-left:5%;
}
.matediv .mate_hr{
    height:1px;
    background-color: #f8f8f8;
    margin: 5% 0;
}

.matediv .mate_opear{
    height:3rem;
}
.matediv .mate_opear span{
    height: 2rem;
    font-size: 0.8rem;
    padding:2% 5%;
    background-color: #f8f8f8;
    border:1px solid #c6c6c6;
    border-radius: 0.4rem;
}
</style>
