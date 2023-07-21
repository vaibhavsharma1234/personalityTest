const express = require('express')
const app = express()

// Middleware to parse JSON request bodies
app.use(express.json())

// Scoring key for each question

// Responses based on the user's answer
const responses = [
  [
    'You eagerly embrace new challenges and seek creative solutions. Your proactive and innovative approach can be valuable in our dynamic startup environment, where new ideas and problem-solving are crucial.',
    'You cautiously assess new challenges before taking action. While you may not dive in immediately, your thoughtful approach ensures that you consider potential risks and benefits before proceeding.',
    "You prefer to work on tasks you are already familiar with. While this may provide stability and efficiency in certain situations, it's essential to be open to new challenges and adapt to the evolving needs of our web agency.",
  ],
  [
    'You appreciate constructive criticism and use it to improve yourself. Your ability to accept feedback positively can contribute to a culture of growth and continuous improvement within our agency.',
    "Initially, you may feel defensive but eventually consider the feedback. It's important to remain open-minded and receptive to different perspectives, as feedback can be a valuable source of learning and personal development.",
    "You find it difficult to accept criticism and may become upset. Constructive feedback is an essential part of professional growth, so it's crucial to work on developing resilience and a growth mindset to thrive in our agency's collaborative environment.",
  ],
  // Responses for other questions...
]

// Route to handle the personality test submission
app.post('/submit', (req, res) => {
  const answers = req.body

  // Validate the answers array length
  if (answers.length !== 10) {
    res.status(400).json({ error: 'Invalid number of answers' })
    return
  }

  // Calculate the total score
  let totalScore = 0
  for (let i = 0; i < answers.length; i++) {
    const answerIndex = ['a', 'b', 'c'].indexOf(answers[i])
    totalScore += scoringKey[i][answerIndex]
  }

  // Get the appropriate response based on the total score
  let response
  if (totalScore >= 18 && totalScore <= 20) {
    response = responses.map((question) => question[0])
  } else if (totalScore >= 10 && totalScore <= 17) {
    response = responses.map((question) => question[1])
  } else {
    response = responses.map((question) => question[2])
  }

  res.json(response)
})

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
