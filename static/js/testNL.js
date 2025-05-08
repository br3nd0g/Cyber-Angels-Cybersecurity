const questions = {
    1: {
        question: "Op een ochtend hoor je meerdere meldingen van andere medewerkers dat ze geen toegang hebben tot patiëntendossiers en andere belangrijke bestanden. Wanneer je de systemen controleert, vind je een losgeldbrief waarin betaling in Bitcoin wordt geëist om de bestanden te ontsleutelen. Op het briefje staat ook dat als je niet binnen 48 uur betaalt, alle data permanent worden gewist. Je realiseert je nu dat de faciliteit onder een ransomware-aanval staat.<br><br>Wat is de onmiddellijke eerste stap die u moet nemen nadat u de ransomware-aanval hebt ontdekt?",
        choices: ["Betaal het losgeld onmiddellijk om weer toegang te krijgen tot de data", "Koppel geïnfecteerde systemen los van het netwerk om de verspreiding van de ransomware te voorkomen", "Informeer alle medewerkers dat ze hun computers moeten afsluiten", "Informeer de IT-afdeling en laat ze proberen de bestanden te ontsleutelen"],
        correctAnswer: 2
    },
    2: {
        question: "Op een ochtend hoor je meerdere meldingen van andere medewerkers dat ze geen toegang hebben tot patiëntendossiers en andere belangrijke bestanden. Wanneer je de systemen controleert, vind je een losgeldbrief waarin betaling in Bitcoin wordt geëist om de bestanden te ontsleutelen. Op het briefje staat ook dat als je niet binnen 48 uur betaalt, alle gegevens permanent worden gewist. Je realiseert je nu dat de faciliteit onder een ransomware-aanval staat.<br><br>Hoe kunt u zich voorbereiden om de gevolgen van toekomstige ransomware-aanvallen te beperken?",
        choices: ["Regelmatige gegevensback-ups implementeren en ervoor zorgen dat ze offline worden opgeslagen", "Medewerkers trainen in het herkennen van phishing e-mails en andere cyberbedreigingen", "Up-to-date beveiligingssoftware installeren en onderhouden", "Alle bovenstaande"],
        correctAnswer: 4
    },
    3: {
        question: "Wat is GEEN veelvoorkomend teken van een phishing e-mail?",
        choices: ["Dringende of emotioneel aantrekkelijke taal", "Verzoek om persoonlijke en financiële informatie te sturen", "Onbetrouwbare verkorte URLs", "Vragen om wachtwoord in te vullen voor identificatie met twee verificaties"],
        correctAnswer: 4
    },
    4: {
        question: "U ontvangt een waarschuwing van de IT-afdeling die wijst op verdachte activiteiten op het netwerk. Na onderzoek wordt ontdekt dat onbevoegden toegang hebben gekregen tot patiëntendossiers, waaronder namen, BSN's en medische voorgeschiedenis. De inbreuk lijkt enkele weken geleden te zijn begonnen en heeft een aanzienlijk deel van de database aangetast.<br><br>Wie moet als eerste op de hoogte worden gebracht van het datalek binnen de organisatie?",
        choices: ["Afdeling Marketing", "Personeelszaken", "Hoger management en IT-beveiligingsteam", "Alle medewerkers"],
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
            <h2>VRAAG ${questionNumber}</h2>
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

        <button class="styleButton nextButton fade-appear" onclick="nextQuestion()">Volgende Vraag</button>
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
        <h3>Je scoorde ${scorePercentage}%! (${score}/${testLength})</h3>
        <h3>Dit is beter dan ${comparisonPercentage}% van de andere mensen.</h3>
        <button class="styleButton" onclick="startTest()">Test Herkansen</button>
    `

    if(scorePercentage >= 90){
        htmlToAdd += `
            <p class="downloadCertText">Omdat je 90% of meer hebt gescoord, kun je een certificaat downloaden!</p>
             <button class="styleButton" onclick="getNameInput()">Certificaat Downloaden</button>       
        `
    }

    htmlToAdd += `</div>`

    testArea.innerHTML = htmlToAdd;
}