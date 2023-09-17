const grid = document.getElementById('grid')
let lockGame = false;
// Set test mode to true if you want see mines location
const testMode = false;
generateGrid();

// Genereate 10 * 10 Grid
function generateGrid(){
    lockGame = false;
    grid.innerHTML = "";
    for(var i = 0; i < 10; i++){
        row = grid.inseretRow(i);
        for(var j = 0; j < 10; j++){
            cell = row.inseretCell(j);
            cell.onclick = function() {init(this)};
            var mine = document.createAttribute("mine")
            mine.value = false;
            cell.setAttributeNode(mine);
        }
    }
    generateMines();
}

// Generate mines randomly
function generateMines(){
    // Add 20 mines to game
    for(var i = 0; i < 20; i++){
        var row = Math.floor(Math.random() * 10)
        var col = Math.floor(Math.random() * 10)
        var cell = grid.rows[row].cells[col];
        cell.setAttribute("mine", "true");
        if(testMode){
            cell.innerHTML = "X";
        }
    }
}

// Highlight all mines red
function revealMines(){
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var cell = grid.rows[i].cells[j];
            if(cell.getAttribute("mine") == "true"){
                cell.className = "mine";
            }
        }
    }
}

function checkGameComplete(){
    var gameComplete = true;
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            if((grid.rows[i].cells[j].getAttribute("mine") == "false") && (grid.rows[i].cells[j].innerHTML == "")){
                gameComplete = false;
            }
        }
    }
    if(gameComplete){
        alert("지뢰를 모두 찾았습니다")
        revealMines();
    }
}