function checkGame(truFal)
{
    var timeID = JSON.parse(localStorage.getItem('timeID'));
    const qn = JSON.parse(localStorage.getItem('TheQN'));
    var qnNum = Number(localStorage.getItem('qnNum'));
    if (qn == null) {
        console.log("no :(")
    }
    else {
        /* /time/spørsmålets id/spørsmål numeret 0-9/hva svarte du/tids id */
        console.log(qn.qnID + "/" + qnNum + "/" + truFal + "/" + timeID.id)
        fetch(api + "/time/" + qn.qnID + "/" + qnNum + "/" + truFal + "/" + timeID.id)
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