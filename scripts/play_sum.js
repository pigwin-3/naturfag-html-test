function sumGame()
{
    // Use local storage instead of API for game summary
    const gameResults = JSON.parse(localStorage.getItem('gameResults') || '[]');
    const startTime = parseInt(localStorage.getItem('gameStartTime'));
    const endTime = Date.now();
    const totalTime = endTime - startTime;

    console.log('Game summary with local data');
    
    var Temp = '<div class="top4">'
        Temp += '<div class="title">Spillresultat</div>'
        Temp += '<div class="text">Tid: ' + Math.round(totalTime/1000) + ' sekunder</div>'
        Temp += '<div id="result">'
        Temp += '</div>'
        Temp += '</div>'
        Temp += '<div class="low2"><button class="btnfin" onClick="start()">hovedside</button></div>'
        Temp += '</div><div class="bottom">Local data processing</div>';
        document.getElementById("main").innerHTML = Temp;
        
    // Display results from localStorage instead of API
    var Temp2 = ''
    for (let i = 0; i < gameResults.length; i++) {
        let result = gameResults[i];
        Temp2 += '<div class="sumuary"><div class="summary_txtbox">';
        Temp2 += '<div class="sumuary_txt_big">Spørsmål ' + (i + 1) + '</div>';
        Temp2 += '<div class="sumuary_txt">Resultat: ';
        Temp2 += result.correct ? 'Riktig' : 'Feil';
        Temp2 += '</div></div>';
        Temp2 += '<img src="icon/cor';
        Temp2 += result.correct ? '1' : '0';
        Temp2 += '.svg" alt="checkmark" width="10%"></div>';
    }
    document.getElementById("result").innerHTML = Temp2;
    
    // Clear game data
    localStorage.removeItem('gameResults');
    localStorage.removeItem('gameStartTime');
    localStorage.removeItem('gameId');
}