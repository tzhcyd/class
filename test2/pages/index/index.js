Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: ["河北省", "石家庄市", "裕华区"],
        now: {
            temp: "0",
            text: "未知",
            icon: "999",
            humidity: "0",
            pressure: "0",
            vis: "0",
            windDir: "0",
            windSpeed: "0",
            windScale: "0"
        }

    },
    regionChange: function (e) {
        this.setData({
            region: e.detail.value
        });
        this.getWeather()
    },

    getWeather: function () {
        let that = this;
        new Promise((resolve, reject) => {
            wx.request({
                url: 'https://geoapi.qweather.com/v2/city/lookup',
                data: {
                    location: this.data.region[1],
                    key: '23eb2b712c534b0e9cf9fd37bfb43363'
                },
                success: function (res) {
                    resolve(res.data.location[0].id);
                }
            })
        }).then((id) => {
            wx.request({
                url: 'https://devapi.qweather.com/v7/weather/now',
                data: {
                    location: id,
                    key: '23eb2b712c534b0e9cf9fd37bfb43363'
                },
                success: function (res) {
                    console.log(res.data);
                    that.setData({ now: res.data.now });
                }
            })
        })
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getWeather();

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
