//index.js
var judge = require("./judge.js");

var array1 = [], k = 0, i, j;
var num = (function(){
  for(i = 0; i < 16; i++){
    for(j = 0;j<16;j++){
      array1.push({"state":0});
      ++k;
    }
  }
  console.log(array1);
})();

// 1表示下白子，2表示下黑子
var argument=1;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    array:array1,
    reminder:"白棋先手",
    fall_function:'Fall'
  },

// 重新开始
  restart:function(){
    var n = 0;
    for(n; n<256; n++){
      array1[n].state = 0;
    }
    argument = 1;
    this.setData({
      array: array1,
      over: false,
      reminder:"白棋先手"
    })    
  },

  gameOver: function () {  // 游戏结束
    this.setData({
      over: true,
      reminder: " ",
    })
  },
  
  // 落子
  Fall: function (e) {
    var index = e.currentTarget.dataset.key;   
    if (this.data.array[index].state == 1 || this.data.array[index].state == 2) {
      this.data.array[index].state = 0;
      if (argument == 2){
        argument = 1;
      }
      else{
        argument = 2;
      }
    } else if (this.data.array[index].state == 0 && argument == 1) {
      this.data.array[index].state = 1;
      argument = 2;
      this.setData({
        reminder: "执黑落子",
      })
    } else if (this.data.array[index].state == 0 && argument == 2){
      this.data.array[index].state = 2;
      argument = 1;
      this.setData({
        reminder: "执白落子",
      })
    }
    this.setData({
      array: this.data.array,
    })
    console.log(this.data.array);

    // -----------------------------------------------横线判断胜负
    var win_argument = 0, 
        win_index_left = index, 
        win_index_right = index+1;
    console.log("state      " + this.data.array[win_index_left].state);
    console.log("argument    " + argument);
        
    for(var i=0;i<5;i++){
      if (win_index_left >= 0 && this.data.array[win_index_left].state !== argument && this.data.array[win_index_left].state !== 0 && win_index_left % 16 != 15){  //左边判断
        win_argument++;
        win_index_left--;
        console.log(win_argument + "      left");        
      } else if (win_index_right <= 255 && this.data.array[win_index_right].state !== argument && this.data.array[win_index_right].state !== 0 && win_index_right % 16 != 0){
        win_argument++;
        win_index_right++;
        console.log(win_argument + "      right");        
      }
    }

    // -------------------------------------竖线
    var win_index_up = 0,win_index_down=0;
    if (win_argument !== 5){
        win_argument = 0,
        win_index_up = index,
        win_index_down = index + 16;
      for (var i = 0; i < 5; i++) {
        if (win_index_up >= 0 && this.data.array[win_index_up].state !== argument && this.data.array[win_index_up].state !== 0) {  //上边判断
          win_argument++;
          win_index_up -= 16;
        } else if (win_index_down <= 255 && this.data.array[win_index_down].state !== argument && this.data.array[win_index_down].state !== 0) {
          win_argument++;
          win_index_down +=16;
        }
      }
}

        // -------------------------------------竖线
    var win_index_up = 0,win_index_down=0;
    if (win_argument !== 5){
        win_argument = 0,
        win_index_up = index,
        win_index_down = index + 16;
      for (var i = 0; i < 5; i++) {
        if (win_index_up >= 0 && this.data.array[win_index_up].state !== argument && this.data.array[win_index_up].state !== 0) {  //上边判断
          win_argument++;
          win_index_up -= 16;
        } else if (win_index_down <= 255 && this.data.array[win_index_down].state !== argument && this.data.array[win_index_down].state !== 0) {
          win_argument++;
          win_index_down +=16;
        }
      }
}

    // -------------------------------------左斜线
    var win_index_left_up = 0, win_index_left_down = 0;
    if (win_argument !== 5) {
      win_argument = 0,
      win_index_left_up = index,
      win_index_left_down = index + 17;
      for (var i = 0; i < 5; i++) {
        if (win_index_left_up >= 0 && this.data.array[win_index_left_up].state !== argument && this.data.array[win_index_left_up].state !== 0 && win_index_left_up % 16 !== 15) {  //左斜边判断
          win_argument++;
          win_index_left_up -= 17;
        } else if (win_index_left_down <= 255 && this.data.array[win_index_left_down].state !== argument && this.data.array[win_index_left_down].state !== 0 && win_index_left_down % 16 !== 0) {
          win_argument++;
          win_index_left_down += 17;
        }
      }
    }

    // -------------------------------------右斜线
    var win_index_right_up = 0, win_index_right_down = 0;
    if (win_argument !== 5) {
      win_argument = 0,
      win_index_right_up = index,
      win_index_right_down = index + 15;
      for (var i = 0; i < 5; i++) {
        if (win_index_right_up >= 0 && this.data.array[win_index_right_up].state !== argument && this.data.array[win_index_right_up].state !== 0 && win_index_right_up % 16 != 15) {  //右斜判断
          win_argument++;
          win_index_right_up -= 15;
        } else if (win_index_right_down <= 255 && this.data.array[win_index_right_down].state !== argument && this.data.array[win_index_right_down].state !== 0 && win_index_right_down % 16 != 0) {
          win_argument++;
          win_index_right_down += 15;
        }
      }
    }

    if (win_argument == 5 && argument == 2){
      this.setData({
        game_over: "白棋胜出",
      })
      this.gameOver();
    } else if (win_argument == 5 && argument == 1){
      this.setData({
        game_over: "黑棋胜出",
      })
      this.gameOver();      
    }
  },
})
