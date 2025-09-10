function sumGame()
{
    if (localStorage.getItem('debug') === '1') {
        console.log('sumGame');
    }
    var timeID = JSON.parse(localStorage.getItem('timeID'));

    console.log(timeID.id)
    fetch(api + "/time/get/" + timeID.id)
        .then((response) => response.json())
        .then(           
            data => {
                data = data.pop();
                console.log(data)
                var Temp = '<div class="top4">'
                    Temp += '<div class="title">goofy ahhh</div>'
                    Temp += '<div class="text">time: ' + ((data.qn9Timestamp - data.TimestampStarted)/1000) + ' sek' + '</div>'
                    Temp += '<div id="result">'
                    Temp += '</div>'
                    Temp += '</div>'
                    Temp += '<div class="low2"><button class="btnfin" onClick="start()">hovedside</button></div>'
                    Temp += '</div><div class="bottom">page build: 69ms' + /*(~~(t1 - t0)) +*/ ' ms</div>';
                    document.getElementById("main").innerHTML = Temp;
                    console.log('%chei!', 'background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet); color: #ffffff; -webkit-text-stroke: 0.5vh #000000; font-size: 20vh;')
                    var data = JSON.parse('[' + '{"qn":' + data.qn0 + ', "qnawns":' + data.qn0awns + ', "qntime":' + (data.qn0Timestamp - data.TimestampStarted) +'},' + '{"qn":' + data.qn1 + ', "qnawns":' + data.qn1awns + ', "qntime":' + (data.qn1Timestamp - data.qn0Timestamp) +'},' + '{"qn":' + data.qn2 + ', "qnawns":' + data.qn2awns + ', "qntime":' + (data.qn2Timestamp - data.qn1Timestamp) +'},' + '{"qn":' + data.qn3 + ', "qnawns":' + data.qn3awns + ', "qntime":' + (data.qn3Timestamp - data.qn2Timestamp) +'},' + '{"qn":' + data.qn4 + ', "qnawns":' + data.qn4awns + ', "qntime":' + (data.qn4Timestamp - data.qn3Timestamp) +'},' + '{"qn":' + data.qn5 + ', "qnawns":' + data.qn5awns + ', "qntime":' + (data.qn5Timestamp - data.qn4Timestamp) +'},' + '{"qn":' + data.qn6 + ', "qnawns":' + data.qn6awns + ', "qntime":' + (data.qn6Timestamp - data.qn5Timestamp) +'},' + '{"qn":' + data.qn7 + ', "qnawns":' + data.qn7awns + ', "qntime":' + (data.qn7Timestamp - data.qn6Timestamp) +'},' + '{"qn":' + data.qn8 + ', "qnawns":' + data.qn8awns + ', "qntime":' + (data.qn8Timestamp - data.qn7Timestamp) +'},' + '{"qn":' + data.qn9 + ', "qnawns":' + data.qn9awns + ', "qntime":' + (data.qn9Timestamp - data.qn8Timestamp) +'}' + ']')
                    var Temp2 = ''
                    for (let count = 0; count < 10; count++) {
                        let info = data.pop();
                        fetch(api + "/qnsum/" + info.qn)
                            .then((response) => response.json())
                            .then(           
                                data2 => {
                                    var data2 = data2.pop();
                                    Temp2 += '<div class="sumuary"><div class="summary_txtbox"><div class="sumuary_txt_big"> time: ';
                                    Temp2 += (info.qntime / 1000)
                                    Temp2 += ' sek'
                                    Temp2 += '</div><div class="sumuary_txt_big">'
                                    Temp2 += data2.qn
                                    Temp2 += '</div><div class="summary_txt_trufal"><div class="sumuary_txt">var:<br>'
                                    if(data2.trufal == 1)
                                    {
                                        Temp2 += 'sant'
                                    }
                                    else if (data2.trufal == 0)
                                    {
                                        Temp2 += 'usant'
                                    }
                                    Temp2 += '</div><div class="sumuary_txt">du svarte:<br>'
                                    if(info.qnawns == 1)
                                    {
                                        Temp2 += 'sant'
                                    }
                                    else if (info.qnawns == 0)
                                    {
                                        Temp2 += 'usant'
                                    }
                                    Temp2 += '</div></div><div class="sumuary_txt_sml">spørsmål id: '
                                    Temp2 += info.qn
                                    Temp2 += '</div></div>'
                                    Temp2 += '<img src="icon/cor'
                                    if (data2.trufal == info.qnawns) {
                                        Temp2 += '1'
                                    }
                                    else  {
                                        Temp2 += '0'
                                    }
                                    Temp2 += '.svg" alt="checkmark" width="10%"></div>'
                                    document.getElementById("result").innerHTML = Temp2;
                                }
                            )
                    }
            }
        )
        
}