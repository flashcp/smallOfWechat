function Judge(index){
  horizontal(index);
  
}

function horizontal(index){
  var win_argument = 0,
    win_index_left = index,
    win_index_right = index + 1;
  console.log("state      " + this.data.array[win_index_left].state);
  console.log("argument    " + argument);

  for (var i = 0; i < 5; i++) {
    if (this.data.array[win_index_left].state !== argument && this.data.array[win_index_left].state !== 0 && win_index_left % 16 != 15) {  //左边判断
      win_argument++;
      win_index_left--;
      console.log(win_argument + "      left");
    } else if (this.data.array[win_index_right].state !== argument && this.data.array[win_index_right].state !== 0 && win_index_right % 16 != 0) {
      win_argument++;
      win_index_right++;
      console.log(win_argument + "      right");

    }
  }
}



module.exports = Judge;