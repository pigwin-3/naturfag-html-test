async function startPracticeGame(theme_id)
{
    console.log(theme_id);
    //starts performance monitor
    var t0 = performance.now();
    document.getElementById("main").innerHTML = "";
    
    try {
        // Use dataService to get questions with answers for practice
        const questionsData = await window.dataService.getQuestionsWithAnswers(theme_id);
        
        // questionsData is an array with questions and load time as last element
        const loadTime = questionsData.pop();
        const data = questionsData;
        
        console.log('fetched from local data ' + loadTime + ' ms');
        
        //(for practiceSum())
        var sumStore=[]
        localStorage.setItem('SumStore', JSON.stringify(sumStore));
        //gets the first question
        let qn = data[0];
        //puts the json values into local storage as strings
        localStorage.setItem('TheQN', JSON.stringify(qn));
        localStorage.setItem('TheData', JSON.stringify(data));
        localStorage.setItem('progres', JSON.stringify({"cor" : 0,"wro" : 0}));

        var Temp = '<div class="progressbar">' + '<div class="progressbarcor" style="width: ' + '0' + '0%;"></div>' + '<div class="progressbarwro" style="width: ' + '0' + '0%;"></div>' + '</div>';
            Temp += '<div class="top2">';
            Temp += '<div class="statement">' + qn.qn + '</div>';
            Temp += '<div class="img" style="background-image: url(' + qn.img + ');"><div class="imgsrc">Kjilde: ' + qn.srcimg + '</div></div>';
            Temp += '</div>';
            Temp += '<div class="low"><button class="btntru" onClick="fax(`1`)">sant</button><button class="btnfal" onClick="fax(`0`)">usant</button></div>';
            Temp += '</div>'
        //stops performance timer
        var t1 = performance.now();
        //makes the bottom bar with performance
        Temp += '</div><!-- 1/2 1 = hovedside, kategori velging, spillsiden 2 = spørsmålet, sanheten --> <div class="bottom"> data load: ' + (~~loadTime) + ' ms page build: ' + (~~(t1 - t0)) + ' ms</div>';
        //inserts the html into the document
        document.getElementById("main").innerHTML = Temp;
    } catch (error) {
        console.error('Error loading practice questions:', error);
        document.getElementById("main").innerHTML = '<div class="title">Error</div><div class="top1"><p>Could not load practice questions.</p></div>';
    }
}

async function startPractice(themeId) {
    console.log('Starting practice for theme id:', themeId);
    
    try {
        // Use dataService to get questions
        const questionsData = await window.dataService.getQuestions(themeId);
        
        // questionsData is an array with questions and load time as last element
        const loadTime = questionsData.pop();
        const questions = questionsData;
        
        if (questions && questions.length > 0) {
            practiceQuestions = questions;
            currentPracticeIndex = 0;
            displayPracticeQuestion(practiceQuestions[currentPracticeIndex]);
        } else {
            console.error('No questions found in practice data');
        }
    } catch (error) {
        console.error('Error loading practice questions:', error);
    }
}

function displayPracticeQuestion(question) {
    const main = document.getElementById('main');
    main.innerHTML = `
        <div class="practice-container">
            <h2>Øvelse - Spørsmål ${currentPracticeIndex + 1} av ${practiceQuestions.length}</h2>
            <div class="question">${question.qn}</div>
            <div class="question-image">
                <img src="${question.img}" alt="${question.srcimg}">
                <p class="image-source">${question.srcimg}</p>
            </div>
            <div class="answer-buttons">
                <button onclick="checkPracticeAnswer(true)" class="answer-btn true-btn">Sant</button>
                <button onclick="checkPracticeAnswer(false)" class="answer-btn false-btn">Usant</button>
            </div>
        </div>
    `;
}

function checkPracticeAnswer(userAnswer) {
    const correct = practiceQuestions[currentPracticeIndex].trufal === "1";
    const isCorrect = userAnswer === correct;
    
    showPracticeFeedback(isCorrect, practiceQuestions[currentPracticeIndex].fact);
}

function showPracticeFeedback(correct, fact) {
    const main = document.getElementById('main');
    main.innerHTML = `
        <div class="feedback-container">
            <h2>${correct ? 'Riktig!' : 'Feil!'}</h2>
            <p class="fact">${fact}</p>
            <p class="fact-source">Kilde: ${practiceQuestions[currentPracticeIndex].srcfact}</p>
            <button onclick="nextPracticeQuestion()" class="next-btn">
                ${currentPracticeIndex < practiceQuestions.length - 1 ? 'Neste spørsmål' : 'Avslutt øvelse'}
            </button>
        </div>
    `;
}

function nextPracticeQuestion() {
    currentPracticeIndex++;
    if (currentPracticeIndex < practiceQuestions.length) {
        displayPracticeQuestion(practiceQuestions[currentPracticeIndex]);
    } else {
        endPractice();
    }
}

function endPractice() {
    const main = document.getElementById('main');
    main.innerHTML = `
        <div class="practice-summary">
            <h2>Øvelse ferdig!</h2>
            <p>Du har gått gjennom alle spørsmålene i dette temaet.</p>
            <button onclick="start()" class="home-btn">Tilbake til start</button>
        </div>
    `;
}