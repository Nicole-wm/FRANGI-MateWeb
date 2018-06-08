<template>
    <div class="typeContent">
        <div class="catediv">
            <ul class="cateUl">
                <li v-for="item in catelist" @click="selectCate(item)" :class="{'cli_active':item.active===true}" v-bind:key="item.id">{{item.catename}}</li>
            </ul>
        </div>
        <div class="typediv">
            <ul class="typeUl">
                <li v-for="item in typelist" @click="selectType(item)" v-bind:key="item.id">
                    <img v-lazy="item.banner" alt="item.tname">
                    <span class="tname">{{item.tname}}</span>
                </li>
            </ul>
        </div>
        <div class="clearfix"></div>
    </div>
</template>

<script>
import Vue from "vue";

export default {
    name: "home",
    data() {
        return {
            active: false,
            catelist: [
                { id: 1, catename: "早安晚安" },
                { id: 2, catename: "产品知识" },
                { id: 3, catename: "品牌实力" },
                { id: 4, catename: "活动类" },
                { id: 5, catename: "招商类" },
                { id: 6, catename: "护肤知识" },
                { id: 7, catename: "节日类" }
            ],
            typelist:[
                { id:1,tname:"功效",banner:"../static/json/typeBanner/1/1.jpg"},
                { id:2,tname:"成分解析",banner:"../static/json/typeBanner/1/2.jpg"},
                { id:3,tname:"使用方法",banner:"../static/json/typeBanner/1/3.jpg"},
                { id:4,tname:"使用感受-个人",banner:"../static/json/typeBanner/1/4.jpg"}
            ]
        };
    },

    mounted() {
        this.selectCate(this.catelist[0]);
    },

    methods: {
        selectCate(item) {
            this.$nextTick(function() {
                this.catelist.forEach(function(item) {
                    Vue.set(item, "active", false);
                });
                Vue.set(item, "active", true);
            });
        }
    }
};
</script>

<style>
.cateUl {
    font-size: 0.875rem;
    text-align: center;
    width: auto;
    height: 3rem;
    line-height: 3rem;
    border-bottom: 1px solid #eeeeee;
    white-space: nowrap;
    overflow-x: auto;
}
.cateUl li {
    height: 2.9rem;
    padding: 0 1rem;
    margin: 0 1rem;
    display: inline-block;
}
.cateUl .cli_active {
    border-bottom: 0.1rem solid #bf9b5f;
}

.typeUl li{
    position: relative;
    float: left;
    text-align: center;
    width: 43%;
    margin: 5% 0 0 5% ;
}
.typeUl li img{
    width: 100%;
    border-radius:0.3rem;
}
.typeUl .tname{
    position: absolute;
    left:0;
    right:0;
    bottom:0.5rem;
    color: #fff;
    text-shadow:1px 1px 1px #353535;
}
</style>
