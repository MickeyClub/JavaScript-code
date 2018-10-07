/**
 * Created by itcast on 2018 07/11.
 */
//所有关于蛇的代码都写在这里.
(function (window) {
  //随机产生一个十六进制的颜色的函数.
  function getColorForRandom(){
    var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];  //下标0-15
    var str = "#";
    //循环产生 6个 0-15的数.
    for(var i = 0 ; i < 6; i++){
      var num = Math.floor(Math.random()*16);
      //根据这个随机数,在arr数组中去取值.
      str += arr[num];
    }
    return str;   //"#985700"
  }



  //声明一个数组list,用来保存蛇的每一个身体对应的div
  var list = [];

  //1.蛇构造函数
  function Snake(width,height,direction){
    this.width = width || 20;
    this.height = height || 20;
    this.direction = direction || 'right';
    this.body = [
      {x:3,y:1,bgColor:'red'},
      {x:2,y:1,bgColor:'skyblue'},
      {x:1,y:1,bgColor:'pink'}
    ];
  }

  //2.把创建出来的蛇对象给显示到地图上. 显示蛇这段代码封装成一个方法,写在那里. 写在原型中.
  Snake.prototype.render = function (map) {
    //渲染新蛇之前,把原来的老蛇给删掉.
    remove(map);

    //如何显示蛇.把蛇的每一节像食物那样显示.整个蛇就显示出来了.
    for(var i = 0 ; i < this.body.length; i++){
      var snakeUnit = this.body[i]; //这样就拿到了蛇的每一节.
      //显示每一节.一样的创建div,让div拥有这一节所有显示信息.
      var div1 = document.createElement('div');
      div1.style.position = 'absolute';
      div1.style.left = snakeUnit.x * this.width + 'px';
      div1.style.top = snakeUnit.y * this.height + 'px';
      div1.style.width = this.width + "px";
      div1.style.height = this.height +'px';
      div1.style.backgroundColor = snakeUnit.bgColor;
      //把div添加到地图上
      map.appendChild(div1);
      //把div保存到list数组中.
      list.push(div1);
    }
  }


  //5.删除老蛇,其实就是删除老的坐标对应产生的div.
  function remove(map){
    //把list数组中保存的div,从map中移除.
    for(var i = 0 ; i < list.length; i++){
    	map.removeChild(list[i]);
    }
    //把list数组清空.
    list.length = 0;
  }



  //4.蛇移动的方法,写在原型中, 原因是蛇对象可以直接点出来调用.
  Snake.prototype.move = function (food,map) {
    //4.1 除了蛇头之外的蛇身体
    for(var i = this.body.length-1; i>0;i--){
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }
    //4.2 蛇头
    switch (this.direction){
      case 'up':
        this.body[0].y--;
        break;
      case 'down':
        this.body[0].y++;
        break;
      case 'left':
        this.body[0].x--;
        break;
      case 'right':
        this.body[0].x++;
        break;
    }

    //判断蛇是否吃到食物:如何蛇头的坐标和食物的坐标重合就表示蛇吃到了食物.
    var snakeHeadX = this.body[0].x * this.width;
    var snakeHeadY = this.body[0].y * this.height;
    var foodX = food.x;
    var foodY = food.y;
    //拿到蛇尾巴
    var snakeLastUnit = this.body[this.body.length-1];
    //判断是否吃到了食物
    if(snakeHeadX == foodX && snakeHeadY == foodY){
      //吃到了食物,就应该长身体.
      this.body.push({
        x:snakeLastUnit.x,
        y:snakeLastUnit.y,
        bgColor:getColorForRandom()
      });
      //产生一个新的食物(调用食物的render方法).
      food.render(map)
    }



  }


  //3.把创建蛇的构造函数给暴露在外面
  window.Snake = Snake;

}(window));