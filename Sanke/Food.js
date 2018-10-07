/**
 * Created by itcast on 2018 07/11.
 */
//这里就写所有关于食物的代码.
(function (w) {
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