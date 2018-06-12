<template>
    <div class="typeList">
        <p v-if="ShowListFlag" class="nocontent_mess">暂无素材</p>
        <div class="typeContent" v-if="!ShowListFlag">
            <div class="catediv">
                <ul class="cateUl">
                    <li v-for="item in catelist" @click="selectCate(item)" :class="{'cli_active':item.active===true}" v-bind:key="item.id">{{item.cname}}</li>
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
    </div>
</template>

<script>
import Vue from "vue";

export default {
    name: "home",
    data() {
        return {
            active: false,
            ShowListFlag:true,
            catere: {
                code: 1,
                message:
                    "\u83b7\u53d6\u7d20\u6750\u7c7b\u522b\u5217\u8868\u6210\u529f\uff01",
                data: [
                    {
                        "0": "1",
                        id: "1",
                        "1": "\u5973\u795e\u6c34\u2161",
                        cname: "\u5973\u795e\u6c34\u2161",
                        "2": "2018-05-14 13:43:13",
                        createtime: "2018-05-14 13:43:13",
                        "3": "2018-05-14 13:43:13",
                        updatetime: "2018-05-14 13:43:13",
                        "4": "0",
                        deleted: "0"
                    },
                    {
                        "0": "3",
                        id: "3",
                        "1": "\u8282\u65e5",
                        cname: "\u8282\u65e5",
                        "2": "2018-05-14 14:43:10",
                        createtime: "2018-05-14 14:43:10",
                        "3": "2018-05-14 14:43:10",
                        updatetime: "2018-05-14 14:43:10",
                        "4": "0",
                        deleted: "0"
                    },
                    {
                        "0": "4",
                        id: "4",
                        "1": "\u62db\u5546",
                        cname: "\u62db\u5546",
                        "2": "2018-05-14 14:43:28",
                        createtime: "2018-05-14 14:43:28",
                        "3": "2018-05-14 14:43:28",
                        updatetime: "2018-05-14 14:43:28",
                        "4": "0",
                        deleted: "0"
                    },
                    {
                        "0": "5",
                        id: "5",
                        "1": "\u7f8e\u535a\u4f1a",
                        cname: "\u7f8e\u535a\u4f1a",
                        "2": "2018-05-14 14:43:33",
                        createtime: "2018-05-14 14:43:33",
                        "3": "2018-05-14 14:43:33",
                        updatetime: "2018-05-14 14:43:33",
                        "4": "0",
                        deleted: "0"
                    },
                    {
                        "0": "6",
                        id: "6",
                        "1": "\u70ed\u70b9",
                        cname: "\u70ed\u70b9",
                        "2": "2018-05-14 14:43:42",
                        createtime: "2018-05-14 14:43:42",
                        "3": "2018-05-14 14:43:42",
                        updatetime: "2018-05-14 14:43:42",
                        "4": "0",
                        deleted: "0"
                    },
                    {
                        "0": "7",
                        id: "7",
                        "1": "\u4ee3\u8a00\u4eba",
                        cname: "\u4ee3\u8a00\u4eba",
                        "2": "2018-05-14 14:44:06",
                        createtime: "2018-05-14 14:44:06",
                        "3": "2018-05-14 14:44:06",
                        updatetime: "2018-05-14 14:44:06",
                        "4": "0",
                        deleted: "0"
                    },
                    {
                        "0": "8",
                        id: "8",
                        "1": "\u6d4b\u8bd52",
                        cname: "\u6d4b\u8bd52",
                        "2": "2018-06-12 14:21:44",
                        createtime: "2018-06-12 14:21:44",
                        "3": "2018-06-12 14:21:48",
                        updatetime: "2018-06-12 14:21:48",
                        "4": "0",
                        deleted: "0"
                    }
                ]
            },
            catelist: [],
            typelist: [
                {
                    id: 1,
                    tname: "功效",
                    banner: "../static/json/typeBanner/1/1.jpg"
                },
                {
                    id: 2,
                    tname: "成分解析",
                    banner: "../static/json/typeBanner/1/2.jpg"
                },
                {
                    id: 3,
                    tname: "使用方法",
                    banner: "../static/json/typeBanner/1/3.jpg"
                },
                {
                    id: 4,
                    tname: "使用感受-个人",
                    banner: "../static/json/typeBanner/1/4.jpg"
                },
                {
                    id: 5,
                    tname: "成分解析",
                    banner: "../static/json/typeBanner/1/2.jpg"
                },
                {
                    id: 6,
                    tname: "使用方法",
                    banner: "../static/json/typeBanner/1/3.jpg"
                },
                {
                    id: 7,
                    tname: "使用感受-个人",
                    banner: "../static/json/typeBanner/1/4.jpg"
                },
                {
                    id: 8,
                    tname: "成分解析",
                    banner: "../static/json/typeBanner/1/2.jpg"
                }
            ],
            GetCateUrl: "http://mateweb.frangi.cn/api/mate/cate_list.php"
        };
    },

    mounted() {
        this.InitCateList();
        this.selectCate(this.catelist[0]);
    },

    methods: {
        InitCateList: function() {
            
            this.ShowListFlag = false;
            this.catelist = this.catere.data;
            // this.$http.get(this.GetCateUrl).then(
            //     response => {
            //         if (response.code == 1) {
            //             this.catelist = response.data;
            //             if (this.catelist == "") {
            //                 this.ShowListFlag = true;
            //             } else {
            //                 this.ShowListFlag = false;
            //             }
            //         } else {
            //             console.log("Server Error");
            //         }
            //     },
            //     response => {
            //         console.log("Error");
            //     }
            // );
        },
        selectCate(curcate) {
            this.$nextTick(function() {
                this.catelist.forEach(function(curcate) {
                    Vue.set(curcate, "active", false);
                });
                Vue.set(curcate, "active", true);
            });
        },
        selectType(curtype) {
            console.log("curtype=" + curtype.tname);
            this.$router.push({
                name: "matelist",
                params: { tid: curtype.tid }
            });
        }
    }
};
</script>

<style>
.typeContent {
    margin-bottom: 4.5rem;
}
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

.typeUl li {
    position: relative;
    float: left;
    text-align: center;
    width: 43%;
    margin: 5% 0 0 5%;
}
.typeUl li img {
    width: 100%;
    border-radius: 0.3rem;
}
.typeUl .tname {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.5rem;
    color: #fff;
    text-shadow: 1px 1px 1px #353535;
}
.typediv {
    margin-bottom: 3.125rem;
}
</style>
