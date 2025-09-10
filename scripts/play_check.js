function checkGame(truFal)
{
    const qn = JSON.parse(localStorage.getItem('TheQN'));
    var qnNum = Number(localStorage.getItem('qnNum'));
    
    if (qn == null) {
        console.log("no question data :(")
    }
    else {
        // Store result in localStorage instead of API
        let gameResults = JSON.parse(localStorage.getItem('gameResults') || '[]');
        gameResults.push({
            questionId: qn.qnID,
            userAnswer: truFal,
            correct: qn.trufal == truFal,
            timestamp: Date.now()
        });
        localStorage.setItem('gameResults', JSON.stringify(gameResults));
        
        console.log('Answer stored:', qn.qnID + "/" + qnNum + "/" + truFal)
        localStorage.removeItem('TheQN');
        
        if (qnNum != 9) {
            var qnNum = qnNum + 1
            localStorage.setItem('qnNum', qnNum);
            continueGame(qnNum)
        }
        else {
            console.log("finished")
            sumGame()
        }
    }
}