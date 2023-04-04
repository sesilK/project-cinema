function changeOpacity1(obj) {
    obj.style.opacity = "0.7";
    obj.querySelector('.main_image_text').style.opacity = '1'
}

function changeOpacity2(obj) {
    obj.style.opacity = "1";
    obj.querySelector('.main_image_text').style.opacity = '0'
}

function like(obj) {
    if (obj.firstChild.innerHTML == '<i class="fa-regular fa-heart"></i> ') {
        obj.firstChild.innerHTML = '<i class="fa-sharp fa-solid fa-heart" style="color: #ff4284;"></i> ';
        obj.lastChild.textContent = (Number(obj.lastChild.textContent)) + 1;
    } else {
        obj.firstChild.innerHTML = '<i class="fa-regular fa-heart"></i> ';
        obj.lastChild.innerHTML = (Number(obj.lastChild.textContent)) - 1;
    }
}


var colors = new Array(
    [21, 63, 46],
    [32, 23, 42],
    [46, 29, 39],
    [56, 34, 37],
    [40, 30, 28],
    [70, 33, 37]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.003;

function updateGradient() {

    if ($ === undefined)
        return;

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    $('#gradient').css({
        background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
    }).css({
        background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    });

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

    }
}

setInterval(updateGradient, 0.1);



window.onload = function () {

    const kindWrap = document.querySelector('.kind_wrap');
    const slider = kindWrap.querySelector('.slider');
    const slideLis = slider.querySelectorAll('li');
    // const moveButton = kindWrap.querySelector('.arrow');

    for (let i = 0; i < slideLis.length; i++) {
        slideLis[i].style.width = `${document.querySelector('.kind_wrap').clientWidth}px`;
    }

    /* ul 넓이 계산 */
    const liWidth = slideLis[0].clientWidth;
    const sliderWidth = liWidth * slideLis.length;
    slider.style.width = `${sliderWidth}px`;

    /* 리스너 설치 */
    let currentIdx = 0; // 슬라이드 현재 번호
    let translate = 0; // 슬라이드 위치 값
    // const speedTime = 500;
    // moveButton.addEventListener('click', moveSlide);

    /* 슬라이드 실행 */
    function move() {
        if (currentIdx !== slideLis.length - 1) {   //1~5번째 사진일때
            translate -= liWidth;
            slider.style.transition = `${0.5}s ease-out`;
            slider.style.transform = `translateX(${translate}px)`;
            currentIdx += 1;
        } else if (currentIdx == slideLis.length - 1) {    //6번 사진일때
            translate = 0;
            slider.style.transition = `${0}s ease-out`;
            slider.style.transform = `translateX(${translate}px)`;
            currentIdx = 0;
        }
    }

    function moveSlide(event) {
        // event.preventDefault();

        // if (event.target.className === 'next') {
        //     if (currentIdx !== slideLis.length - 1) {   //1~4번째 사진일때
        //         translate -= liWidth;
        //         slider.style.transform = `translateX(${translate}px)`;
        //         currentIdx += 1;
        //     }
        //     // else if (currentIdx == slideLis.length - 1){    //5번째 사진일때
        //     //     translate -= liWidth;
        //     //     slider.style.transform = `translateX(${translate}px)`;
        //     //     currentIdx += 1;
        //     //     slider.appendChild(list.appendChild(image));
        //     // }
        //     else if (currentIdx == slideLis.length - 1){
        //         translate = 0;
        //         slider.style.transform = `translateX(${translate}px)`;
        //         currentIdx = 0;
        //     }
        // } else if (event.target.className === 'prev') {
        //     if (currentIdx !== 0) {     //1번째 사진일때
        //         translate += liWidth;
        //         slider.style.transform = `translateX(${translate}px)`;
        //         currentIdx -= 1;
        //     }
        //     // else if (currentIdx == 0 ) {        //2~5번째 사진일때
        //     //     translate = -(liWidth * (slideLis.length-1));
        //     //     slider.style.transform = `translateX(${translate}px)`;
        //     //     currentIdx = slideLis.length - 1;
        //     // }
        //     else if (currentIdx == 0 ) {
        //         translate = -(liWidth * (slideLis.length-1));
        //         slider.style.transform = `translateX(${translate}px)`;
        //         currentIdx = slideLis.length - 1;
        //     }
        // }
    }

    function sliding() {
        // move();
        // if (currentIdx === sliderCloneLis.length - 1)
        //     setTimeout(() => {
        //         translate -= liWidth;
        //         slider.style.transform = `translateX(${translate}px)`;
        //         currentIdx += 1;
        //     }, speedTime);
    }

    let time = 750;
    function showSliding() {
        let add = 1500;
            setTimeout(move, time); //2번째 사진으로 넘어갈때 750
            time +=add;
            setTimeout(move, time); //3번째 사진으로 넘어갈때 1500
            time +=add;
            setTimeout(move, time); //4번째 사진으로 넘어갈때 1500
            time +=add;
            setTimeout(move, time); //5번째 사진으로 넘어갈때 1500
            time +=add;            
            setTimeout(move, time); //6번째 사진으로 넘어갈때 1500
            time +=750;
            setTimeout(move, time); //1번째 사진으로 넘어갈때 750
            time +=750;             //2번째 사진으로 넘어갈때 750
    }

    // setInterval(move, 1500);
    setInterval(showSliding, 0);
}