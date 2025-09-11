let currentQuestion = null;
let gameQuestions = [];
let currentQuestionIndex = 0;
let currentGameId = null;
let userAnswers = [];

async function startGame(gameId) {
    if (localStorage.getItem('debug') === '1') {
        console.log('startGame');
    }
    currentGameId = gameId || currentGameId;
    console.log('Starting game with ID:', currentGameId);
    
    // Use localStorage for timing
    const startTime = Date.now();
    localStorage.setItem('gameStartTime', startTime.toString());
    localStorage.setItem('gameId', currentGameId);

    
    // Clear previous answers
    userAnswers = [];
    
    try {
        // Use dataService to get questions
        const questionsData = await window.dataService.getQuestions(currentGameId);
        gameQuestions = questionsData.slice(0, -1); // Remove timing data

        // Shuffle questions randomly
        gameQuestions = shuffleArray(gameQuestions);
        
        if (gameQuestions && gameQuestions.length > 0) {
            currentQuestionIndex = 0;
            currentQuestion = gameQuestions[currentQuestionIndex];
            displayQuestion(currentQuestion);
        } else {
            console.error('No questions found for theme ID:', currentGameId);
        }
    } catch (error) {
        console.error('Error loading quiz data:', error);

        await loadQuestionsDirectly();
    }
}

async function loadQuestionsDirectly() {
    if (localStorage.getItem('debug') === '1') {
        console.log('loadQuestionsDirectly');
    }
    try {
        // Find which category contains our theme ID
        const categoriesData = await window.dataService.loadJSON('quiz/index.json');
        let categoryFolder = null;
        let selectedTheme = null;
        
        // Search through all categories to find the theme
        for (const category of categoriesData.categories) {
            try {
                const themesData = await window.dataService.loadJSON(`quiz/${category.folder || category.ID}/main.json`);
                const theme = themesData.themes.find(theme => theme.ID == currentGameId);
                if (theme) {
                    selectedTheme = theme;
                    categoryFolder = category.folder || category.ID;
                    break;
                }
            } catch (error) {
                console.warn(`Could not load themes for category ${category.ID}:`, error);
            }
        }
        
        if (!selectedTheme || !categoryFolder) {
            console.error('Theme not found for ID:', currentGameId);
            return;
        }
        
        // Load the correct JSON file
        const response = await fetch(`quiz/${categoryFolder}/${selectedTheme.file}`);
        const data = await response.json();
        gameQuestions = data.questions;
        
        // Shuffle questions randomly
        gameQuestions = shuffleArray(gameQuestions);
        
        if (gameQuestions && gameQuestions.length > 0) {
            currentQuestionIndex = 0;
            currentQuestion = gameQuestions[currentQuestionIndex];
            displayQuestion(currentQuestion);
        }
    } catch (error) {
        console.error('Error loading questions directly:', error);
    }
}

// Add this new function to shuffle the array
function shuffleArray(array) {
    const shuffled = [...array]; // Create a copy to avoid modifying original
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function displayQuestion(question) {
    if (localStorage.getItem('debug') === '1') {
        console.log('displayQuestion');
    }
    const main = document.getElementById('main');
    
    let optionsHtml = '';
    question.options.forEach((option, index) => {
        optionsHtml += `
            <button class="option-btn" onclick="checkAnswer(${index + 1})">
                ${index + 1}: ${option}
            </button>
        `;
    });
    
    main.innerHTML = `
        <div class="top2">
            <div class="statement">${question.qn}</div>

        </div>
        <div class="options-container">
            ${optionsHtml}

        </div>
        <div class="feedback-container" id="feedback"></div>
        <div class="bottom">Spørsmål ${currentQuestionIndex + 1} av ${gameQuestions.length}</div>
    `;
}

function checkAnswer(userChoice) {
    if (localStorage.getItem('debug') === '1') {
        console.log('checkAnswer');
    }
    const isCorrect = userChoice === currentQuestion.answer;
    
    // Disable all option buttons
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
    });
    
    // Highlight the selected answer
    const selectedBtn = optionBtns[userChoice - 1];
    if (isCorrect) {
        // Correct answer: blue outline and green background
        selectedBtn.style.border = '4px solid #78dffa';
        selectedBtn.style.backgroundColor = '#5ea664';
        selectedBtn.style.color = 'white';
    } else {
        // Wrong answer: blue outline and red background
        selectedBtn.style.border = '4px solid #78dffa';
        selectedBtn.style.backgroundColor = '#a65e5e';
        selectedBtn.style.color = 'white';

        // Also highlight the correct answer in green
        const correctBtn = optionBtns[currentQuestion.answer - 1];
        correctBtn.style.backgroundColor = '#5ea664';
        correctBtn.style.color = 'white';
    }
    
    // Store user answer
    userAnswers.push({
        questionId: currentQuestion.qnID,
        questionText: currentQuestion.qn,
        userChoice,
        correctAnswer: currentQuestion.answer,
        correctText: currentQuestion.options[currentQuestion.answer - 1],
        userText: currentQuestion.options[userChoice - 1],
        isCorrect,
        explanation: currentQuestion.explanation
    });
    
    // Show feedback
    showFeedback(isCorrect, userChoice);
}


