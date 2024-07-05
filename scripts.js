let quizzes = [];
let currentQuiz = [];

document.getElementById('createQuizForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const questions = [];
    for (let i = 0; i < formData.getAll('question').length; i++) {
        questions.push({
            question: formData.getAll('question')[i],
            options: [
                formData.getAll('option1')[i],
                formData.getAll('option2')[i],
                formData.getAll('option3')[i],
                formData.getAll('option4')[i]
            ],
            correctAnswer: formData.getAll('correctAnswer')[i]
        });
    }
    quizzes.push(questions);
    alert('Quiz Created Successfully!');
    document.getElementById('createQuizForm').reset();
    loadQuiz(quizzes.length - 1);
});

function addQuestion() {
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question';
    questionContainer.innerHTML = `
        <p>Question ${document.getElementById('questionsContainer').children.length + 1}:</p>
        <input type="text" name="question" placeholder="Enter question here" required><br>
        <input type="text" name="option1" placeholder="Option 1" required><br>
        <input type="text" name="option2" placeholder="Option 2" required><br>
        <input type="text" name="option3" placeholder="Option 3" required><br>
        <input type="text" name="option4" placeholder="Option 4" required><br>
        <input type="text" name="correctAnswer" placeholder="Correct option number (1-4)" required>
    `;
    document.getElementById('questionsContainer').appendChild(questionContainer);
}

function loadQuiz(index) {
    currentQuiz = quizzes[index];
    const takeQuizForm = document.getElementById('takeQuizForm');
    takeQuizForm.innerHTML = '';
    currentQuiz.forEach((q, i) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = `
            <p>${i + 1}. ${q.question}</p>
            <label><input type="radio" name="q${i}" value="1"> ${q.options[0]}</label><br>
            <label><input type="radio" name="q${i}" value="2"> ${q.options[1]}</label><br>
            <label><input type="radio" name="q${i}" value="3"> ${q.options[2]}</label><br>
            <label><input type="radio" name="q${i}" value="4"> ${q.options[3]}</label>
        `;
        takeQuizForm.appendChild(questionElement);
    });
    document.getElementById('quizCreator').style.display = 'none';
    document.getElementById('quizTaker').style.display = 'block';
}

function submitQuiz() {
    const formData = new FormData(document.getElementById('takeQuizForm'));
    let score = 0;
    currentQuiz.forEach((q, i) => {
        if (formData.get(`q${i}`) === q.correctAnswer) {
            score++;
        }
    });
    document.getElementById('result').textContent = `You got ${score} out of ${currentQuiz.length} correct!`;
}
