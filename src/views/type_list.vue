<template>
    <div class="typeList">
        <p v-if="ShowCateFlag" class="nocontent_mess">暂无素材</p>
        <div class="typeContent" v-if="!ShowCateFlag">
            <div class="catediv">
                <ul class="cateUl">
                    <li v-for="item in catelist" @click="selectCate(item)" :class="{'cli_active':item.active===true}" v-bind:key="item.id">{{item.cname}}</li>
                </ul>
            </div>
            <p v-if="ShowTypeFlag" class="nocontent_mess">暂无素材</p>
            <div class="typediv" v-if="!ShowTypeFlag">
                <ul class="typeUl">
                    <li v-for="item in typelist" v-bind:key="item.id" v-bind:style="{backgroundImage:'url('+item.banner+')'}" @click="selectType(item)">
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
            ShowCateFlag: true,
            ShowTypeFlag: true,
            catelist: [],
            typelist: [],
            GetCateUrl: "/api/mate/cate_list.php",
            GetTypeUrl: "/api/mate/type_list.php"
        };
    },

    mounted() {
        this.InitCateList();
    },

    methods: {
        InitCateList: function() {
            this.$http.get(this.GetCateUrl).then(
                response => {
                    if (response.data.code == 1) {
                        let CurCateList = response.data.data;
                        if (
                            CurCateList === undefined ||
                            CurCateList.length == 0
                        ) {
                            this.ShowCateFlag = true;
                        } else {
                            this.ShowCateFlag = false;
                            for (let i = 0; i < CurCateList.length; i++) {
                                CurCateList[i].active = false;
                                this.catelist.push(CurCateList[i]);
                            }
                            this.selectCate(this.catelist[0]);
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
        GetTypeList: function(cateID) {
            let params = {
                cateID: cateID
            };
            this.$http.get(this.GetTypeUrl, { params: params }).then(
                response => {
                    if (response.data.code == 1) {
                        this.typelist = [];
                        let CurTypeList = response.data.data;
                        if (
                            CurTypeList === undefined ||
                            CurTypeList.length == 0
                        ) {
                            this.ShowTypeFlag = true;
                        } else {
                            this.ShowTypeFlag = false;
                            for (let i = 0; i < CurTypeList.length; i++) {
                                this.typelist.push(CurTypeList[i]);
                            }
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
        selectCate(curcate) {
            this.GetTypeList(curcate.id);
            this.$nextTick(function() {
                this.catelist.forEach(function(curcate) {
                    Vue.set(curcate, "active", false);
                });
                Vue.set(curcate, "active", true);
            });
        },
        selectType(curtype) {
            this.$router.push({
                name: "matelist",
                params: { tid: curtype.id, mid:"all",tname: curtype.tname}
            });
        }
    }
};
</script>

<style>
/* .typeContent {
    margin-bottom: 4.5rem;
} */
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

/* .typediv {
    margin-bottom: 3.125rem;
} */

.typeUl li {
    position: relative;
    float: left;
    width: 43%;
    margin: 5% 0 0 5%;
    background-color: #eeeeee;
    border-radius: 0.3rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    text-align: center;
}
.typeUl li:after {
    content: "";
    display: block;
    padding-bottom: 100%;
}
.typeUl .tname {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.5rem;
    color: #fff;
    text-shadow: 1px 1px 1px #353535;
}
.typeList{
    margin-bottom: 4.5rem;
}
</style>
