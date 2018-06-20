import wx from 'weixin-js-sdk';

const wxApi = {
  isweixin() {
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  },
  wxRegister(callback) {
    let data = {
      params: {
        data: "urlparam=" + encodeURIComponent(window.location.href).split('#')[0]
      }
    }
    this.$http.get('/api/wxconfig/myapi.php', {
      params: params
    }).then(
      response => {
        var result = response.data;
        if (result != null) {
          wx.config({
            debug: false,
            appId: result.appId,
            timestamp: result.timestamp,
            nonceStr: result.nonceStr,
            signature: result.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems']
          });
        }
      },
      response => {
        console.log("Error");
      }
    );
    wx.ready((res) => {
      if (callback) {
        callback()
      }
    })
  },
  ShareContent(CurData) {
    let sharedata = {
      title: 'FRANGI芙蓉肌_素材中心',
      desc: '坚持使用天然珍贵的原料，运用现代发酵与纳米科技，为东方女性定制真实可见的美。',
      link: window.location.host,
      imgUrl: 'http://mateweb.frangi.cn/shareIco.png',
      success: function () {},
      cancel: function () {}
    };
    if (CurData) {
       sharedata.link = CurData.link;
	}
	console.log(sharedata);
    wx.onMenuShareAppMessage(sharedata);
    wx.onMenuShareTimeline(sharedata);
    wx.hideMenuItems({
      menuList: [
        'menuItem:share:qq',
        'menuItem:share:QZone'
      ]
    });
  }
}

export default wxApi
