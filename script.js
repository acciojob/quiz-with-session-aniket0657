const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
    { question: "Which is the largest planet?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Tolkien", "Austen"], answer: "Shakespeare" },
    { question: "What is the square root of 16?", options: ["2", "4", "8", "16"], answer: "4" }
];

// Function to render questions
function renderQuestions() {
    const questionsContainer = document.getElementById('questions');
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<p>${q.question}</p>`;
        q.options.forEach(option => {
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = option;
            questionDiv.appendChild(input);
            questionDiv.innerHTML += option + '<br>';
        });
        questionsContainer.appendChild(questionDiv);
    });
}

// Save progress to session storage
function saveProgress() {
    const progress = {};
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name='question${index}']:checked`);
        if (selectedOption) {
            progress[`question${index}`] = selectedOption.value;
        }
    });
    sessionStorage.setItem('progress', JSON.stringify(progress));
}

// Load progress from session storage
function loadProgress() {
    const progress = JSON.parse(sessionStorage.getItem('progress'));
    if (progress) {
        for (const key in progress) {
            const input = document.querySelector(`input[name='${key}'][value='${progress[key]}']`);
            if (input) {
                input.checked = true;
            }
        }
    }
}

// Calculate score and store in local storage
function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name='question${index}']:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });
    document.getElementById('score').innerText = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem('score', score);
}

// Event listeners
document.getElementById('submit').addEventListener('click', () => {
    saveProgress();
    calculateScore();
});

// Load progress on page load
window.onload = () => {
    renderQuestions();
    loadProgress();
};