# 2023年夏季《移动软件开发》实验报告



<center>姓名：檀宗晗  学号：21020007087</center>

| 姓名和学号？         | 檀宗晗，21020007087                                          |
| -------------------- | ------------------------------------------------------------ |
| 本实验属于哪门课程？ | 中国海洋大学23夏《移动软件开发》                             |
| 实验名称？           | 实验5：高校新闻网                                            |
| 博客地址？           | [https://www.cnblogs.com/-tcxm](https://www.cnblogs.com/-tcxm/) |
| Github仓库地址？     | https://github.com/tzhcyd/class.git （在dev分支）            |

（备注：将实验报告发布在博客、代码公开至 github 是 **加分项**，不是必须做的）



## **一、实验目标**

1、综合所学知识创建完整的前端新闻小程序项目；能够在开发过程中熟练掌握真机预览、调试等操作。

## 二、实验步骤

#### 1、页面配置

​	根据要求创建页面文件并删除和修改文件

<img src="/截屏/QQ截图20230904134540.png" alt="QQ截图20230904134540" style="zoom:50%;" />

​	并创建其他自定义文件，包括images文件夹，用于存放图片素材；utils文件夹，用于存放公共js文件，并将tabbar中用到的两组图标文件放入images文件夹中；在utils文件夹中创建公共函数common.js

<img src="/截屏/QQ截图20230904134956.png" alt="QQ截图20230904134956" style="zoom:50%;" />

#### 2、视图设计

##### 2.1导航栏设计

​	在app.json文件中做如下更改：

```json
"window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#328eeb",
    "navigationBarTitleText": "我的新闻网",
    "navigationBarTextStyle":"white"
  },
```

​	可实现背景色为蓝色、字体为白色，效果如下图：

<img src="/截屏/QQ截图20230904135227.png" alt="QQ截图20230904135227" style="zoom:50%;" />

##### 2.2tabBar设计

​	在app.json追加相关属性代码如下：

```json
"tabBar": {
      "color": "#000",
      "selectedColor": "#328eeb",
      "list": [
          {
              "pagePath": "pages/index/index",
              "iconPath": "/pages/images/index.png",
              "selectedIconPath": "/pages/images/index_blue.png",
              "text": "首页"
          },
          {
              "pagePath": "pages/my/my",
              "iconPath": "/pages/images/my.png",
              "selectedIconPath": "/pages/images/my_blue.png",
              "text": "我的"
          }
      ]
  },
```

​	pagespath为选中后跳转页面，iconPath为未选中时图标地址，selectedIconPath为选中时图标地址，得到的效果图如下：

<img src="/截屏/QQ截图20230904135808.png" alt="QQ截图20230904135808" style="zoom:67%;" />

##### 2.3页面设计

###### 2.3.1首页设计

首页包含两部分内容，幻灯片滚动和新闻列表，幻灯片滚动使用swiper组件来实现

wxml代码如下：

```html
<swiper indicator-dots autoplay intervals = "5000" duration = "500">
    <block wx:for="{{swiperImg}}" wx:key="swiper{{index}}">
        <swiper-item>
            <image src = "{{item.src}}" class = "slide-image"></image>
        </swiper-item>
    </block>
</swiper>
<view id = "news-list">
    <viwe class = 'list-item' wx:for="{{newsList}}" wx:for-item = "news" wx:key="{{news.id}}">
        <image src = '{{news.poster}}'></image>
        <text>{{news.title}}--{{news.add_date}}</text>
    </viwe>
</view>
```

wxss代码如下：

```css
swiper{
    height: 400rpx;
}

swiper image{
    width: 100%;
    height: 100%;
}

#news-list{
    min-height: 600rpx;
    padding: 15rpx;
}

.list-item{
    display: flex;
    flex-direction: row;
    border-bottom: 1rpx solid gray;
}

.list-item image{
    width: 230rpx;
    height: 150rpx;
    margin: 10rpx;
}

.list-item text {
    width: 100%;
    line-height: 60rpx;
    font-size: 10pt;
}
```

js数据部分代码如下：

```js
 data: {
    swiperImg: [
        {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg'},
        {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage2.jpg'},
        {src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage3.jpg'}
      ],
      newsList : [{
          id:'264698',
          title : '俄罗斯联邦驻华大使杰尼索夫会见校党委书记顾家山一行并接受《力冈译文全集》赠与',
          poster : 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg',
          add_date : '2018-03-05'
      }]
  },
```

得到的效果如下图：

<img src="/截屏/QQ截图20230904142046.png" alt="QQ截图20230904142046" style="zoom:50%;" />

###### 2.3.2个人中心页设计

​	包括登录面板和“我的收藏”，登录面板用于显示用户的微信头像和昵称，我的收藏用于显示收藏在本地的新闻列表

wxml代码如下：

```html
<view id="myLogin">
    <block>
        <image id="myIcon" src = '{{src}}'></image>
        <text id="nickName">{{nickName}}</text>
    </block>
</view>

<view id="myFavorites">
    <text>我的收藏(1)</text>
    <view id="news-list">
        <view class = 'list-item' wx:for="{{newsList}}" wx:for-item = "news" wx:key="{{news.id}}">
            <image src = '{{news.poster}}'></image>
            <text>{{news.title}}--{{news.add_date}}</text>
        </view>
    </view>
</view>
```

wxss代码如下（由于新闻列表样式与首页相同，故将index.wxss样式代码挪到app.wxss中公共使用）：

```js
#myLogin{
    background-color: #328eeb;
    height: 400rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

#myIcon{
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
}

#nickName{
    color: white;
}
#myFavorites{
    padding: 20rpx;
}
```

js数据代码如下：

```js
data: {
        nickName : '未登录',
        src:'../images/index.png',
        newsList:[{
            id : '264698',
            title : '俄罗斯联邦驻华大使杰尼索夫会见校党委书记顾家山一行并接受《力冈译文全集》赠与',
            poster:'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg',
            add_date :'2018-03-05'
        }]
    },
```

效果如下图：

<img src="/截屏/QQ截图20230904143727.png" alt="QQ截图20230904143727" style="zoom:50%;" />

###### 2.3.3新闻页设计

​	wxml代码如下：

```html
<view class="container">
    <view class = 'title'>{{article.title}}</view>
    <view class="poster">
        <image src = '{{article.poster}}' mode="widthFix"></image>
    </view>
    <view class="content">{{article.content}}</view>
    <view class='add_date'>时间：{{article.add_date}}</view>
</view>
```

wxss代码如下：

```css
.container{
    padding: 15rpx;
    text-align: center;
}
.title{
    font-size: 14pt;
    line-height: 80rpx;
}
.poster image{
    width: 100%;
}

.content{
    text-align: left;
    font-size: 12pt;
    line-height: 60rpx;
}
.add_date{
    font-size: 12pt;
    text-align: right;
    line-height: 30rpx;
    margin-right: 25rpx;
    margin-top: 20rpx;
}
```

js数据如下：

```js
article:{
            id : '264698',
            title : '省退役军人事务厅来校交流对接工作',
            poster:'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg',
            add_date :'2022-08-19',
            content : '8月19日，省退役军人事务厅二级巡视员蔡元和、办公室主任刘恒贵、就业创业处副处长钟俊武一行来校就联合共建安徽退役军人学院事宜进行交流对接。校党委常委、副校长陆林，芜湖市退役军人事务局党组成员、副局长张桂芬，学校办公室、人事处、教务处、招就处、学生处、研究生院、体育学院负责同志参加会议。'
        }
```

得到效果如图：

<img src="/截屏/QQ截图20230904144848.png" alt="QQ截图20230904144848" style="zoom:50%;" />

#### 3、逻辑实现

##### 3.1公共逻辑

​	common.js使用老师提供的文件，里面含有三条新闻记录作为示范，并在其中添加自定义函数getNewList与getNewsDetail函数，分别用于获取新闻列表信息和指定ID的新闻正文内容，代码如下：

```js
//获取新闻列表
function getNewsList() {
  let list = [];
  for (var i = 0; i < news.length; i++) {
    let obj = {};
    obj.id = news[i].id;
    obj.poster = news[i].poster;
    obj.add_date = news[i].add_date;
    obj.title = news[i].title;
    list.push(obj);
  }
  return list; //返回新闻列表
}

//获取新闻内容
function getNewsDetail(newsID) {
  let msg = {
    code: '404', //没有对应的新闻
    news: {}
  };
  for (var i = 0; i < news.length; i++) {
    if (newsID == news[i].id) { //匹配新闻id编号
      msg.code = '200'; //成功
      msg.news = news[i]; //更新当前新闻内容
      break;
    }
  }
  return msg; //返回查找结果
}
```

​	并且需要再common.js文件最后使用module.exports暴露函数出口，代码如下：

```js
// 对外暴露接口
module.exports = {
  getNewsList: getNewsList,
  getNewsDetail: getNewsDetail
}
```

​	需要在各页面的js文件中引用公共js文件，代码如下：

```js
var common = require('../utils/common')
```

##### 3.2首页逻辑

###### 3.2.1新闻列表展示

​	新闻列表展示使用了{{newsList}}，因此需在页面的js文件的onLoad函数中获取新闻列表，并更新到data的属性newsList中，代码如下：

```js
 onLoad: function (options) {
    let list = common.getNewsList()
    this.setData({newsList:list})
  },

```

###### 3.2.2点击跳转新闻内容

​	wxml代码如下（新增了bindtap事件，用于点击跳转）：

```html
<view id = "news-list">
    <viwe class = 'list-item' wx:for="{{newsList}}" wx:for-item = "news" wx:key="{{news.id}}">
        <image src = '{{news.poster}}'></image>
        <text bindtap="goToDetail" data-id="{{news.id}}">{{news.title}}--{{news.add_date}}</text>
    </viwe>
</view>
```

​	跳转函数如下（跳转时使用了data-id属性携带了新闻ID编号）：

```js
goToDetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
},
```

​	此时已经可以实现点击跳转功能，但是还需要再detail页面进行携带数据的接受处理才可显示正确的新闻内容。

##### 3.3新闻页逻辑

###### 3.3.1显示对应新闻

​	在首页逻辑中已经实现页面跳转并携带ID编号，现在实现在新闻页接受ID，代码如下：

```js
onLoad(options) {
        let id = options.id
        let result = common.getNewsDetail(id)
        if(result.code == '200'){
            this.setData({article:result.news})
        }
    },
```

​	此时可以实现显示正确的标题以及内容，效果如下：

<img src="/截屏/QQ截图20230904151008.png" alt="QQ截图20230904151008" style="zoom:50%;" />

###### 3.3.2添加/取消新闻收藏

wxml中追加两个button按钮，并使用wx:if 与wx:else属性使其每次只存在一个，wxml代码如下：

```html
 <button wx:if="{{isAdd}}" plain bindtap="cancelFavorities">已收藏</button>
    <button wx:else plain bindtap="addFavorites">点击收藏</button>
```

wxss样式如下：

```css
button{
    width: 250rpx;
    height: 100rpx;
    margin: 20rpx auto;
}
```

js文件onLoad函数修改如下：

```js
 onLoad(options) {
        let id = options.id
        var article = wx.getStorageSync(id)
        if(article !=''){
            this.setData({
                article : article,
                isAdd :true
            })
        }
        else{
            let result = common.getNewsDetail(id)
            if(result.code == '200'){
                this.setData({
                    article:result.news,
                isAdd:false
                })
            }
        }
    },
```

​	并追加addFavorites与cancalFavorites函数用来添加到收藏夹与取消收藏，此功能使用本地缓存来解决，wx.setStorageSync可以添加到本地缓存，并将isAdd书籍设置为true，表示已收藏，wx.removeStorageSync可以从本地缓存中删除，由此实现收藏效果。

收藏前效果如图：



<img src="/截屏/QQ截图20230904152515.png" alt="QQ截图20230904152515" style="zoom:50%;" />

收藏后效果如图：

<img src="/截屏/QQ截图20230904152530.png" alt="QQ截图20230904152530" style="zoom:50%;" />

##### 3.4个人中心页逻辑

###### 3.4.1获取微信用户信息

​	在my.wxml页面追加button组件作为登录按钮，并且使用wx:if与wx:else属性让未登录时只显示按钮，登录后只显示头像和昵称，wxml代码如下：

```html
<view id="myLogin">
    <block wx:if="{{isLogin}}">
        <image id="myIcon" src = '{{src}}'></image>
        <text id="nickName">{{nickName}}</text>
    </block>
    <button wx:else bindtap = "getUserProfile">未登录，点此登录</button>
</view>
```

js获取用户信息函数如下：

```js
getUserProfile(e) {
        let that = this
        wx.getUserProfile({
        desc: '展示用户信息',
        success: (res) => {
        console.log(res)
        that.setData({
            isLogin : true,
            src : res.userInfo.avatarUrl,
            nickName : res.userInfo.nickName
        })
       }
     })
   },
```

得到的效果如图：

登录前：

<img src="/截屏/QQ截图20230904153628.png" alt="QQ截图20230904153628" style="zoom:50%;" />

登录后：

<img src="/截屏/QQ截图20230904153637.png" alt="QQ截图20230904153637" style="zoom:50%;" />

###### 3.4.2获取收藏列表

修改my.wxml代码，改为动态数据：

```html
<text>我的收藏({{num}})</text>
```

在js文件中追加getMyfavorites函数，用于展示收藏列表：

```js
getMyFavorites:function(){
    let info = wx.getStorageInfoSync();
    let keys = info.keys;
    let num = keys.length;
    let myList = [];
    for(var i = 0; i < num; i++){
        let obj = wx.getStorageSync(keys[i]);
        myList.push(obj);
    }
    this.setData({
        newsList : myList,
        num : num
    })
},
```

现在登录后收藏效果如下：

<img src="/截屏/QQ截图20230904155029.png" alt="QQ截图20230904155029" style="zoom:50%;" />

​	考虑到登录成功后用户可以手动更改新闻的收藏状态，因此修改my.js中的onshow函数，判断如果是登录状态就刷新一下收藏列表，代码如下：

```js
   onShow() {
        if(this.data.isLogin){
            this.getMyFavorites();
        }
    },
```

###### 3.4.3浏览收藏的新闻

​	在my.wxml添加bindtap属性用于跳转页面，并使用data-id携带新闻ID编号，代码如下：

```html
<text bindtap="goToDetail" data-id="{{news.id}}">{{news.title}}--{{news.add_date}}</text>
```

在my.js中添加goToDetail函数的内容，代码如下：

```js
goToDetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
},
```

​	即可实现浏览收藏新闻的功能

###### 3.4.4清除临时数据

​	需要清除的数据如下：

​	首页：data中的临时新闻列表数据（newsList）

​	新闻页：data中的临时新闻数据（article）

​	个人中心页：data中的临时收藏夹新闻数据（newsList）、临时昵称（nickName）、临时头像路径地址（src）

## 三、程序运行结果	

首页：

<img src="/截屏/QQ截图20230904161056.png" alt="QQ截图20230904161056" style="zoom:50%;" />

新闻详情：

<img src="/截屏/QQ截图20230904161105.png" alt="QQ截图20230904161105" style="zoom:50%;" />

我的：

<img src="/截屏/QQ截图20230904161116.png" alt="QQ截图20230904161116" style="zoom:50%;" />

## 四、问题总结与体会

​	   本次实验让我掌握了综合创建完整的前端新闻小程序项目，掌握了tabBar的使用方法，了解到了微信的本地缓存，该功能可以实现收藏功能，wx.setStorageSync可以添加到本地缓存，wx.removeStorageSync可以从本地缓存中删除。

​	在utils文件夹中可以创建公共函数common.js，并且需要再common.js文件最后使用module.exports暴露函数出口，在各页面需要在js文件中引用公共js文件，代码如下：

```js
var common = require('../utils/common')
```

在此之后即可使用公共函数。本次实验学习到了许多新知识，课下还需再消化一下。