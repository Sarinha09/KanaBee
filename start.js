let selectedHiragana = [];
let currentQuestionIndex = 0;
let score = 0;

let startTime;
let endTime;

const hiraganaToRomaji = {
    "あ": "a", "い": "i", "う": "u", "え": "e", "お": "o",
    "か": "ka", "き": "ki", "く": "ku", "け": "ke", "こ": "ko",
    "さ": "sa", "し": "shi", "す": "su", "せ": "se", "そ": "so",
    "た": "ta", "ち": "chi", "つ": "tsu", "て": "te", "と": "to",
    "な": "na", "に": "ni", "ぬ": "nu", "ね": "ne", "の": "no",
    "は": "ha", "ひ": "hi", "ふ": "fu", "へ": "he", "ほ": "ho",
    "ま": "ma", "み": "mi", "む": "mu", "め": "me", "も": "mo",
    "や": "ya", "ゆ": "yu", "よ": "yo",
    "ら": "ra", "り": "ri", "る": "ru", "れ": "re", "ろ": "ro",
    "わ": "wa", "を": "wo"
};

function startQuiz() {



    selectedHiragana = Array.from(document.querySelectorAll('.hiragana-card.selected'))
        .map(button => button.querySelector('.button-text2').innerText);
    
    if (selectedHiragana.length === 0) {
        alert("Selecione pelo menos um hiragana para iniciar o quiz.");
        return;
    }

    startTime = new Date();

    document.querySelector('.p-container').style.display = 'none';
    document.querySelector('.container-filter').style.display = 'none';
    
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById("start-quiz-btn").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";

    showQuestion();

    document.getElementById("answer-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            submitAnswer();
        }
    });
}

function showQuestion() {
    document.getElementById("question").innerText = `${selectedHiragana[currentQuestionIndex]}`;
    document.getElementById("answer-input").value = "";
    document.getElementById("answer-input").focus();
}

function submitAnswer() {
    const userAnswer = document.getElementById("answer-input").value.trim().toLowerCase();
    const correctAnswer = hiraganaToRomaji[selectedHiragana[currentQuestionIndex]];

    const correctSound = document.getElementById("correct-sound");
    const wrongSound = document.getElementById("wrong-sound");


    if (userAnswer === correctAnswer) {
        score++;
        correctSound.play(); 
    } else {
        wrongSound.play(); 
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < selectedHiragana.length) {
        showQuestion();
    } 
    else {
        console.log("Finalizando o quiz e escondendo o botão");
        endQuiz();
    }
}

function endQuiz() {

    endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000); 

    const percentage = ((score / selectedHiragana.length) * 100).toFixed(2);
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("quiz-result").style.display = "block";
    document.getElementById("quiz-result").innerText = 
        `Você completou\n` +
        `Pontuação: ${score}/${selectedHiragana.length} \n` +
        `Porcentagem de Acerto: ${percentage}% \n` +
        `Tempo Total: ${timeTaken} segundos`;
}
