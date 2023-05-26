const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score')
const highScoreElement = document.querySelector('.high-score')
const controls = document.querySelectorAll('.controls i')



let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = []
let score = 0;
let setIntervalId;


// localStorage에서 high scroe 꺼내오기
let highScore = localStorage.getItem('high-score') || 0;
highScoreElement.innerText = `High Score : ${highScore}`

// 먹이 좌표 랜덤 생성하기
const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// 게임 오버 함수 생성
const handleGameOVer = () => {
    clearInterval(setIntervalId)
    alert('Game Over 다시 도전하세요')
    location.reload()
}


// 키 입력에 따른 이동방향 변경함수
const changeDirection = (e) => {

    if(e.key === 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    } else if(e.key === 'ArrowUp' && velocityY != 1 ){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
}


// Change Direction on each key click
controls.forEach(button => button.addEventListener('click', () => changeDirection({
    key : button.dataset.key
})))

// init

const initGame = () => {
    if(gameOver) return handleGameOVer()
    let html = `<div class="food" style="grid-area : ${foodY} / ${foodX}"></div>`

    // 뱀이 먹이를 먹는경우
    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodX, foodY])
        score++
        highScore = scroe >= highScore ? scroe : highScore

        // local storage에 highscore 저장
        localStorage.setItem('high-score', highScore)
        scoreElement.innerText = `Score : ${score}`
        highScoreElement.innerText = `High Score : ${highScore}`
    }

    // 뱀 머리(첫번째 부분) 위치 업데이트
    snakeX += velocityX;
    snakeY += velocityY;

    // 뱀의 body 요소 값을 앞으로 하나씩 이동
    for(let i = snakeBody.length-1; i >0; i-- ){
        snakeBody[i] = snakeBody[i-1]
    }
    snakeBody[0] = [snakeX, snakeY];


    // 뱀 머리가 벽에 부딪치는 경우
    if(snakeX <= 0 || snakeX > 30 && snakeY <= 0 || snakeY > 30){
        return gameOver = true;
    }

    // 뱀 몸통 요소에 추가
    for(let i=0; i < snakeBody.length; i++){
        html += `<div class="head" style="grid-area : ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
    
        // 뱀의 머리가 몸통에 부딪혔는지 확인
        if(i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

updateFoodPosition()
setIntervalId = setInterval(initGame, 100)
document.addEventListener('keyup', changeDirection)