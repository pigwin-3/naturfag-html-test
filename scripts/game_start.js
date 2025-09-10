function game(game_id)
{
    console.log('game id = ' + game_id);
    //starts preformanse monitor
    var t0 = performance.now();

    var Temp = '<div class="title">spillside</div>';
    Temp += '<div class="top1">'
    Temp += '<button class="btn2" onClick="startGame(`' + game_id + '`)">spill nå</button><br>'
    Temp += '<button class="btn2" onClick="startPracticeGame(`' + game_id + '`)">øvelse</button>'
    //stops preformanse timer
    var t1 = performance.now();
    //makes the bottem bar with preformanse
    Temp += '</div> <div class="bottom"> api response: no api request, page build: ' + (~~(t1 - t0)) + ' ms</div>';
    //inserts the html into the document
    document.getElementById("main").innerHTML = Temp;
}