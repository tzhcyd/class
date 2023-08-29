// pages/game/game.js
//方块的初始位置
var num =[
    ['00', '01', '02'],
    ['10', '11', '12'],
    ['20', '21', '22']
]
//方块的宽度
var w = 100
//图片的初始地址
var url ='/pages/images/pic01.jpg'
Page({
/**
 * 自定义函数--重新开始游戏
 */
    restartGame : function(){
        this.setData({isWin:false})
        //打乱方块顺序
        this.shuffle()
        //绘制画布内容
        this.drawCanvas()
    },

/**
 * 自定义函数 -- 判断游戏是否成功 
 */
    isWin : function(){
        //使用双重for循环遍历整个数组
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                //如果有方块位置不对
                if(num[i][j] != i*10+j){
                    return false
                }
            }
        }
        //更新成功状态
        this.setData({isWin : true})
        return true
    },
/**
 * 自定义函数 -- 监听点击方块事件
 */
    touchBox : function(e){
        //如果游戏已经成功，不做任何操作
        if(this.data.isWin){
            return
        }
         //获取被点击方块的坐标x和y
          var x = e.changedTouches[0].x
          var y = e.changedTouches[0].y
          var row = parseInt(y / w)
          var col = parseInt(x / w)
          //如果点击的不是空白位置
          if(num[row][col] != '22'){
              //尝试移动方块
              this.moveBox(row,col)
              //重新绘制画布内容
              this.drawCanvas()
              //判断游戏是否成功
              if(this.isWin()){
                  //在画面上绘制提示语句
                  let ctx = this.ctx
                  //绘制完整图片
                  ctx.drawImage(url, 0, 0)
                  //绘制文字
                  ctx.setFillStyle('#e64340')
                  ctx.setTextAlign('center')
                  ctx.setFontSize(60)
                  ctx.fillText('游戏成功',150,150)
                  ctx.draw()
              }
          }
    },
/**
 * 自定义函数 -- 移动被点击的方块
 */
    moveBox : function(i, j){
        //情况1：如果被点击的方块不在最上方，检查可否上移
        if(i>0){
            //如果方块上是空
            if(num[i-1][j]=='22'){
                //交换位置
                num[i-1][j] = num[i][j]
                num[i][j] = '22'
                return 
            }
        }
        //情况2：如果被点击的方块不在最下方，检查可否下移
        if(i<2){
            //如果方块下是空
            if(num[i+1][j]=='22'){
                //交换位置
                num[i+1][j] = num[i][j]
                num[i][j] = '22'
                return 
            }
        }
        //情况3：如果被点击的方块不在最左方，检查可否左移
        if(j>0){
            //如果方块左是空
            if(num[i][j-1]=='22'){
                //交换位置
                num[i][j-1] = num[i][j]
                num[i][j] = '22'
                return 
            }
        }
           //情况4：如果被点击的方块不在最右方，检查可否右移
           if(j<2){
            //如果方块左是空
            if(num[i][j+1]=='22'){
                //交换位置
                num[i][j+1] = num[i][j]
                num[i][j] = '22'
                return 
            }
        }
    },

    shuffle : function(){
        //先令所有方块回归初始位置
        num = [
            ['00', '01', '02'],
            ['10', '11', '12'],
            ['20', '21', '22']
        ]
        //记录当前空白方块的行和列
        var row = 2
        var col = 2
        //打乱方块顺序100次
        for(var i = 0; i < 100; i++){
            //随机产生其中一个方向：上（0）、下（1）、左（2）、右（3）
            var direction = Math.round(Math.random()*3)
            //上：0
            if(direction == 0){
                //空白方块不在最上面一行
                if(row != 0){
                    //交换位置
                    num[row][col] = num[row - 1][col]
                    num[row - 1][col] = '22'
                    //更新空白方块的行
                    row -= 1
                }
            }
            //下：1
            else if(direction == 1){
                //空白方块不在最下面一行
                if(row != 2){
                    //交换位置
                    num[row][col] = num[row + 1][col]
                    num[row + 1][col] = '22'
                    //更新空白方块的行
                    row += 1
                }
            }
            //左：2
            else if(direction == 2){
                //空白方块不在最左侧
                if(col != 0){
                    //交换位置
                    num[row][col] = num[row][col-1]
                    num[row][col-1] = '22'
                    //更新空白方块的行
                    col -= 1
                }
            }
             //右：3
             else if(direction == 3){
                //空白方块不在最左侧
                if(col != 2){
                    //交换位置
                    num[row][col] = num[row][col+1]
                    num[row][col+1] = '22'
                    //更新空白方块的行
                    col += 1
                }
            }
        }
    },

    /**
     * 自定义函数 -- 绘制画布内容
     */
    drawCanvas : function(){
        let ctx = this.ctx
        //清空画布
        ctx.clearRect(0,0,300,300)
        //使用双重for循环绘制3*3的拼图
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                if(num[i][j] != '22'){
                    //获取行和列
                    var row = parseInt(num[i][j] / 10)
                    var col = num[i][j] % 10
                    //绘制方块
                    ctx.drawImage(url, col*w, row*w,w,w,j*w,i*w,w,w)
                }
            }
        }
        ctx.draw()
    },

    /**
     * 页面的初始数据
     */
    data: {
       isWin : false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //更新图片路径地址
         url = '/pages/images/' + options.level
        //更新提示图的地址
        this.setData({url : url})
        console.log(this.data.url)
        //创建画布上下文
        this.ctx = wx.createCanvasContext('myCanvas')
        //打乱方块顺序
        this.shuffle()
        this.drawCanvas()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})