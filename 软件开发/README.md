# 2023年夏季《移动软件开发》实验报告



<center>姓名：檀宗晗  学号：21020007087</center>

| 姓名和学号？         | 檀宗晗，21020007087                                          |
| -------------------- | ------------------------------------------------------------ |
| 本实验属于哪门课程？ | 中国海洋大学23夏《移动软件开发》                             |
| 实验名称？           | 实验1：第一个微信小程序                                      |
| 博客地址？           | [https://www.cnblogs.com/-tcxm](https://www.cnblogs.com/-tcxm/) |
| Github仓库地址？     | https://github.com/tzhcyd/class.git                          |

（备注：将实验报告发布在博客、代码公开至 github 是 **加分项**，不是必须做的）



## **一、实验目标**

1、学习使用快速启动模板创建小程序的方法；2、学习不使用模板手动创建小程序的方法。



## 二、实验步骤

##### 1、在微信公众平台登录微信获取AppID创建小程序

<img src="/photo/QQ截图20230822101435.png" alt="QQ截图20230822101435" style="zoom: 42%;" />

##### 2、页面配置

​	按要求删除项目中部分文件，并补全在index.js与app.js中的代码

<img src="photo/QQ截图20230822101521.png" alt="QQ截图20230822101521" style="zoom: 67%;" />

##### 3、视图设计

###### 	3.1导航栏设计

​		更改app.json文件代码如下：

```json
{
  "pages":[
    "pages/index/index"
  ],
  "window":{
    "navigationBarBackgroundColor": "#663399",
    "navigationBarTitleText": "手动创建第一个小程序",
    "navigationBarTextStyle": "white"
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json"
}

```

​		可以将导航栏背景色更改为紫色，字体为白色，效果如下图：

<img src="photo/QQ截图20230822101601.png" alt="QQ截图20230822101601" style="zoom: 80%;" />

###### 	3.2 页面设计

​		更改index.wxml代码如下：

```html
<view class = 'container'>
    <image></image>
    <text>Hello World</text>
    <button>点击获取头像和昵称</button>
</view>
```

​		可得到如下效果：

<img src="photo/QQ截图20230822101636.png" alt="QQ截图20230822101636" style="zoom:33%;" />

​		修改wxml<image>组件内容：

```html
 <image src = '/images/photo.jpg' mode = 'widthFix'></image>
```

​		并在wxss追加组件相关样式代码，可得到头像图片：

<img src="photo/QQ截图20230822101715.png" alt="QQ截图20230822101715" style="zoom:33%;" />

##### 4、逻辑实现

###### 	4.1 获取微信用户信息

​		由于微信小程序调整用户头像昵称获取规则，wx.getUserInfo()函数将统一返回默认灰色头像，昵称统一返回“微信用户”,所以这里选择wx.getUserProfile()函数来获取用户信息，修改index.wxml <button>标签代码如下：

```html
<button bindtap = "getUserProfile">点击获取头像和昵称</button>
```

​		index.js中getUserProfile函数如下：

```javascript
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息', 
      success: (res) => {
        console.log(res)
      }
    })
  }
```

​		可以在控制台看到成功获取用户信息：

![QQ截图20230822101757](photo/QQ截图20230822101757.png)

###### 		4.2使用动态数据显示头像和昵称

​			在index.wxml中修改<image>组件与<text>组件如下：

```html
    <image src = '{{src}}' mode = 'widthFix'></image>
    <text>{{name}}</text>
```

​			”{{}}“为动态数据，并在js文件中data属性追加两个动态数据的值，代码片段如下：

```javascript
data: {
    src :'/images/photo.jpg',
    name:'Hello World'
  },
```

###### 		4.3更新头像和昵称

​			修改index.js文件中getUserProfile函数代码,使获取到的信息更新到动态数据上，代码片段如下：

```javascript
 getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息', 
      success: (res) => {
        console.log(res)
        let info = res.userInfo;
        this.setData({
           src:info.avatarUrl,  //更新图片来源
           name: info.nickName   //更新昵称
        })
      }
    })
  }
```

## 三、程序运行结果	

运行前：                                                                          运行中，需经过用户同意：                                                 同意后可显示头像昵称：

​     <img src="photo/QQ截图20230822101831.png" alt="QQ截图20230822101831" style="zoom:33%;" align="left" />                                       <img src="photo/QQ截图20230822101840.png" alt="QQ截图20230822101840" style="zoom:33%;" />                                              <img src="photo/QQ截图20230822101846.png" alt="QQ截图20230822101846" style="zoom:33%;" />            

## 四、问题总结与体会

​	     刚接触HTML语言，在应用上还不太熟练，需要对着提供的代码示例来完成实验，并且在获取用户信息时一开始并没有注意到getUserInfo函数只能获取到匿名用户，并不能真正获取到用户的数据，在查阅微信开放文档后得知可以使用getUserProfile函数来获取用户信息，在更改函数后完成本次实验，课下还需要更多的时间来进行练习，才能够更好地掌握。