// chessboard
var xLine = ["A", "B", "C", "D", "E", "F", "G", "H"];
var yLine = ["1", "2", "3", "4", "5", "6", "7", "8"];


// calls the function
var button = document.getElementById("button");
button.addEventListener("click", function(e) {
  e.preventDefault();

  // the first/current position of the knight
  var firstPosition = "";
  firstPosition = document.getElementById("position-field").value;

  //check if input is valid
  if (firstPosition == "") {
    alert("He has to be somewhere?");
    return;
  } else if (firstPosition.length > 2) {
    alert("Two characters please.")
    return;
  }

  // clear the board on multiple function-calls
  var clearActive = [];
  clearActive = document.getElementsByClassName("active");
  for (var i = 0; i < clearActive.length; i++) {
    clearActive[i].setAttribute("class", "");
  }

  var clearPossible = document.getElementsByClassName("possible");
  for (var i = 0; i < clearPossible.length; i + 2) {
    clearPossible[i].setAttribute("class", "");
  }


  moveKnight(firstPosition, xLine, yLine);
});

function moveKnight(firstPosition, x, y) {
  var xLine = x;
  var yLine = y;

  var x = firstPosition.split("");
  letter = x[0].toUpperCase();
  var first = xLine.indexOf(letter)
  var second = yLine.indexOf(x[1])

  firstPosition = letter + x[1];

  // putting the knight on the board
  var placeKnight = document.getElementById(firstPosition).setAttribute("class", "active");

  var knight = [];
  knight.push(first, second);
  console.log(knight)

  if (knight.length > 2) {
    alert("Too many arguments.")
    return;
  }

  // possible moves
  var moves = [
    { x: +1, y: -2 },
    { x: +1, y: +2 },
    { x: +2, y: -1 },
    { x: +2, y: +1 },
    { x: -2, y: -1 },
    { x: -2, y: +1 },
    { x: -1, y: -2 },
    { x: -1, y: +2 }
  ];

  // new array for storing possible new positions
  var newPositions = [];

  // take the current position and creates the new ones
  for (var i = 0; i < moves.length; i++) {
    var move = moves[i];
    var position = {}; // object to push into the newPositions-array
    position.x = knight[0] + move.x;
    position.y = knight[1] + move.y;
    newPositions.push(position)
  }

  // check if new position is on the board/is valid
  var okPositions = [];

  for (var i = 0; i < newPositions.length; i++) {
    var check = newPositions[i];
    if (check.x >= 0 && check.x < 8) {
      if (check.y >= 0 && check.y < 8) {
        okPositions.push(check)
      }
    }
  };

  for (var i = 0; i < okPositions.length; i++) {
    var possPos = xLine[okPositions[i].x] + yLine[okPositions[i].y];
    var knight = document.getElementById(possPos).setAttribute("class", "possible");
  }

  // give the user the new possible positions
  var result = "The knight can go to: ";

  for (var i = 0; i < okPositions.length; i++) {
    result += xLine[okPositions[i].x];
    result += yLine[okPositions[i].y] + " ";
  }
  console.log(result)

  var answer = document.getElementById("answer");
  answer.innerHTML = result;
  return result;
}; // end of function


  // function to create the chessboard
  function drawBoard(x, y) {
    // the board form the html-file
    var chessBoard = document.getElementById("board");
    var xLine = x;
    var yLine = y;

    // printing the board, the rows
    // one extra line for putting letters on the board side
    for (var i = 0; i < 9; i++) {
    var chessRow = document.createElement("ul");
    chessRow.style.clear = "left";

    // prints the numbers on the board sides
    var numbers = document.createElement("h2");
    if (yLine[i] != undefined) {
      numbers.innerHTML = yLine[i];
    }
    numbers.setAttribute("id", "number");
    chessRow.appendChild(numbers);

      // printing the board, the cells
      for (var j = 0; j < 8; j++) {
        if (xLine[i] != undefined) {
          var chessCell = document.createElement("li");
          chessCell.style.float = "left";
          chessCell.setAttribute("id", xLine[j] + yLine[i])
          if (i%2 ==0) {
            if (j%2 == 0) {
              chessCell.style.backgroundColor = "Sienna";
            }
            else {
              chessCell.style.backgroundColor = "Tan";
            }
          }
          else {
            if (j%2 == 0) {
              chessCell.style.backgroundColor = "Tan";
            }
            else {
              chessCell.style.backgroundColor = "Sienna";
            }
          }
          chessRow.appendChild(chessCell)
        }
      }
    chessBoard.appendChild(chessRow)
    }

      // prints the letters on the board sides
      var lettersRow = chessBoard.lastChild;
      lettersRow.setAttribute("id", "letter-row");

      for (var i = 0; i < 8; i++) {
      var letter = document.createElement("h2");
      if (yLine[i] != undefined) {
        letter.innerHTML = xLine[i];
      }
      letter.setAttribute("id", "letter");
      letter.style.float = "left";
      lettersRow.appendChild(letter);
    }
  };

  drawBoard(xLine, yLine);
