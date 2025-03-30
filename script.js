// Questions Array
const questions = [
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    },
    {
        question: "Which is the largest planet?",
        choices: ["Earth", "Jupiter", "Mars", "Venus"],
        correct: "Jupiter"
    },
    {
        question: "Who wrote 'Hamlet'?",
        choices: ["Shakespeare", "Hemingway", "Austen", "Orwell"],
        correct: "Shakespeare"
    },
    {
        question: "What is the square root of 16?",
        choices: ["2", "3", "4", "5"],
        correct: "4"
    }
];

// Retrieve stored progress
const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
const questionsDiv = document.getElementById("questions");

// Render Questions
questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${q.question}</p>`;

    q.choices.forEach(choice => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="radio" name="q${index}" value="${choice}">
            ${choice}
        `;
        if (savedProgress[`q${index}`] === choice) {
            label.querySelector("input").checked = true;
        }

        // Event Listener to Save Progress
        label.querySelector("input").addEventListener("change", (e) => {
            savedProgress[`q${index}`] = e.target.value;
            sessionStorage.setItem("progress", JSON.stringify(savedProgress));
        });

        questionDiv.appendChild(label);
    });

    questionsDiv.appendChild(questionDiv);
});

// Submit Button
document.getElementById("submit").addEventListener("click", () => {
    let score = 0;

    questions.forEach((q, index) => {
        if (savedProgress[`q${index}`] === q.correct) {
            score++;
        }
    });

    document.getElementById("score").innerText = `Your score is ${score} out of 5.`;
    localStorage.setItem("score", score);
});

// Display Score on Refresh if Previously Submitted
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
    document.getElementById("score").innerText = `Your score is ${lastScore} out of 5.`;
}
