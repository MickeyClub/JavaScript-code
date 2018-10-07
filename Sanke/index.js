//这里就写所有关于食物的代码.
;(function (w) {
  //声明一个list数组,用来存放显示食物的div.
  var list = [];

  //1分析得出,小食物是有宽由高的,有背景色,有定位的坐标的,所以他是一个对象,有对象就应该有成创建对象的构造函数.
  function Food(width,height,bgColor,x,y){
    this.width = width || 20;
    this.height = height || 20;
    this.bgColor = bgColor || 'green';
    this.x = x || 0;
    this.y = y || 0;
  }

  //2.让食物对象显示在地图上. 显示在地图上的代码封装成一个函数. 封装成的这个函数写在哪儿? 封装在原型中.
  //a.写在原型中,要显示的食物对象可以直接调用.  b.每一个实例化的食物对象,都要显示.
  Food.prototype.render = function (map) {
    //渲染新食物之前,把老食物给删掉
    remove(map);

    //2.1 计算一个随机的坐标
    this.x = Math.floor(Math.random() * map.offsetWidth/this.width) * this.width;
    this.y = Math.floor(Math.random() * map.offsetHeight/this.height) * this.height;
    //2.2 创建一个div,让这个div拥有这个食物对象所有的显示信息
    var div1 = document.createElement('div');
    div1.style.position = 'absolute';
    div1.style.left = this.x + 'px';
    div1.style.top = this.y+'px';
    div1.style.width = this.width+'px';
    div1.style.height = this.height+"px";
    div1.style.backgroundColor = this.bgColor;
    //2.3 把这个div追加到地图map中
    map.appendChild(div1);
    //2.4 把这个div存进list数组中.
    list.push(div1);
  }


  //4.写一个方法,删掉老食物  私有方法
  function remove(map){
    //从list数组中找到食物div,从而从map中移除这个div
    for(var i = 0 ; i < list.length; i++){
      map.removeChild(list[i]);
    }
    //清空list数组
    list.length = 0;
  }



  //3. 要把构造函数Food,暴露在外面.
  w.Food = Food;//这句话的意思就是把这个构造函数Food,赋值给window对象的属性Food.


}(window));


//------------------------------------------------------------------------------------------
//所有关于蛇的代码都写在这里.
;(function (window) {
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


//---------------------------------------------------------------------------------------
//这里就写所有关于游戏逻辑的代码.
;(function (w) {
  //声明一个全局变量that,让这个变量保存游戏game对象.
  var that = null;

  //1.创建游戏对象的构造函数
  function Game(map){
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    //给that赋值
    that = this;
  }


  //2.游戏开始方法. 写在原型中好,游戏对象直接可以点出来.
  Game.prototype.startGame = function () {
    //2.1 显示食物对象
    this.food.render(this.map);
    //2.2 显示蛇对象
    this.snake.render(this.map);

    //2.3
    // //让蛇动起来,实际上就是调用蛇的move方法.
    // this.snake.move();
    // //把新坐标的蛇给渲染出来.
    // this.snake.render(this.map);
    //想让蛇不停的动起来.怎么做? 上面两句代码就是让蛇动一下,那写一个计时器不停的调用这两句话,不就让蛇不停的动起来吗.
    snakeAutoMove();

    //2.4 根据键盘按键,改变蛇移动的方向.
    bindKey();
  }

  //5.根据键盘按键,改变蛇移动的方向.
  function bindKey(){
    //给页面设置一个键盘按下事件,从而获取你到底按的是那个键.
    window.onkeydown = function (e) {
      //console.log(e.keyCode); //左键37 上键38 右键39 下键40
      switch (e.keyCode){
        case 37:
          //修改蛇的方向为左
          if(this.snake.direction != 'right'){
            this.snake.direction = 'left';
          }
          break;
        case 38:
          //修改蛇的方向为上
          if(this.snake.direction != 'down'){
            this.snake.direction = 'up';
          }
          break;
        case 39:
          //修改蛇的方向为右
          if(this.snake.direction != 'left'){
            this.snake.direction = 'right';
          }
          break;
        case 40:
          //修改蛇的方向为下
          if(this.snake.direction != 'up'){
            this.snake.direction = 'down';
          }
          break;
      }
    }.bind(that);
  }


  //4.写一个方法,就是不停的让蛇动起来
  function snakeAutoMove(){
    var timerId = setInterval(function () {
      //console.log(this);//window
      //console.log(this.snake); //undefiend
      //报错的原因是当前这个this是window,而window对象中没有蛇,所以this.snake就是undefined.那undefined.move()肯定报错.

      //为什么这里的this是window? 怎么样把这个this改成游戏game对象.
      //bind()方法


      //让蛇动起来,实际上就是调用蛇的move方法.
      this.snake.move(this.food,this.map);
      //把新坐标的蛇给渲染出来.
      this.snake.render(this.map);

      //判断是否出界:判断蛇头的坐标是否超出了地图.
      var snakeHeadX = this.snake.body[0].x * this.snake.width;
      var snakeHeadY = this.snake.body[0].y * this.snake.height;
      if(snakeHeadX < 0 || snakeHeadY < 0 || snakeHeadX >= this.map.offsetWidth || snakeHeadY >= this.map.offsetHeight){
        //结束游戏,清空计时器.
        alert('Game Over!');
        clearInterval(timerId);
      }


    }.bind(that),300);
  }



  //3.把游戏对象的构造函数Game给暴露出去
  w.Game = Game;

}(window));