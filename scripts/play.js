let currentQuestion = null;
let gameQuestions = [];
let currentQuestionIndex = 0;
let currentGameId = null;

async function startGame(gameId) {
    currentGameId = gameId || currentGameId;
    console.log('Starting game with ID:', currentGameId);
    
    // Use localStorage for timing instead of API
    const startTime = Date.now();
    localStorage.setItem('gameStartTime', startTime.toString());
    localStorage.setItem('gameId', currentGameId);
    
    try {
        // Use dataService to get questions for the current theme
        const questionsData = await window.dataService.getQuestions(currentGameId);
        gameQuestions = questionsData.slice(0, -1); // Remove the timing data from the end
        
        if (gameQuestions && gameQuestions.length > 0) {
            currentQuestionIndex = 0;
            currentQuestion = gameQuestions[currentQuestionIndex];
            displayQuestion(currentQuestion);
        } else {
            console.error('No questions found for theme ID:', currentGameId);
        }
    } catch (error) {
        console.error('Error loading quiz data:', error);
        // Fallback to direct file loading if dataService fails
        await loadQuestionsDirectly();
    }
}

async function loadQuestionsDirectly() {
    try {
        const response = await fetch('quiz/miljoe_og_natur/vannkvalitet.json');
        const data = await response.json();
        gameQuestions = data.questions;
        
        if (gameQuestions && gameQuestions.length > 0) {
            currentQuestionIndex = 0;
            currentQuestion = gameQuestions[currentQuestionIndex];
            displayQuestion(currentQuestion);
        }
    } catch (error) {
        console.error('Error loading questions directly:', error);
    }
}

function displayQuestion(question) {
    const main = document.getElementById('main');
    main.innerHTML = `
        <div class="top2">
            <div class="statement">${question.qn}</div>
            <div class="img" style="background-image: url(${question.img});"><div class="imgsrc">Kjilde: ${question.srcimg}</div></div>
        </div>
        <div class="low">
            <button class="btntru" onclick="checkAnswer(true)">sant</button>
            <button class="btnfal" onclick="checkAnswer(false)">usant</button>
        </div>
    `;
}

function checkAnswer(userAnswer) {
    const correct = currentQuestion.trufal === "1";
    const isCorrect = userAnswer === correct;
    
    // Store result in localStorage
    let gameResults = JSON.parse(localStorage.getItem('gameResults') || '[]');
    gameResults.push({
        questionId: currentQuestion.qnID,
        correct: isCorrect,
        timestamp: Date.now()
    });
    localStorage.setItem('gameResults', JSON.stringify(gameResults));
    
    // Show feedback
    showFeedback(isCorrect, currentQuestion.fact);
}

function showFeedback(correct, fact) {
    const main = document.getElementById('main');
    const isLastQuestion = currentQuestionIndex >= gameQuestions.length - 1;
    
    main.innerHTML = `
        <div class="top3">
            <div class="imgbox">
                <div class="img2" style="background-image: url(${currentQuestion.img});"><div class="imgsrc">Kjilde: ${currentQuestion.srcimg}</div></div>
            </div>
            <div class="fax">
                <div class="${correct ? 'trufax' : 'falfax'}">${correct ? 'Riktig!' : 'Feil'}</div>
                <div class="text">${fact}</div>
            </div>
        </div>
        <div class="low2">
            <button class="btnnex" onclick="${isLastQuestion ? 'endGame()' : 'nextQuestion()'}">${isLastQuestion ? 'Ferdig' : 'neste'}</button>
        </div>
        <div class="bottom">fact sorse: ${currentQuestion.srcfact}</div>
    `;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < gameQuestions.length) {
        currentQuestion = gameQuestions[currentQuestionIndex];
        displayQuestion(currentQuestion);
    } else {
        endGame();
    }
}

function endGame() {
    const endTime = Date.now();
    const startTime = parseInt(localStorage.getItem('gameStartTime'));
    const duration = endTime - startTime;
    
    const gameResults = JSON.parse(localStorage.getItem('gameResults') || '[]');
    const correct = gameResults.filter(r => r.correct).length;
    const total = gameResults.length;
    
    const main = document.getElementById('main');
    main.innerHTML = `
        <div class="top4">
            <div class="title">Spill ferdig!</div>
            <div class="text">Du fikk ${correct} av ${total} riktige</div>
            <div class="text">Tid brukt: ${Math.round(duration / 1000)} sekunder</div>
        </div>
        <div class="low2">
            <button class="btnfin" onclick="start()">hovedside</button>
        </div>
    `;
    
    // Clear game data
    localStorage.removeItem('gameStartTime');
    localStorage.removeItem('gameResults');
}