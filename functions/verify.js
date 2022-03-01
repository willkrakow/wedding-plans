const verificationQuestions = [
    // Questions to verify someone is a human
    {
        id: 1,
        question: "Which of the following is NOT a fruit?",
        answers: [
            "Apple",
            "Orange",
            "Pear",
            "Peanut",
        ],
        correctAnswer: "Apple",
    },
    {
        id: 2,
        question: "Which of the following is NOT a vegetable?",
        answers: [
            "Carrot",
            "Grape",
            "Broccoli",
            "Cucumber",
        ],
        correctAnswer: "Grape",
    },
    {
        id: 3,
        question: "What's the name of our dog?",
        answers: [
            "Lincoln",
            "Gordon",
            "Hank",
            "Winston",
        ],
        correctAnswer: "Lincoln",
    },
    {
        id: 4,
        question: "What's the name of our cat?",
        answers: [
            "Milo",
            "Max",
            "Melvin",
            "Mango",
        ],
        correctAnswer: "Mango",
    },
    {
        id: 5,
        question: "On our wedding day, how old will we be?",
        answers: [
            "Laura 24, William 26",
            "Laura 25, William 26",
            "Laura 24, William 25",
            "Laura 25, William 25",
        ],
        correctAnswer: "Laura 25, William 26",
    }
]


exports.handler = async function (event, context) {
    const { campbellkrakow_auth_token } = JSON.parse(event.body);
    if (context.httpMethod === "GET") {
        const fullQuestion = verificationQuestions[Math.floor(Math.random() * verificationQuestions.length)];
        const { answers, id, question } = fullQuestion
        return {
            statusCode: 200,
            body: JSON.stringify({
                id,
                question,
                answers,
            }),
        }
    }

    if (context.httpMethod === "PUT") {
        const { id, answer } = JSON.parse(event.body);
        const fullQuestion = verificationQuestions.find(question => question.id === id);

        if (fullQuestion.correctAnswer === answer) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                }),
            }
        }
        else {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: false,
                }),
            }
        }
    }
    }