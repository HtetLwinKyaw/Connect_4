var playerRed = "R";
var playerBlue = "B";
var currentPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns= [5,5,5,5,5,5,5];

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push(' ');

            // HTML
            // <div id="0-0" class="tile"></div>
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece(){
    if(gameOver){
        return;
    }
    let coords= this.id.split("-"); //"0-0" -> ["0", "0"]
    let i= parseInt(coords[0]);
    let j= parseInt(coords[1]);

    i= currColumns[j];
    if(i<0){
        return;
    }

    board[i][j]= currentPlayer;
    let tile =document.getElementById(i.toString()+ "-"+ j.toString() );
    if(currentPlayer==playerRed){
        tile.classList.add("red-piece");
        currentPlayer= playerBlue;
    }
    else{
        tile.classList.add("blue-piece");
        currentPlayer= playerRed;
    }

    i-=1;
    currColumns[j]=i;

    checkWinner();


}


function checkWinner(){
    //horizone
    for(let i=0; i<rows; i++){
        for(let j=0; j<columns-3; j++){
            if(board[i][j]!= ' '){
                if(board[i][j]==board[i][j+1] && board[i][j+1] == board[i][j+2] && board[i][j+2] ==board[i][j+3]){
                    setWinner(i, j);
                        return;
                
                }
            }
        }
    }

    //vertical
    for(let j=0; j<columns; j++){
        for(let i=0; i<rows-3; i++){
            if(board[i][j]!= ' '){
                if(board[i][j]==board[i+1][j] && board[i+1][j] == board[i+2][j] && board[i+2][j] ==board[i+3][j]){
                    setWinner(i, j);
                        return;
                
                }
            }
        }
    }

    //diagonal
    for(let i=3; i<rows; i++){
        for(let j=0; j<columns-3; j++){
            if(board[i][j]!= ' '){
                if(board[i][j]==board[i-1][j+1] && board[i-1][j+1] == board[i-2][j+2] && board[i-2][j+2] ==board[i-3][j+3]){
                    setWinner(i, j);
                        return;
                
                }
            }
        }
    }

    //anti diagonal
    for(let i=0; i<rows-3; i++){
        for(let j=0; j<columns-3; j++){
            if(board[i][j]!= ' '){
                if(board[i][j]==board[i+1][j+1] && board[i+1][j+1] == board[i+2][j+2] && board[i+2][j+2] ==board[i+3][j+3]){
                    setWinner(i, j);
                        return;
                
                }
            }
        }
    }

}

function setWinner(i, j){
    let winner= document.getElementById("winner");
    if(board[i][j]==playerRed){
        winner.innerText= "Red Win";
    }

    else {
        winner.innerText= "Blue Win";
    }
    gameOver= true;
}