function showFeedback(correct, userChoice) {
    if (localStorage.getItem('debug') === '1') {
        console.log('showFeedback');
    }
    const feedbackDiv = document.getElementById('feedback');
    const correctAnswer = currentQuestion.answer;
    const correctText = currentQuestion.options[correctAnswer - 1];
    
    if (correct) {
        feedbackDiv.innerHTML = `
            <div class="feedback correct">
                <h3>Riktig!</h3>
                <p>${currentQuestion.explanation}</p>
                <button class="next-btn" onclick="${currentQuestionIndex < gameQuestions.length - 1 ? 'nextQuestion()' : 'endGame()'}">
                    ${currentQuestionIndex < gameQuestions.length - 1 ? 'Neste' : 'Ferdig'}
                </button>
            </div>
        `;
    } else {
        feedbackDiv.innerHTML = `
            <div class="feedback incorrect">
                <h3>Galt :(</h3>
                <p>Det riktige svaret er ${correctAnswer}: ${correctText}</p>
                <p>${currentQuestion.explanation}</p>
                <button class="next-btn" onclick="${currentQuestionIndex < gameQuestions.length - 1 ? 'nextQuestion()' : 'endGame()'}">
                    ${currentQuestionIndex < gameQuestions.length - 1 ? 'Neste' : 'Ferdig'}
                </button>
            </div>
        `;
    }
}

function nextQuestion() {
    if (localStorage.getItem('debug') === '1') {
        console.log('nextQuestion');
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < gameQuestions.length) {
        currentQuestion = gameQuestions[currentQuestionIndex];
        displayQuestion(currentQuestion);
    } else {
        endGame();
    }
}

function endGame() {
    if (localStorage.getItem('debug') === '1') {
        console.log('endGame');
    }
    const endTime = Date.now();
    const startTime = parseInt(localStorage.getItem('gameStartTime'));
    const duration = endTime - startTime;
    
    const correct = userAnswers.filter(answer => answer.isCorrect).length;
    const total = userAnswers.length;
    

    // Generate summary HTML
    let summaryHtml = `
        <div class="top4">
            <div class="title">Spill ferdig!</div>
            <div class="text">Du fikk ${correct} av ${total} riktige</div>
            <div class="text">Tid brukt: ${Math.round(duration / 1000)} sekunder</div>

            <div id="result">
    `;
    
    // Add each question summary
    userAnswers.forEach((answer, index) => {
        const questionNumber = index + 1;
        
        summaryHtml += `
            <div class="question-summary">
                <div class="question-text">${questionNumber}. ${answer.questionText}</div>
                <div class="answer-details">
                    <span>Riktig svar: ${answer.correctAnswer}. ${answer.correctText}</span>
                    <span>Du svarte: ${answer.userChoice}. ${answer.userText}</span>
                </div>
                <div class="explanation">${answer.explanation}</div>
                <div class="result-icon">
                    <img src="icon/cor${answer.isCorrect ? '1' : '0'}.svg" alt="checkmark" width="24px">
                </div>
            </div>
        `;
    });
    
    summaryHtml += `
            </div>
        </div>
        <div class="low2">
            <button class="btnfin" onclick="start()">Hovedside</button>
        </div>
    `;
    
    document.getElementById("main").innerHTML = summaryHtml;
    
    // Clear game data
    localStorage.removeItem('gameStartTime');
    localStorage.removeItem('gameResults');
}