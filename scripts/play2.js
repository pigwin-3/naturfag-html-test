function continueGame(qnNum)
{
    //starts preformanse monitor
    var t0 = performance.now();

    //gets data from localstorage
    var data = JSON.parse(localStorage.getItem('TheData'));
    //gets the first question
    let qn = data.pop();
    localStorage.setItem('TheData', JSON.stringify(data));
    localStorage.setItem('TheQN', JSON.stringify(qn));
    
    var Temp = '<div class="progressbar">' + '<div class="progressbarprog" style="width: ' + qnNum + '0%;"></div>' + '</div>';
        Temp += '<div class="top2">';
        Temp += '<div class="statement">' + qn.qn  + '</div>' + '<br>';
        Temp += '<div class="img" style="background-image: url(' + qn.img + ');"><div class="imgsrc">Kjilde: ' + qn.srcimg + '</div></div>';
        Temp += '</div>';
        Temp += '<div class="low"><button class="btntru" onClick="checkGame(`1`)">sant</button><button class="btnfal" onClick="checkGame(`0`)">usant</button></div>';
        Temp += '</div>'
    //stops preformanse timer
    var t1 = performance.now();
    //makes the bottem bar with preformanse
    Temp += '</div><!-- 1/2 1 = hovedside, katgori velging, spillsiden 2 = spørsmålet, sanheten --> <div class="bottom"> ms page build: ' + (~~(t1 - t0)) + ' ms</div>';
    //inserts the html into the document
    document.getElementById("main").innerHTML = Temp;
}