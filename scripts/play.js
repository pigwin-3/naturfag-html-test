async function startGame() {
    console.log(gameId);
    
    // Use localStorage for timing instead of API
    const startTime = Date.now();
    localStorage.setItem('gameStartTime', startTime.toString());
    localStorage.setItem('gameId', gameId);
    
    try {
        // Load question data locally instead of from API
        const response = await fetch(`quiz/${themeId}/${themes[gameId - 1].file}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.questions && data.questions.length > 0) {
            currentQuestion = data.questions[0];
            displayQuestion(currentQuestion);
        } else {
            console.error('No questions found in data');
        }
    } catch (error) {
        console.error('Error loading question:', error);
    }
}

function displayQuestion(question) {
    const main = document.getElementById('main');
    main.innerHTML = `
        <div class="question-container">
            <h2>${question.qn}</h2>
            <div class="question-image">
                <img src="${question.img}" alt="${question.srcimg}">
                <p class="image-source">${question.srcimg}</p>
            </div>
            <div class="answer-buttons">
                <button onclick="checkAnswer(true)" class="answer-btn true-btn">Sant</button>
                <button onclick="checkAnswer(false)" class="answer-btn false-btn">Usant</button>
            </div>
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
    main.innerHTML = `
        <div class="feedback-container">
            <h2>${correct ? 'Riktig!' : 'Feil!'}</h2>
            <p class="fact">${fact}</p>
            <button onclick="nextQuestion()" class="next-btn">Neste spørsmål</button>
        </div>
    `;
}

async function nextQuestion() {
    // Load next question or end game
    try {
        const response = await fetch(`quiz/${themeId}/${themes[gameId - 1].file}`);
        const data = await response.json();
        
        const currentIndex = data.questions.findIndex(q => q.qnID === currentQuestion.qnID);
        if (currentIndex < data.questions.length - 1) {
            currentQuestion = data.questions[currentIndex + 1];
            displayQuestion(currentQuestion);
        } else {
            endGame();
        }
    } catch (error) {
        console.error('Error loading next question:', error);
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
        <div class="game-summary">
            <h2>Spill ferdig!</h2>
            <p>Du fikk ${correct} av ${total} riktige</p>
            <p>Tid brukt: ${Math.round(duration / 1000)} sekunder</p>
            <button onclick="start()" class="home-btn">Tilbake til start</button>
        </div>
    `;
    
    // Clear game data
    localStorage.removeItem('gameStartTime');
    localStorage.removeItem('gameResults');
}