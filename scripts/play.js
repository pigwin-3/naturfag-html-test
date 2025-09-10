function startGame(theme_id)
{
    console.log(theme_id);
    //starts preformanse monitor
    var t0 = performance.now();
    var api = conf('api')
    document.getElementById("main").innerHTML = "";
    fetch(api + '/time/start')
        .then((response) => response.json())
        .then(           
            data => {
                console.log(data)
                localStorage.setItem('timeID', JSON.stringify(data));
            }
        )

    //fetches the catagorys from the api¨
    fetch(api + '/qn/' + theme_id)
        .then((response) => response.json())
        .then(           
            data => {
                //extracts the api response time from the json
                let api = data.pop();
                console.log('fetched from api ' + api + ' ms');
                //(for practiceSum())
                var sumStore=[]
                localStorage.setItem('SumStore', JSON.stringify(sumStore));
                //gets the first question
                let qn = data.pop();
                //puts the json values into local storage as a strings
                localStorage.setItem('TheQN', JSON.stringify(qn));
                localStorage.setItem('TheData', JSON.stringify(data));

                localStorage.setItem('qnNum', 0);

                var Temp = '<div class="progressbar">' + '</div>' + '<div class="top2">';
                    Temp += '<div class="statement">' + qn.qn + '</div>';
                    Temp += '<div class="progressbar">' + '<div class="progressbarprog" style="width: ' + '0' + '0%;"></div>' + '</div>';
                    Temp += '<div class="img" style="background-image: url(' + qn.img + ');"><div class="imgsrc">Kjilde: ' + qn.srcimg + '</div></div>';
                    Temp += '</div>';
                    Temp += '<div class="low"><button class="btntru" onClick="checkGame(`1`)">sant</button><button class="btnfal" onClick="checkGame(`0`)">usant</button></div>';
                    Temp += '</div>'
                //stops preformanse timer
                var t1 = performance.now();
                //makes the bottem bar with preformanse
                Temp += '</div><!-- 1/2 1 = hovedside, katgori velging, spillsiden 2 = spørsmålet, sanheten --> <div class="bottom"> api response: ' + (~~api) + ' ms page build: ' + (~~(t1 - t0)) + ' ms</div>';
                //inserts the html into the document
                document.getElementById("main").innerHTML = Temp;
            }
        );
}