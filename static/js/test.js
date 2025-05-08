const questions = {
    1: {
        question: "One morning, you hear multiple reports from other staff members that they are unable access patient records and other important files. When you check the systems, you find a ransom note demanding payment in Bitcoin to decrypt the files. The note also states that failure to pay within 48 hours will result in the permanent deletion of all data. You now realise that the facility is under a ransomware attack.<br><br>What is the immediate first step you should take after discovering the ransomware attack?",
        choices: ["Pay the ransom immediately to regain access to the data", "Disconnect infected systems from the network to prevent the spread of the ransomware", "Inform all employees to shut down their computers", "Inform the IT department and have them attempt to decrypt the files"],
        correctAnswer: 2
    },
    2: {
        question: "One morning, you hear multiple reports from other staff members that they are unable access patient records and other important files. When you check the systems, you find a ransom note demanding payment in Bitcoin to decrypt the files. The note also states that failure to pay within 48 hours will result in the permanent deletion of all data. You now realise that the facility is under a ransomware attack.<br><br>How can you prepare to mitigate the impact of future ransomware attacks?",
        choices: ["Implementing regular data backups and ensuring they are stored offline", "Training employees to recognize phishing emails and other cyber threats", "Installing and maintaining up-to-date security software", "All of the above"],
        correctAnswer: 4
    },
    3: {
        question: "What is NOT a common sign of a phishing email?",
        choices: ["Urgent or emotionally appealing language", "Request to send personal and financial information", "Untrusted shortened URLs", "Asking to fill in password for two-authentication identification"],
        correctAnswer: 4
    },
    4: {
        question: "You receive an alert from the IT department that indicates suspicious activity on the network. Upon investigation, it is discovered that unauthorised individuals have gained access to patient records, including names, BSNs, and medical histories. The breach appears to have started several weeks ago and has affected a significant portion of the database.<br><br>Who should be notified first about the data breach within the organisation?",
        choices: ["Marketing Department", "Human Resources", "Senior Management and IT Security Team", "All employees"],
        correctAnswer: 3
    },
}

var questionNumber;
var score;
var testLength = Object.keys(questions).length;

const testArea = document.getElementById("testArea");

// update test area
function updateTestArea(){
    testArea.innerHTML = "";

    testArea.innerHTML = `
        <div class="testQuestion fade-appear">
            <h2>QUESTION ${questionNumber}</h2>
            <p>${questions[questionNumber]["question"]}</p>
        </div>

        <div id="testChoices" class="fade-appear">

            <div class="choice">
                <input type="radio" name="choice" value=1>
                <div class="radio-circle"></div>
                <p>${questions[questionNumber]["choices"][0]}</p>
            </div>

            <div class="choice">
                <input type="radio" name="choice" value=2>
                <div class="radio-circle"></div>
                <p>${questions[questionNumber]["choices"][1]}</p>
            </div>

            <div class="choice">
                <input type="radio" name="choice" value=3>
                <div class="radio-circle"></div>
                <p>${questions[questionNumber]["choices"][2]}</p>
            </div>

            <div class="choice">
                <input type="radio" name="choice" value=4>
                <div class="radio-circle"></div>
                <p>${questions[questionNumber]["choices"][3]}</p>
            </div>

        </div>

        <button class="styleButton nextButton fade-appear" onclick="nextQuestion()">Next Question</button>
    `
}

// start test
function startTest(){

    questionNumber = 1;
    score = 0;

    updateTestArea()
}

// move to next question
function nextQuestion(){

    checkAnswer();

    questionNumber++;

    if(questionNumber <= testLength){
        updateTestArea();
    }
    else{
        endTest();
    }
}

// check answer of question
function checkAnswer(){
    
    const choices = document.getElementById("testChoices");

    for (var i = 0; i < choices.children.length; i++) {

        const choice = choices.children[i];
        const input = choice.children[0];

        if(input.checked){
            if(input.value == questions[questionNumber]["correctAnswer"]){
                score += 1; 
            }
        }
    }
}

// for when test is finished
function endTest(){
    testArea.innerHTML = "";

    const percentage = calculateScore();
    compareResultThenFinish(percentage);
}

// calculate percentage 
function calculateScore(){
    
    const percent = (score / testLength) * 100
    const roundedPercent = Math.round(percent);

    return roundedPercent
}

// compare results to other users' results, then call finish function
function compareResultThenFinish(percentage){

    const requestUrl = window.location.protocol + "//" + window.location.host + testScoreUrl + `?score=${score}`

    const xhr = new XMLHttpRequest();
    xhr.open("GET", requestUrl);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        const topPercent = Math.round(xhr.response.topPercent);
        finalScreen(percentage, topPercent);
    } else {
        console.log(`Error: ${xhr.status}`);
        return null
    }
    };

}

// display results final screen
function finalScreen(scorePercentage, comparisonPercentage){

    var htmlToAdd = `
        <div class="testResults fade-appear">
            <h3>You scored ${scorePercentage}%! (${score}/${testLength})</h3>
            <h3>This is better than ${comparisonPercentage}% of other people.</h3>
            <button class="styleButton" onclick="startTest()">Retake Test</button>
    `

    if(scorePercentage >= 90){
        htmlToAdd += `
            <p class="downloadCertText">Since you scored equal to or over 90%, you can download a certificate!</p>
             <button class="styleButton" onclick="getNameInput()">Download Certificate</button>       
        `
    }

    htmlToAdd += `</div>`

    testArea.innerHTML = htmlToAdd;
}