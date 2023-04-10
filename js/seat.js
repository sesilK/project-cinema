const seats = document.getElementsByClassName("seat");  //전체 좌석
const select = document.getElementsByClassName("select");   //선택된 좌석
const selected_seats = document.getElementsByClassName("selected"); //선택목록 좌석


function reset(){
    window.location.reload()
}

let totalCount = 0;

function count(obj, type) {
    // 결과를 표시할 element
    // const resultElement = document.getElementsByClassName('result');

    // 현재 화면에 표시된 값
    // let number = resultElement.innerText;
    //영화표 금액
    let adultP = 14000;
    let minorP = 12000;
    let treatP = 9000;

    // 더하기/빼기
    if (type === 'plus') {
        if (totalCount == 10) {
            swal('인원선택은 총 10명까지 가능합니다.');
        } else {
            const resultElement = obj.previousElementSibling;
            let number = resultElement.innerText;
            number = parseInt(number) + 1;
            totalCount += 1;
            resultElement.innerText = number;
            for (let i = 0; i < totalCount; i++) {
                if (selected_seats[i].textContent == '-') {
                    selected_seats[i].setAttribute("style", "background-color:darkgrey; color:white");
                }
            }
        }

        if (selected_seats[totalCount-1].innerText == '-') {
            document.querySelector(".pay").classList.remove("pay-ready");
        }
        let adult = document.getElementsByClassName("adult")[0].childNodes[3].innerText;
        let minor = document.getElementsByClassName("minor")[0].childNodes[3].innerText;
        let treat = document.getElementsByClassName("treat")[0].childNodes[3].innerText;
        document.getElementById("price").innerText = (adult * adultP + minor * minorP + treat * treatP).toLocaleString();
    

    } else if (type === 'minus') {
        if (selected_seats[totalCount - 1].innerText != '-') {
            swal('먼저 선택된 좌석을 취소해주세요');
            return;
        } else {
            if (totalCount > 0 && obj.nextElementSibling.innerText != 0) {
                const resultElement = obj.nextElementSibling;
                let number = resultElement.innerText;
                number = parseInt(number) - 1;
                totalCount -= 1;
                resultElement.innerText = number;

                
                for (let i = totalCount; i < 10; i++) {
                    selected_seats[i].setAttribute("style", "background-color: ; color:gray");
                }

                let adult = document.getElementsByClassName("adult")[0].childNodes[3].innerText;
                let minor = document.getElementsByClassName("minor")[0].childNodes[3].innerText;
                let treat = document.getElementsByClassName("treat")[0].childNodes[3].innerText;
                document.getElementById("price").innerText = (adult * adultP + minor * minorP + treat * treatP).toLocaleString();


            }
        }

        if (selected_seats[totalCount-1].innerText != '-') {
            document.querySelector(".pay").classList.add("pay-ready");
        }
        
    
    }

    // 결과 출력
    console.log(totalCount);

}

function pay() {
    for (let j = 0; j < totalCount; j++) {
        //선택좌석목록이 비어있으면
        if (selected_seats[j].textContent == '-') {
            //선택좌석목록에 좌석ID 넣고 멈추기
            swal('좌석을 모두 선택해주세요.');
            break;
        } else {
            swal('', '결제 페이지로 이동', 'success');
        }
    }
}

window.onload = function () {



    let count = 1;
    for (let i = 0; i < seats.length; i++) {
        seats[i].addEventListener('click', function () {    //좌석 클릭할 때 실행할 이벤트

            //빈 좌석이 선택되면
            if (seats[i].getAttribute("class") == 'seat num') {
                if (totalCount == 0) {
                    swal('관람하실 인원을 먼저 선택해주세요.');
                } else if (select.length == totalCount) {
                    swal('좌석 선택이 완료되었습니다.');
                } else {
                    //선택된좌석 클래스 추가
                    seats[i].classList.add('select');
                    // seats[i].setAttribute("class", 'seat num select');

                    //선택된 좌석 개수만큼 가격 업데이트

                    //선택좌석목록 돌면서
                    for (let j = 0; j < selected_seats.length; j++) {
                        //선택좌석목록이 비어있으면
                        if (selected_seats[j].textContent == '-') {
                            //선택좌석목록에 좌석ID 넣고 멈추기
                            selected_seats[j].textContent = seats[i].getAttribute("id");
                            selected_seats[j].setAttribute("style", "background-color : #6C63FF; color:white")
                            break;
                        }
                        //선택좌석목록 칸이 안 비어있으면
                        else {
                            //count만큼 다음에 있는 칸에 좌석ID 넣고 멈추기
                            selected_seats[j + count].textContent = seats[i].getAttribute("id");
                            selected_seats[j + count].setAttribute("style", "background-color : #6C63FF; color:white")
                            ++count;
                            break;
                        }
                    }
                }
            }
            //선택되어있는 좌석을 클릭하면 (취소하면)
            else {

                //선택된 좌석 클래스 삭제
                seats[i].classList.remove('select');
                // seats[i].setAttribute("class", 'seat num');

                if (selected_seats[totalCount].innerText == '-') {
                    document.querySelector(".pay").classList.remove("pay-ready");
                }

                //선택좌석목록 돌면서
                for (let j = 0; j < selected_seats.length; j++) {
                    //선택좌석목록에 취소한 좌석의 ID가 있으면 -로 만들고
                    if (selected_seats[j].textContent == seats[i].getAttribute("id")) {
                        selected_seats[j].textContent = '-';

                        //지운목록부터 선택좌석목록 돌면서
                        for (let k = j; k < selected_seats.length - 1; k++) {
                            //다음칸의 좌석ID를 한칸씩 앞으로 당겨오고
                            selected_seats[k].textContent = selected_seats[k + 1].textContent;
                        }

                        // 채워지지 않은 목록 다시 회색으로 바꾸기
                        for (let k = 0; k < totalCount; k++) {
                            if (selected_seats[k].textContent == '-') {
                                selected_seats[k].setAttribute("style", "background-color:darkgrey; color:white");
                            }
                        }

                        //카운트 하나 줄이고 멈추기
                        --count;
                        break;
                    }
                }

                //좌석선택목록의 첫번째칸이 -이 되면 (전체 다 비워지면)
                if (selected_seats[0].textContent == '-') {
                    //카운트를 1로 돌림
                    count = 1;
                }

            }

            if (selected_seats[totalCount - 1].innerText != '-') {
                document.querySelector(".pay").classList.add("pay-ready");
            }

        })

    }



};
