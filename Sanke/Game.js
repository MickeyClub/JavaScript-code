/**
 * Created by itcast on 2018 07/11.
 */
//这里就写所有关于游戏逻辑的代码.
(function (w) {
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