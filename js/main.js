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

    if ($ === undefined) return;

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