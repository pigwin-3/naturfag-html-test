function practiceSum()
{
    //starts preformanse monitor
    var t0 = performance.now();
    //gets data from localstorage
    var sumStore = JSON.parse(localStorage.getItem('SumStore'));
    //checks if the awnser was correct or not
    var Temp = '<div class="top4">'
        Temp += '<div class="title">goofy ahhh</div>'
        Temp += '<div class="text"></div>'
        Temp += '<div id="result">'
        console.log(sumStore)
        sumStore.forEach((itemData) => {
            Temp += '<div class="sumuary"><div class="summary_txtbox"><div class="sumuary_txt_big">';
            Temp += itemData.qn
            Temp += '</div><div class="summary_txt_trufal"><div class="sumuary_txt">var:<br>'
            Temp += itemData.wastrufal 
            Temp += '</div><div class="sumuary_txt">du svarte:<br>'
            Temp += itemData.usrAwns
            Temp += '</div></div><div class="sumuary_txt_sml">spørsmål id: '
            Temp += itemData.qnid
            Temp += '</div></div>'
            Temp += '<img src="icon/cor'
            Temp += itemData.cor
            Temp += '.svg" alt="checkmark" width="10%"></div>'
        });
        Temp += '</div>'
        Temp += '</div>'
        Temp += '<div class="low2"><button class="btnfin" onClick="start()">hovedside</button></div>'
        var t1 = performance.now();
        //makes the bottem bar with preformanse
        Temp += '</div><div class="bottom">ms page build: ' + (~~(t1 - t0)) + ' ms</div>';
        document.getElementById("main").innerHTML = Temp;
        localStorage.clear();
}