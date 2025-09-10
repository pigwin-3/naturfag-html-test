function themeGet(theme_id)
{
console.log('theme id = ' + theme_id);
//starts preformanse monitor
var t0 = performance.now();

//fetches the catagorys from the api¨
fetch('/quiz/' + theme_id + '/main.json')
    .then((response) => response.json())
    .then(
        
        data => {
            //extracts the api response time from the json
            let api = data.pop();
            console.log('fetched from api ' + api + ' ms');
            if (data.length > 0) {
            //makes the top of the website
            var Temp = '<div class="title">Feilinfo</div><div class="top1">';
            //repeats this untill all of the data is in boxes
            data.forEach((itemData) => {
                Temp += '<div class="box">';
                Temp += '<div class="box-1n3">' + itemData.Name + '</div>';
                Temp += '<div class="box-info">' + itemData.about + '</div>';
                Temp += '<div class="box-1n3"><button class="btn" id="' + itemData.qn + '" onClick="game(this.id)">velg</button> </div>';
                Temp += '</div>'
            });
            //stops preformanse timer
            var t1 = performance.now();
            //makes the bottem bar with preformanse
            Temp += '</div><!-- 1/2 1 = hovedside, katgori velging, spillsiden 2 = spørsmålet, sanheten --> <div class="bottom"> api response: ' + (~~api) + ' ms page build: ' + (~~(t1 - t0)) + ' ms</div>';
            //inserts the html into the document
            document.getElementById("main").innerHTML = Temp;
            }
        }
    );
}