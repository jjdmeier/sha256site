//I'm defining these variables here so they're accessible
//in the init and other child scopes

//rootNode needs to be accessible from everything
//but no guarantee that the DOM is ready
//to do an ID lookup right now, so assign it in init
let rootNode;
let moves = 0;
let message = document.createElement("p");
let aiBtn = document.createElement("button");

//our array of button dom elements
let buttonNodes = [
  [], //row 0
  [], //row 1
  [] //row 2
];

let onclick = function() {
  console.log(moves);
  let x = this.row;
  let y = this.col;

  this.innerHTML = "X";
  this.owned = "X";
  this.disabled = true;

  moves++;
  ai();
};

//this gets called by the 'load' event listener
let init = function() {
  rootNode = document.getElementById("app");

  //create and add the 9 game board buttons
  //to the array and to DOM
  //assign an onclick callback
  for (let i = 0; i < 3; i++) {
    let rowDivNode = document.createElement("div");

    for (let j = 0; j < 3; j++) {
      let btn = (buttonNodes[i][j] = document.createElement("button"));
      btn.innerHTML = "_";
      btn.owned = false;
      btn.row = i;
      btn.col = j;
      btn.disabled = false;
      btn.onclick = onclick;
      rowDivNode.appendChild(btn);
    }
    rootNode.appendChild(rowDivNode);
  }

  //create and add the "AI Go First" button
  aiBtn.innerHTML = "AI Go First";
  aiBtn.onclick = aiFirst;

  rootNode.appendChild(document.createElement("br"));
  rootNode.appendChild(aiBtn);
  //create a reload button here if you want?

  let resetBtn = document.createElement("button");
  resetBtn.innerHTML = "Reset the Game";
  resetBtn.onclick = reset;

  rootNode.appendChild(document.createElement("br"));
  rootNode.appendChild(resetBtn);
};

let aiFirst = function(){
  if(moves > 0){
    aiBtn.disabled = true;
    alert("Game has already started! Reset to let the AI Go First");
  }
  else{
    aiBtn.disabled = true;
    ai();
  }
}

let ai = function(){
  console.log(moves);
  
  
  //status of board check
  let status = statusCheck();

  if(status == "noChange"){
    console.log("noChange");
    if(moves < 9){
      aiMove();
    }
    status = statusCheck();
    if(status == "noChange" && moves >= 9 ){
      status = "Tie"
    }
  } 
  if(status == "Tie" || status == "Lost"|| status == "Win"){
    message.innerHTML = "You " + status + "!";
    rootNode.appendChild(message);
    disableBoard();
  }
}

let aiMove = function(){
  console.log("aiMove");
  let working = true;

 while(working){
    let ranI = Math.floor(Math.random() * 3)
    let ranJ = Math.floor(Math.random() * 3)

    if(buttonNodes[ranI][ranJ].disabled == false){
      working = false;
      buttonNodes[ranI][ranJ].disabled = true;
      buttonNodes[ranI][ranJ].innerHTML = "O";
      moves++;
    }
  }
}

let statusCheck = function(){

  let status = "noChange";
  
  //less than minimum for victory
  if(moves < 5){
    return status;
  }

  status = statusCheckPlayer("X", "Win");
  console.log(status);
  if(status == "noChange"){
    status = statusCheckPlayer("O", "Lost")
  }

  return status;
}


let statusCheckPlayer = function(player, playerResponse){
  //check for win, loss, tie
  for (let i = 0; i < 3; i++) {
    //console.log(buttonNodes[i][0].innerHTML);
    if(buttonNodes[i][0].innerHTML.toString() == player &&
    buttonNodes[i][1].innerHTML == player &&
    buttonNodes[i][2].innerHTML == player){
          return playerResponse;
       }
  }
  for (let j = 0; j < 3; j++) {
    if(buttonNodes[0][j].innerHTML == player &&
       buttonNodes[1][j].innerHTML == player &&
       buttonNodes[2][j].innerHTML == player){
         return playerResponse;
       }
  }

  if(buttonNodes[0][0].innerHTML == player &&
       buttonNodes[1][1].innerHTML == player &&
       buttonNodes[2][2].innerHTML == player){
         return playerResponse;
       }

  else if(buttonNodes[2][0].innerHTML == player &&
       buttonNodes[1][1].innerHTML == player &&
       buttonNodes[0][2].innerHTML == player){
         return playerResponse;
       }
  return "noChange";
}

let disableBoard = function(){
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      buttonNodes[i][j].disabled = true;
    }
  }
}

let reset = function(){

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      buttonNodes[i][j].innerHTML = "_";
      buttonNodes[i][j].disabled = false;
    }
  }
  message.innerHTML = "";
  aiBtn.disabled = false;
  moves = 0;
}

init();
