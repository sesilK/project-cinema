

const inputBar = document.querySelector("#comment-input");
const rootDiv = document.querySelector("#comments");
const btn = document.querySelector("#submit");
const mainCommentCount = document.querySelector('#count'); //맨위 댓글 숫자 세는거.



//타임스템프 만들기
function generateTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const wDate = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const time = year + '-' + month + '-' + wDate + ' ' + hour + ':' + min + ':' + sec;
    return time;

}

//유저이름 발생기
//유저이름은 8글자로 제한.
function generateUserName() {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var makeUsername = '';
    for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random(10) * alphabet.length);
        makeUsername += alphabet[index];
    }
    for (let j = 0; j < 4; j++) {
        makeUsername += "*";
    }
    return makeUsername;
}


function deleteComments(obj) {
    obj.parentNode.parentNode.remove();
    //메인댓글 카운트 줄이기.
    if (mainCommentCount.innerHTML <= '0') {
        mainCommentCount.innerHTML = 0;
    } else {
        mainCommentCount.innerHTML--;
    }
}


//댓글보여주기
function showComment(comment) {
    const userName = document.createElement('div');
    const inputValue = document.createElement('span');
    const showTime = document.createElement('div');
    // const voteDiv = document.createElement('div');
    const countSpan = document.createElement('span')
    const commentList = document.createElement('div');

    //삭제버튼 만들기
    const delBtn = document.createElement('button');
    delBtn.className = "deleteComment";
    delBtn.innerHTML = "삭제";

    commentList.className = "eachComment";
    userName.className = "name";
    inputValue.className = "inputValue";
    showTime.className = "time";
    // voteDiv.className = "voteDiv";

    //유저네임가져오기 
    userName.innerHTML = generateUserName();
    userName.appendChild(delBtn);
    //입력값 넘기기
    inputValue.innerText = comment;
    //타임스템프찍기
    showTime.innerHTML = generateTime();
    countSpan.innerHTML = 0;

    //댓글뿌려주기       
    commentList.appendChild(userName);
    commentList.appendChild(inputValue);
    commentList.appendChild(showTime);
    // commentList.appendChild(voteDiv);
    document.querySelector("#comments").prepend(commentList);
    // console.dir(rootDiv);
}


//버튼만들기+입력값 전달
function pressBtn() {
    const currentVal = document.querySelector("#comment-input").value;
    if (currentVal.length == 0) {
        swal('내용을 입력해주세요');

    } else {
        showComment(currentVal);
        document.querySelector('#count').innerHTML++;
        document.querySelector("#comment-input").value = '';
    }
}

function img_count() {
    const img_div = document.querySelector(".section2").childNodes[1];
    let img_count = 0;

    for (let i = 0; i < img_div.children.length; i++) {
        img_count += img_div.children[i].children.length;
    }
    console.log(img_count);
    document.querySelector(".SteelCut").childNodes[1].innerText = img_count;
}

window.onload = function() {

    img_count();
}