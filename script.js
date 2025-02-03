let pyodide;
let quizStep = 0;

async function loadPyodideInstance() {
    pyodide = await loadPyodide();  // Load Pyodide once during initialization
}

loadPyodideInstance();

async function runPython() {
    let code = document.getElementById("code-editor").value;
    try {
        let output = pyodide.runPython(code);
        document.getElementById("output").innerText = output;
    } catch (err) {
        document.getElementById("output").innerText = "Error: " + err;
    }
}

function sendMessage() {
    let input = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");
    let userMessage = `<div class='user'>👦 ${input}</div>`;
    let botResponse = "";

    // Respond based on the user's message
    if (input.toLowerCase().includes("print")) {
        botResponse = `<div class='bot'>🤖 The 'print' function outputs text to the console. Example: print('Hello!')</div>`;
    } else if (input.toLowerCase().includes("variable")) {
        botResponse = `<div class='bot'>🤖 Variables store values. Example: x = 10. Print it using print(x)!</div>`;
    } else if (input.toLowerCase().includes("loop")) {
        botResponse = `<div class='bot'>🤖 Loops repeat actions! Example: for i in range(5): print(i) will print numbers 0-4.</div>`;
    } else if (input.toLowerCase().includes("function")) {
        botResponse = `<div class='bot'>🤖 Functions help reuse code! Example: def greet(): print('Hello!') Call it using greet().</div>`;
    } else {
        botResponse = `<div class='bot'>🤖 I'm here to help! Try asking about Python basics like print, variables, loops, or functions.</div>`;
    }

    chatBox.innerHTML += userMessage + botResponse;
    document.getElementById("user-input").value = "";
}

function startQuiz() {
    // Show the quiz section and start the first question
    document.querySelector(".quiz-container").style.display = "block";
    document.querySelector(".editor-container").style.display = "none";
    document.querySelector(".chat-container").style.display = "none";

    let quizBox = document.getElementById("quiz-box");
    quizBox.innerHTML = `<p>Question: What is the output of this code? <code>print(3 + 5)</code></p>
                         <input type="text" id="quiz-answer" placeholder="Enter your answer">
                         <button onclick="checkQuizAnswer()">Submit Answer</button>`;
    quizStep = 1;
}

function checkQuizAnswer() {
    let userAnswer = document.getElementById("quiz-answer").value.trim();
    let quizBox = document.getElementById("quiz-box");

    if (quizStep === 1) {
        if (userAnswer === "8") {
            quizBox.innerHTML += `<p>Correct! The answer is 8.</p>`;
            quizBox.innerHTML += `<p>Next question: What is the value of <code>x = 10</code>?</p>`;
            quizStep = 2;
        } else {
            quizBox.innerHTML += `<p>Oops! The correct answer is 8. Try again!</p>`;
        }
    } else if (quizStep === 2) {
        if (userAnswer === "10") {
            quizBox.innerHTML += `<p>Correct! The value of x is 10.</p>`;
            quizBox.innerHTML += `<p>Next question: What does this code do? <code>for i in range(3): print(i)</code></p>`;
            quizStep = 3;
        } else {
            quizBox.innerHTML += `<p>Oops! The correct answer is 10. Try again!</p>`;
        }
    } else if (quizStep === 3) {
        if (userAnswer === "prints 0, 1, 2") {
            quizBox.innerHTML += `<p>Correct! The loop prints 0, 1, and 2.</p>`;
            quizBox.innerHTML += `<p>Great job, you're learning Python!</p>`;
            quizStep = 0; // End the quiz
        } else {
            quizBox.innerHTML += `<p>Oops! The correct answer is 'prints 0, 1, 2'. Try again!</p>`;
        }
    }
}
