
// playSound 함수
function playSound(e){
    // audio의 data-key속성값이 입력받은 키의 값인 엘리먼트를 가져옴
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    // Class가 key인 엘리먼트의 data-key속성값이 입력받은 키의 값인 엘리먼트를 가져옴
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    if(!audio) return;
    // 입력받은 키에 해당하는 audio태그의 src의 재생시간을 0으로 할당
    // 재생시간을 0으로 할당하는 이유는 동일한 키의 연속 입력 시 먼저 입력된 소리가 끝날 때 까지 기다리지 않고 소리를 처음부터 다시 재생 -> 반복해서 입력 가능
    audio.currentTime = 0;
    audio.play();
    // playing class 추가하여 애니메이션 효과넣음
    key.classList.add('playing')
}

function removeTransition(e){
    if(e.propertyName !== 'box-shadow') return;
    this.classList.remove('playing')
}


const keys = document.querySelectorAll('.key')
// keys 배열을 forEach 메서드를 이용해 배열의 엘리먼트 key들에 removeTransition함수를 실행하는 transitionend 이벤트를 추가
// transitionend 이벤트는 변화(css)가 끝났을 때 실행되는 이벤트
keys.forEach(key => key.addEventListener('transitionend', removeTransition))

window.addEventListener('keydown', playSound)
