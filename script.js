function saveProgress() {
    const progress = {};
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name='question${index}']:checked`);
        if (selectedOption) {
            progress[`question${index}`] = selectedOption.value;
        }
    });
    console.log("Saving progress:", progress); // Debug log
    sessionStorage.setItem('progress', JSON.stringify(progress));
}

function loadProgress() {
    const progress = JSON.parse(sessionStorage.getItem('progress'));
    console.log("Loaded progress:", progress); // Debug log
    if (progress) {
        for (const key in progress) {
            const input = document.querySelector(`input[name='${key}'][value='${progress[key]}']`);
            if (input) {
                input.checked = true;
            }
        }
    }
}

function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name='question${index}']:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });
    console.log("Calculated score:", score); // Debug log
    document.getElementById('score').innerText = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem('score', score);
}