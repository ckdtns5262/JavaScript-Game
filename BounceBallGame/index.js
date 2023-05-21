let canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d')
    // 공의 반지름
    ballRadius = 9, 
    // 초기 공의 x좌표
    x = canvas.width / (Math.floor(Math.random() * 
    Math.random() * 10) + 3),
    // 초기 공의 y좌표
    y = canvas.height - 40,
    // 공의 x,y 방향의 속도
    dx = 2, 
    dy = -2;


let paddleHeight = 12;
    paddleWidth = 72;

// 패들 시작 위치
let paddleX = (canvas.width - paddleWidth) / 2; 

// 벽돌(brick)
let rowCount = 5,
    columnCount = 9,
    brickWidth = 55,
    brickHeight = 20,
    brickPadding = 12,
    topOffset = 40, // 상단과의 거리
    leftOffset = 33, // 왼쪽과의 거리
    score = 0;

// 벽돌 배열
let bricks = [];
for(let c = 0; c < columnCount; c ++){
    bricks[c] = []
    for(let r = 0; r < rowCount; r++){
        // 벽돌 위치 설정 ( 각 벽돌의 위치와 상태를 객체형태로 저장하여 모든 벽돌 초기 상태 1)
        bricks[c][r] = { x : 0, y : 0, status : 1}
    }
}

// 마우스 움직임 이벤트
document.addEventListener('mousemove', 
MouseMoveHandler, false);


// 마우스로 패들 움직임 구현
function MouseMoveHandler(e){
    // 마우스 포인트의 X좌표를 캔버스에 계산
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth / 2 // 패들의 X좌표
    }
}   

// 패들 그리기
function drawPaddle(){
    ctx.beginPath();
    ctx.roundRect(paddleX, canvas.height - paddleHeight,
        paddleWidth, paddleHeight, 30);
    ctx.fillStyle = 'red'
    ctx.fill();
    ctx.closePath();
}

// 공 그리기
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius,0 , Math.PI * 2 ) // Math.PI = 파이(3.14...)
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

// 벽돌 그리기
function drawBricks(){
    for(let c =0; c < columnCount; c++){
        for(let r=0; r < rowCount; r++){
            if(bricks[c][r].status === 1){
                let brickX = (c * (brickWidth + brickPadding)) + leftOffset; // 현재 벽돌의 X좌표 계산
                let brickY = (r * (brickHeight + brickPadding)) + topOffset  // 현재 벽돌의 Y좌표 계산
                
            bricks[c][r].x = brickX
            bricks[c][r].y = brickY
            ctx.beginPath();
            ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30)
            ctx.fillStyle = '#333';
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

// 점수 움직임
function trackScore(){
    ctx.font = 'bold 18px sans-serif'
    ctx.fillStyle = 'black'
    ctx.fillText('score ' + score, 8, 24)
}

// 공이 벽돌에 맞았는지 체크함수
function hitDetection(){
    for(let c=0; c < columnCount; c++){
        for(let r=0; r < rowCount; r++){
            let b = bricks[c][r]
            if(b.status === 1){
                if(x > b.x && x < b.x + brickWidth &&
                    y > b.y && y < b.y + brickHeight){
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score === rowCount * columnCount){
                            alert('굿 잘했음')
                            document.location.reload();
                        }
                    }
            }
        }
    }
}




// 메인 함수
function init(){
    ctx.clearRect(0, 0 , canvas.width, canvas.height)
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    // 공이 왼쪽 또는 오른쪽 벽에 맞았을 경우
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }

    // 공이 위 아래에 맞을 경우
    if( y + dy < ballRadius){
        dy = -dy;
    } else if( y + dy > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        } else {
            //만약 공이 패들이 맞지않을 경우
            alert('Game Over')
            document.location.reload()
        }
    }
    if( y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }

    // 공 이동
    x += dx;
    y += dy;
}
setInterval(init, 10);
