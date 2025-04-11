function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name='question${index}']:checked`);
        console.log(`Question ${index}: Selected Option - ${selectedOption ? selectedOption.value : 'None'}`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });
    console.log("Calculated score:", score);
    document.getElementById('score').innerText = `Your score is ${score} out of ${questions.length}.`;
    localStorage.setItem('score', score);
}